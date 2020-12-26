import { program } from "commander";
import winston from "winston";

import { PaperError, Reporter, ReporterContext } from "@daily-paper/core";

import loadConfigurationFromFile from "./config";
import { Renderer, pdfRenderer } from "./renderers";
import { loadPlugin, isFunction } from "./plugins";
import { findPublisher } from "./publishers";

const defaultConfigFilePath = "daily-paper.yml";
const defaultLogLevel = "info";

interface Report {
    reporter: {
        name: string;
        type: string;
    };

    data: unknown;
}

async function main() {
    program
        .description("Generates a Daily Paper for today")
        .version("0.0.0")
        .option(
            "--config <file>",
            "The configuration file for how to generate the paper",
            defaultConfigFilePath,
        )
        .option("--log-level <level>", "The verbosity level to log information at", defaultLogLevel)
        .parse(process.argv);

    const logger = winston.createLogger({
        level: program.logLevel,
        format: winston.format.combine(
            winston.format.colorize({ all: true }),
            winston.format.simple(),
        ),
        transports: [new winston.transports.Console()],
    });

    try {
        const configFile: string = program.config;
        logger.debug(`Loading configuration from '${configFile}'`);
        const config = loadConfigurationFromFile(configFile);

        logger.debug("Collecting data from reporters");
        // TODO(durandj): we should do something else with failed reporters
        const dataFromReporters = await Promise.all(
            config.reporters.map(
                async (reporterConfig): Promise<Report> => {
                    const plugin = await loadPlugin({ pluginID: reporterConfig.type });
                    if (!isFunction(plugin)) {
                        throw new PaperError(
                            `Plugin '${reporterConfig.name}' was expected to be a function to be used as a reporter`,
                            {
                                reporter: reporterConfig.name,
                                reporterType: reporterConfig.type,
                            },
                        );
                    }

                    const reporterPlugin = plugin as Reporter<ReporterContext>;
                    return {
                        reporter: {
                            name: reporterConfig.name,
                            type: reporterConfig.type,
                        },
                        data: reporterPlugin({
                            globalConfig: config,
                            reporterConfig,
                            logger,
                        }),
                    };
                },
            ),
        );
        // TODO(durandj): we need to do something with this data yet
        console.log(dataFromReporters);

        logger.debug("Rendering paper");
        // const renderer: Renderer = htmlRenderer;
        const renderer: Renderer = pdfRenderer;
        const renderedPaper = await renderer(config, { logger });

        logger.debug("Publishing paper");
        await Promise.all(
            config.publishers.map((publisherConfig) => {
                const publisher = findPublisher(publisherConfig);

                return publisher(logger, publisherConfig, config, renderedPaper);
            }),
        );

        logger.debug("Paper has been published");
    } catch (err) {
        // TODO(durandj): include additional error information as logger metadata
        logger.error(err.toString());
    }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
main();
