import { JSONSchemaType } from "ajv";

export type SchemaType<Type> = JSONSchemaType<Type>;

export interface ReporterConfig {
    readonly name: string;
    readonly type: string;
    readonly options?: Record<string, unknown>;
}

export interface PublisherConfig {
    readonly name: string;
    readonly type: string;
    readonly options?: Record<string, unknown>;
}

export interface Configuration {
    readonly paper?: {
        readonly name?: string;
        readonly logo?: string;
    };

    readonly publishers: PublisherConfig[];

    readonly reporters: ReporterConfig[];
}

export const schema: SchemaType<Configuration> = {
    type: "object",
    properties: {
        paper: {
            type: "object",
            properties: {
                name: {
                    type: "string",
                    default: "Daily Paper",
                    minLength: 1,
                    nullable: true,
                },
                logo: {
                    type: "string",
                    format: "uri",
                    nullable: true,
                },
            },
            nullable: true,
            additionalProperties: true,
            required: [],
        },

        reporters: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        minLength: 1,
                        nullable: false,
                    },
                    type: {
                        type: "string",
                        minLength: 1,
                        nullable: false,
                    },
                    options: {
                        type: "object",
                        properties: {},
                        nullable: true,
                        additionalProperties: true,
                        required: [],
                    },
                },
                additionalProperties: true,
                required: [],
            },
        },

        publishers: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        minLength: 1,
                        nullable: false,
                    },
                    type: {
                        type: "string",
                        minLength: 1,
                        nullable: false,
                    },
                    options: {
                        type: "object",
                        properties: {},
                        nullable: true,
                        additionalProperties: true,
                        required: [],
                    },
                },
                nullable: false,
                additionalProperties: true,
                required: [],
            },
        },
    },
    nullable: false,
    additionalProperties: true,
    required: ["publishers"],
};
