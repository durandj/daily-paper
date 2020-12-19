import {
    createSchemaValidator,
    PublisherConfig,
    SchemaType,
    validateConfig,
} from "@daily-paper/core";

export interface FilePublisherConfig extends PublisherConfig {
    name: string;
    type: "file";
    options: {
        file: string;
    };
}

const schema: SchemaType<FilePublisherConfig> = {
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

export function validatePublisherConfig(config: unknown): FilePublisherConfig {
    return validateConfig(schemaValidator, config);
}
