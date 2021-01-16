import { expect } from "earljs";
import httpStatusCodes from "http-status-codes";
import { beforeEach, describe, it } from "mocha";

import { Coordinate, createMockCoordinate } from "@daily-paper/common-weather";
import { PaperError } from "@daily-paper/core";

import { ForecastFilter } from "./client";
import { OpenWeatherMapClientImpl } from "./implementation";

function getRequiredEnvVar(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Missing required environment variable '${name}'`);
    }

    return value;
}

describe("client", (): void => {
    const apiKey = getRequiredEnvVar("OPENWEATHERMAP_API_KEY");

    describe("getForecastByCoordinate", (): void => {
        let coordinate: Coordinate;

        beforeEach((): void => {
            coordinate = createMockCoordinate();
        });

        it("should get the current forecast", async (): Promise<void> => {
            const client = new OpenWeatherMapClientImpl({ apiKey });
            const forecast = await client.getForecastByCoordinate({ coordinate });

            expect(forecast).toEqual(
                expect.objectWith({
                    lat: coordinate.latitude,
                    lon: coordinate.longitude,
                    current: expect.anything(),
                    minutely: expect.anything(),
                    hourly: expect.anything(),
                    daily: expect.anything(),
                    alerts: expect.anything(),
                }),
            );
        });

        it("should throw an exception when there's an HTTP error", async (): Promise<void> => {
            const client = new OpenWeatherMapClientImpl({ apiKey: "" });
            await expect(client.getForecastByCoordinate({ coordinate })).toBeRejected(
                PaperError,
                `Error while talking to OpenWeatherMap: ${httpStatusCodes.getStatusText(
                    httpStatusCodes.UNAUTHORIZED,
                )}`,
            );
        });

        (["current", "minutely", "hourly", "daily", "alerts"] as ForecastFilter[]).forEach(
            (partToExclude) => {
                it(`should exclude '${partToExclude}' from the forecast`, async (): Promise<void> => {
                    const client = new OpenWeatherMapClientImpl({ apiKey });
                    const forecast = await client.getForecastByCoordinate({
                        coordinate,
                        exclude: [partToExclude],
                    });

                    expect(forecast[partToExclude]).toEqual(undefined);
                });
            },
        );
    });
});
