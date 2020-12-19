import { Logger } from "winston";

import { Configuration } from "@daily-paper/core";

export interface RenderContext {
    logger: Logger;
}

export type Renderer = (config: Configuration, context: RenderContext) => Promise<Buffer>;
