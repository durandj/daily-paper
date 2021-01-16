import { expect } from "earljs";
import fetchMock from "fetch-mock";
import httpStatusCodes from "http-status-codes";
import { beforeEach, describe, it } from "mocha";

import { Coordinate, createMockCoordinate } from "@daily-paper/common-weather";
import { PaperError } from "@daily-paper/core";

import { ForecastFilter } from "./client";
import { openWeatherMapBaseUrl, OpenWeatherMapClientImpl } from "./implementation";
import { createMockForecast } from "./mocks";
import { convertObjectKeysToSnakeCase } from "./requestUtils";

describe("client", (): void => {
    const apiKey = "deadbeeffeebdaed";

    describe("getForecastByCoordinate", (): void => {
        let fetch: fetchMock.FetchMockSandbox;
        let coordinate: Coordinate;
        const forecastUrl = `${openWeatherMapBaseUrl}/data/2.5/onecall`;

        beforeEach((): void => {
            fetch = fetchMock.sandbox();
            coordinate = createMockCoordinate();
        });

        it("should get the current forecast", async (): Promise<void> => {
            const client = new OpenWeatherMapClientImpl({ apiKey, fetch });
            const expectedForecast = createMockForecast();

            fetch.getOnce(
                {
                    url: forecastUrl,
                    query: {
                        appid: apiKey,
                        lat: coordinate.latitude.toString(),
                        lon: coordinate.longitude.toString(),
                        units: "metric",
                        lang: "en_us",
                    },
                },
                {
                    status: httpStatusCodes.OK,
                    body: convertObjectKeysToSnakeCase(
                        (expectedForecast as unknown) as Record<string, unknown>,
                    ),
                },
            );

            const forecast = await client.getForecastByCoordinate({ coordinate });
            expect(forecast).toEqual(expectedForecast);
        });

        it("should throw an exception when there's an HTTP error", async (): Promise<void> => {
            const client = new OpenWeatherMapClientImpl({ apiKey, fetch });
            const errorCode = httpStatusCodes.INTERNAL_SERVER_ERROR;

            fetch.getOnce(
                {
                    url: forecastUrl,
                    query: {
                        appid: apiKey,
                        lat: coordinate.latitude.toString(),
                        lon: coordinate.longitude.toString(),
                        units: "metric",
                        lang: "en_us",
                    },
                },
                errorCode,
            );

            await expect(client.getForecastByCoordinate({ coordinate })).toBeRejected(
                PaperError,
                `Error while talking to OpenWeatherMap: ${httpStatusCodes.getStatusText(
                    errorCode,
                )}`,
            );
        });

        (["current", "minutely", "hourly", "daily", "alerts"] as ForecastFilter[]).forEach(
            (partToExclude) => {
                it(`should exclude '${partToExclude}' from the forecast`, async (): Promise<void> => {
                    const client = new OpenWeatherMapClientImpl({ apiKey, fetch });
                    const expectedForecast = createMockForecast();
                    delete expectedForecast[partToExclude];

                    fetch.getOnce(
                        {
                            url: forecastUrl,
                            query: {
                                appid: apiKey,
                                lat: coordinate.latitude.toString(),
                                lon: coordinate.longitude.toString(),
                                units: "metric",
                                lang: "en_us",
                            },
                        },
                        {
                            status: httpStatusCodes.OK,
                            body: convertObjectKeysToSnakeCase(
                                (expectedForecast as unknown) as Record<string, unknown>,
                            ),
                        },
                    );

                    const forecast = await client.getForecastByCoordinate({ coordinate });
                    expect(forecast).toEqual(expectedForecast);
                    expect(forecast[partToExclude]).toEqual(undefined);
                });
            },
        );
    });
});
