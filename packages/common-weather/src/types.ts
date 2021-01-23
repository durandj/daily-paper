import { Report } from "@daily-paper/core";

export interface Coordinate {
    readonly latitude: number;
    readonly longitude: number;
}

export type DateTimeString = string;
export type Percentage = number;

export interface Temperature {
    unit: "metric" | "imperial";
    value: number;
}

export enum WeatherCondition {
    thunderstorm = "thunderstorm",
    drizzle = "drizzle",
    rain = "rain",
    snow = "snow",
    mist = "mist",
    smoke = "smoke",
    haze = "haze",
    dust = "dust",
    fog = "fog",
    sand = "sand",
    ash = "ash",
    squall = "squall",
    tornado = "tornado",
    clear = "clear",
    clouds = "clouds",
}

export interface WeatherReport extends Report {
    location: Coordinate;
    today: {
        byTheHour: {
            time: DateTimeString;
            temperature: Temperature;
            feelsLike: Temperature;
            humidity: Percentage;
            chanceOfRain: Percentage;
            conditions: {
                weather: WeatherCondition;
                description: string;
            }[];
        }[];
        sunrise: DateTimeString;
        sunset: DateTimeString;
        alerts: {
            sender: string;
            event: string;
            description: string;
            startTime: DateTimeString;
            endTime: DateTimeString;
        }[];
    };
    upcoming: {
        date: DateTimeString;
        sunrise: DateTimeString;
        sunset: DateTimeString;
        temperatures: {
            morning: Temperature;
            day: Temperature;
            evening: Temperature;
            night: Temperature;
            minimum: Temperature;
            maximum: Temperature;
        };
        feelsLike: {
            morning: Temperature;
            day: Temperature;
            evening: Temperature;
            night: Temperature;
        };
        conditions: {
            weather: WeatherCondition;
            description: string;
        }[];
    }[];
}
