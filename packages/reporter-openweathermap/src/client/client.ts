import { Coordinate } from "@daily-paper/reporter-openweathermap/types";

import { Forecast } from "./types";

export interface OpenWeatherMapClientOptions {
    apiKey: string;
}

export type ForecastFilter = "current" | "minutely" | "hourly" | "daily" | "alerts";

export interface ForecastOptions {
    coordinate: Coordinate;
    exclude?: ForecastFilter[];
    units?: "standard" | "metric" | "imperial";
    language?: string;
}

export interface OpenWeatherMapClient {
    getForecastByCoordinate(options: ForecastOptions): Promise<Forecast>;
}
