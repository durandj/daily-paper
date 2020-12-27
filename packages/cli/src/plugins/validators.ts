function isDefined(value: unknown): boolean {
    return value !== undefined && value !== null;
}

export function isFunction(plugin: unknown): boolean {
    return isDefined(plugin) && typeof plugin === "function";
}

// TODO(durandj): include required keys?
export function isObject(plugin: unknown): boolean {
    return isDefined(plugin) && typeof plugin === "object";
}
