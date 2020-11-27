import { JSONSchemaType } from "ajv";

import { createSchemaValidator, PublisherConfig, validateConfig } from "@daily-paper/cli/config";

export interface FilePublisherConfig extends PublisherConfig {
    name: string;
    type: "file";
    options: {
        file: string;
    };
}

const schema: JSONSchemaType<FilePublisherConfig> = {
    type: "object",
    properties: {
        name: {
            type: "string",
            minLength: 1,
        },
        type: {
            type: "string",
            enum: ["file"],
        },
        options: {
            type: "object",
            properties: {
                file: {
                    type: "string",
                    minLength: 1,
                },
            },
            nullable: false,
            additionalProperties: true,
            required: ["file"],
        },
    },
    nullable: false,
    additionalProperties: true,
    required: ["name", "type", "options"],
};

const schemaValidator = createSchemaValidator(schema);

export const validatePublisherConfig = (config: unknown): FilePublisherConfig =>
    validateConfig(schemaValidator, config);
