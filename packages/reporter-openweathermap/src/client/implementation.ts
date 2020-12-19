import { URLSearchParams } from "url";

import nodeFetch, { RequestInfo, RequestInit, Response } from "node-fetch";

import { PaperError } from "@daily-paper/core";

import { ForecastOptions, OpenWeatherMapClient, OpenWeatherMapClientOptions } from "./client";
import { convertObjectKeysToCamelCase } from "./requestUtils";
import { Forecast } from "./types";

export const openWeatherMapBaseUrl = "https://api.openweathermap.org";

type Fetch = (url: RequestInfo, init?: RequestInit) => Promise<Response>;

interface ClientImplOptions extends OpenWeatherMapClientOptions {
    fetch?: Fetch;
}

export class OpenWeatherMapClientImpl implements OpenWeatherMapClient {
    private readonly apiKey: string;
    private readonly fetch: Fetch;

    public constructor({ apiKey, fetch = nodeFetch }: ClientImplOptions) {
        this.apiKey = apiKey;
        this.fetch = fetch;
    }

    public async getForecastByCoordinate({
        coordinate,
        exclude,
        units = "metric",
        language = "en_us",
    }: ForecastOptions): Promise<Forecast> {
        const query = new URLSearchParams();
        query.append("appid", this.apiKey);
        query.append("lat", coordinate.latitude.toString());
        query.append("lon", coordinate.longitude.toString());
        query.append("units", units);
        query.append("lang", language);

        if (exclude) {
            query.append("exclude", exclude.join(","));
        }

        const url = `${openWeatherMapBaseUrl}/data/2.5/onecall?${query.toString()}`;
        const response = await this.fetch(url, {
            method: "GET",
        });

        if (!response.ok) {
            throw new PaperError(`Error while talking to OpenWeatherMap: ${response.statusText}`, {
                coordinate,
                exclude,
                units,
                language,
                statusCode: response.status,
                reason: await response.text(),
            });
        }

        const report = await response.json();

        return convertObjectKeysToCamelCase(report as Record<string, unknown>);
    }
}

export function createClient({ apiKey }: OpenWeatherMapClientOptions): OpenWeatherMapClient {
    return new OpenWeatherMapClientImpl({ apiKey });
}
