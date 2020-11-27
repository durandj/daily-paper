import AJV, { DefinedError, JSONSchemaType, ValidateFunction } from "ajv";
import addFormats from "ajv-formats";

const defaultValidatorBuilder = createSchemaValidatorBuilder();

export function createSchemaValidatorBuilder(): AJV {
    const builder = new AJV();
    addFormats(builder);

    return builder;
}

export function createSchemaValidator<ConfigType>(
    schema: JSONSchemaType<ConfigType>,
    validatorBuilder: AJV = defaultValidatorBuilder,
): ValidateFunction<ConfigType> {
    return validatorBuilder.compile(schema);
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

export interface ValidationError {
    readonly field: string;
    readonly message: string;
}

export class InvalidConfig extends Error {
    public readonly errors: ValidationError[];

    constructor(errors: ValidationError[]) {
        super("Invalid configuration provided");

        this.errors = errors;
    }

    public toString(): string {
        const errorLines = this.errors.map((err) => `${err.field} - ${err.message}`).join("\n\t");

        return `${this.message}\n\t${errorLines}`;
    }
}
