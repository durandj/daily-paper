import { expect } from "earljs";
import { describe, it } from "mocha";

import { isFunction, isObject } from "./validators";

describe("plugins::validators", (): void => {
    describe("isFunction", (): void => {
        [
            { value: undefined, expected: false },
            { value: null, expected: false },
            { value: true, expected: false },
            { value: false, expected: false },
            { value: 6, expected: false },
            { value: "function", expected: false },
            { value: {}, expected: false },
            { value: () => {}, expected: true },
            { value: () => ({}), expected: true },
            { value: (_: unknown) => {}, expected: true },
            { value: (_: unknown) => ({}), expected: true },
        ].forEach(({ value, expected }): void => {
            const stringValue = typeof value === "object" ? JSON.stringify(value) : value;

            it(`should return ${expected} for '${stringValue}'`, (): void => {
                expect(isFunction(value)).toEqual(expected);
            });
        });
    });

    describe("isObject", (): void => {
        [
            { value: undefined, expected: false },
            { value: null, expected: false },
            { value: true, expected: false },
            { value: false, expected: false },
            { value: 6, expected: false },
            { value: "function", expected: false },
            { value: () => {}, expected: false },
            { value: () => ({}), expected: false },
            { value: (_: unknown) => {}, expected: false },
            { value: (_: unknown) => ({}), expected: false },
            { value: {}, expected: true },
            { value: { key: "value" }, expected: true },
            { value: { callable: () => {} }, expected: true },
        ].forEach(({ value, expected }) => {
            const stringValue = typeof value === "object" ? JSON.stringify(value) : value;

            it(`should return ${expected} for '${stringValue}'`, (): void => {
                expect(isObject(value)).toEqual(expected);
            });
        });
    });
});
