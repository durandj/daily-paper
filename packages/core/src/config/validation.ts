import AJV, { DefinedError, ValidateFunction } from "ajv";
import addFormats from "ajv-formats";

import { SchemaType } from "./schema";

export function createSchemaValidatorBuilder(): AJV {
    const builder = new AJV();
    addFormats(builder);

    return builder;
}

const defaultValidatorBuilder = createSchemaValidatorBuilder();

export function createSchemaValidator<ConfigType>(
    schema: SchemaType<ConfigType>,
    validatorBuilder: AJV = defaultValidatorBuilder,
): ValidateFunction<ConfigType> {
    return validatorBuilder.compile(schema);
}

export interface ValidationError {
    readonly field: string;
    readonly message: string;
}

export class InvalidConfig extends Error {
    public readonly errors: ValidationError[];

    constructor(errors: ValidationError[]) {
        super(
            `Invalid configuration provided for fields: [${errors
                .map((err) => err.field)
                .join(",")}]`,
        );

        this.errors = errors;
    }

    public toString(): string {
        const errorLines = this.errors.map((err) => `${err.field} - ${err.message}`).join("\n\t");

        return `${this.message}\n\t${errorLines}`;
    }
}

export function validateConfig<ConfigType>(
    validator: ValidateFunction<ConfigType>,
    config: unknown,
): ConfigType {
    if (!validator(config)) {
        const errors = validator.errors as DefinedError[];

        throw new InvalidConfig(
            errors.map((err) => ({
                field: err.dataPath.replaceAll("/", "."),
                message: err.message || "Invalid value",
            })),
        );
    }

    return config;
}
