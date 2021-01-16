import { expect, mockFn } from "earljs";
import fs from "fs";
import { describe, it } from "mocha";
import path from "path";
import { createLogger, Logger } from "winston";

import { createMockCoordinate, WeatherReport } from "@daily-paper/common-weather";

import { Forecast, ForecastOptions } from "./client";
import { createMockForecast } from "./client/mocks";
import { WeatherReporterOptions } from "./options";
import weatherReporter from "./reporter";

async function loadTestData<Type>(filePath: string): Promise<Type> {
    const data = await fs.promises.readFile(filePath);

    return JSON.parse(data.toString());
}

function setupLogger(): Logger {
    return createLogger({ silent: true });
}

describe("reporter", (): void => {
    it("should default settings when possible", async (): Promise<void> => {
        const apiKey = "deadbeeffeebdaed";
        const location = createMockCoordinate({ latitude: 51, longitude: 175 });
        const reporterConfig = {
            name: "test",
            type: "@daily-paper/reporter-openweathermap",
            options: {
                apiKey,
                location,
            },
        };

        const logger = setupLogger();
        const client = {
            getForecastByCoordinate: mockFn<[ForecastOptions], Promise<Forecast>>(),
        };
        client.getForecastByCoordinate.resolvesToOnce(createMockForecast());

        await weatherReporter({
            globalConfig: { reporters: [reporterConfig], publishers: [] },
            reporterConfig,
            logger,
            client,
        });

        expect(client.getForecastByCoordinate).toHaveBeenCalledWith([
            {
                coordinate: location,
                exclude: ["minutely"],
                units: "metric",
            },
        ]);
    });

    [
        {
            options: {
                units: "metric",
            } as Omit<WeatherReporterOptions, "apiKey" | "location">,
            openweathermapReportFile: "openweathermap.metric.json",
            expectedReportFile: "report.metric.json",
        },
        {
            options: {
                units: "imperial",
            } as Omit<WeatherReporterOptions, "apiKey" | "location">,
            openweathermapReportFile: "openweathermap.imperial.json",
            expectedReportFile: "report.imperial.json",
        },
    ].forEach(({ options, openweathermapReportFile, expectedReportFile }): void => {
        it(`should respect the settings for '${JSON.stringify(
            options,
        )}'`, async (): Promise<void> => {
            const apiKey = "deadbeeffeebdaed";
            const location = createMockCoordinate({ latitude: 51, longitude: 175 });
            const reporterConfig = {
                name: "test",
                type: "@daily-paper/reporter-openweathermap",
                options: {
                    apiKey,
                    location,

                    ...options,
                },
            };

            const logger = createLogger({ silent: true });
            const client = {
                getForecastByCoordinate: mockFn<[ForecastOptions], Promise<Forecast>>(),
            };

            const forecast = await loadTestData<Forecast>(
                path.join(__dirname, "testData", openweathermapReportFile),
            );
            client.getForecastByCoordinate.resolvesToOnce(forecast);

            const weatherReport = await weatherReporter({
                globalConfig: { reporters: [reporterConfig], publishers: [] },
                reporterConfig,
                logger,
                client,
            });

            const expected = await loadTestData<WeatherReport>(
                path.join(__dirname, "testData", expectedReportFile),
            );

            expect(weatherReport).toEqual(expected);
        });
    });
});
