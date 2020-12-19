export function isObject(value: unknown): boolean {
    return (
        value !== undefined && value !== null && typeof value === "object" && !Array.isArray(value)
    );
}

export function snakeToCamelCase(value: string): string {
    return value.replace(/([-_][a-z])/gi, ($1) => {
        return $1.toUpperCase().replace("-", "").replace("_", "");
    });
}

export function camelToSnakeCase(value: string): string {
    return value.replace(/([A-Z])/g, ($1) => {
        return `_${$1.toLowerCase()}`;
    });
}

function convertKeyNames<ReturnType>(
    values: Record<string, unknown>,
    converter: (value: string) => string,
): ReturnType {
    return (Object.fromEntries(
        Object.entries(values).map(([name, value]) => {
            const fixedName = converter(name);
            let fixedValue = value;

            if (isObject(value)) {
                fixedValue = convertKeyNames(value as Record<string, unknown>, converter);
            } else if (value && Array.isArray(value)) {
                fixedValue = value.map((item) => {
                    if (isObject(item)) {
                        return convertKeyNames(item, converter);
                    }

                    return item;
                });
            }

            return [fixedName, fixedValue];
        }),
    ) as unknown) as ReturnType;
}

export function convertObjectKeysToCamelCase<ReturnType>(
    values: Record<string, unknown>,
): ReturnType {
    return convertKeyNames(values, snakeToCamelCase);
}

export function convertObjectKeysToSnakeCase<ReturnType>(
    values: Record<string, unknown>,
): ReturnType {
    return convertKeyNames(values, camelToSnakeCase);
}
