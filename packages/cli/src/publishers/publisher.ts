import { Logger } from "winston";

import { Configuration, PublisherConfig } from "@daily-paper/core";

// TODO(durandj): move non-essential arguments to an object
export type Publisher = (
    logger: Logger,
    publisherConfig: PublisherConfig,
    completeConfig: Configuration,
    paper: Buffer,
) => Promise<void>;
