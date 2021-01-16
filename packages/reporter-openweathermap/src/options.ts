import { Coordinate } from "@daily-paper/common-weather";
import { createSchemaValidator, SchemaType, validateConfig } from "@daily-paper/core";

export interface WeatherReporterOptions {
    apiKey: string;
    location: Coordinate;
    // TODO(durandj): language
    units: "metric" | "imperial";
}

const schema: SchemaType<WeatherReporterOptions> = {
    type: "object",
    properties: {
        apiKey: {
            type: "string",
            minLength: 1,
        },
        location: {
            type: "object",
            properties: {
                latitude: {
                    type: "number",
                    minimum: -90,
                    maximum: 90,
                },
                longitude: {
                    type: "number",
                    minimum: -180,
                    maximum: 180,
                },
            },
            nullable: false,
            additionalProperties: true,
            required: ["latitude", "longitude"],
        },
        units: {
            type: "string",
            enum: ["metric", "imperial"],
            default: "metric",
        },
    },
    nullable: false,
    additionalProperties: true,
    required: ["apiKey", "location"],
};

const validator = createSchemaValidator(schema);

export function validateReporterConfig(config: unknown): WeatherReporterOptions {
    return validateConfig(validator, config);
}
