import { program } from "commander";
import winston from "winston";

import loadConfigurationFromFile from "./config";
import { Renderer } from "./renderers";
// import htmlRenderer from "./renderers/htmlRenderer";
import pdfRenderer from "./renderers/pdfRenderer";
import { findPublisher } from "./publishers";

const defaultConfigFilePath = "daily-paper.yml";
const defaultLogLevel = "info";

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

main();
