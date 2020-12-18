import { Logger } from "winston";

import { Configuration, ReporterConfig } from "./config";

export interface ReporterContext {
    readonly reporterConfig: ReporterConfig;
    readonly globalConfig: Configuration;
    readonly logger: Logger;
}

export type Report = Record<string, unknown>;

export type Reporter<ContextType extends ReporterContext> = (
    context: ContextType,
) => Promise<Report>;
