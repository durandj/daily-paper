import { expect } from "earljs";
import { describe, it } from "mocha";

import { createMockCoordinate } from "@daily-paper/common-weather";

import { validateReporterConfig } from "./options";

describe("options", (): void => {
    [
        {
            input: {
                apiKey: "deadbeeffeebdaed",
                location: {
                    latitude: 0,
                    longitude: 0,
                },
            },
            valid: true,
        },
        {
            input: {
                apiKey: "deadbeeffeebdaed",
                location: {
                    latitude: -90,
                    longitude: -180,
                },
            },
            valid: true,
        },
        {
            input: {
                apiKey: "deadbeeffeebdaed",
                location: {
                    latitude: 90,
                    longitude: 180,
                },
            },
            valid: true,
        },
        {
            input: {},
            valid: false,
        },
        {
            input: {
                location: createMockCoordinate(),
            },
            valid: false,
        },
        {
            input: {
                apiKey: "",
                location: createMockCoordinate(),
            },
            valid: false,
        },
        {
            input: {
                apiKey: 12345,
                location: createMockCoordinate(),
            },
            valid: false,
        },
        {
            input: {
                apiKey: "deadbeeffeebdaed",
            },
            valid: false,
        },
        {
            input: {
                apiKey: "deadbeeffeebdaed",
                location: "test",
            },
            valid: false,
        },
        {
            input: {
                apiKey: "deadbeeffeebdaed",
                location: {
                    latitude: -91,
                    longitude: -180,
                },
            },
            valid: false,
        },
        {
            input: {
                apiKey: "deadbeeffeebdaed",
                location: {
                    latitude: -90,
                    longitude: -181,
                },
            },
            valid: false,
        },
        {
            input: {
                apiKey: "deadbeeffeebdaed",
                location: {
                    latitude: 91,
                    longitude: 180,
                },
            },
            valid: false,
        },
        {
            input: {
                apiKey: "deadbeeffeebdaed",
                location: {
                    latitude: 90,
                    longitude: 181,
                },
            },
            valid: false,
        },
        {
            input: {
                apiKey: "deadbeeffeebdaed",
                location: {
                    latitude: "90",
                    longitude: -180,
                },
            },
            valid: false,
        },
        {
            input: {
                apiKey: "deadbeeffeebdaed",
                location: {
                    latitude: -90,
                    longitude: "-180",
                },
            },
            valid: false,
        },
    ].forEach(({ input, valid }, index): void => {
        it(`should mark test case ${index} as ${valid ? "valid" : "not valid"}`, (): void => {
            const testCase = () => validateReporterConfig(input);

            if (valid) {
                expect(testCase).not.toThrow();
            } else {
                expect(testCase).toThrow();
            }
        });
    });
});
