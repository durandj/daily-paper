import fs from "fs";

import { Logger } from "winston";

import { Configuration, PublisherConfig } from "@daily-paper/cli/config";
import { Publisher } from "@daily-paper/cli/publishers/publisher";

import { validatePublisherConfig } from "./schema";

const filePublisher: Publisher = async (
    logger: Logger,
    publisherConfig: PublisherConfig,
    _: Configuration,
    paper: Buffer,
): Promise<void> => {
    logger.debug(`Running file publisher '${publisherConfig.name}'`);

    const filePublisherConfig = validatePublisherConfig(publisherConfig);

    logger.info(`Saving paper to file '${filePublisherConfig.options.file}'`);
    await fs.promises.writeFile(filePublisherConfig.options.file, paper);
};

export default filePublisher;
