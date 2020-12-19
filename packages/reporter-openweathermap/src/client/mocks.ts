import { addDays, addHours, addMinutes, getUnixTime } from "date-fns";

import { createMockCoordinate } from "@daily-paper/reporter-openweathermap/mocks";
import {
    randomChoice,
    randomFloat,
    randomInt,
} from "@daily-paper/reporter-openweathermap/testUtils";

import { Forecast } from "./types";

function randomTemperature(): number {
    return randomFloat({ min: -50, max: 120 });
}

function range({ min = 0, max, step = 1 }: { min?: number; max: number; step?: number }): number[] {
    const values: number[] = [];
    for (let i = min; i < max; i += step) {
        values.push(i);
    }

    return values;
}

function createWeatherCondition() {
    return randomChoice([
        { id: 200, main: "Thunderstorm", description: "thunderstorm with light rain", icon: "11d" },
        { id: 201, main: "Thunderstorm", description: "thunderstorm with rain", icon: "11d" },
        { id: 202, main: "Thunderstorm", description: "thunderstorm with heavy rain", icon: "11d" },
        { id: 210, main: "Thunderstorm", description: "light thunderstorm", icon: "11d" },
        { id: 211, main: "Thunderstorm", description: "thunderstorm", icon: "11d" },
        { id: 212, main: "Thunderstorm", description: "heavy thunderstorm", icon: "11d" },
        { id: 221, main: "Thunderstorm", description: "ragged thunderstorm", icon: "11d" },
        {
            id: 230,
            main: "Thunderstorm",
            description: "thunderstorm with light drizzle",
            icon: "11d",
        },
        { id: 231, main: "Thunderstorm", description: "thunderstorm with drizzle", icon: "11d" },
        {
            id: 232,
            main: "Thunderstorm",
            description: "thunderstorm with heavy drizzle",
            icon: "11d",
        },
        { id: 300, main: "Drizzle", description: "light intensity drizzle", icon: "09d" },
        { id: 301, main: "Drizzle", description: "drizzle", icon: "09d" },
        { id: 302, main: "Drizzle", description: "heavy intensity drizzle", icon: "09d" },
        { id: 310, main: "Drizzle", description: "light intensity drizzle rain", icon: "09d" },
        { id: 311, main: "Drizzle", description: "heavy intensity drizzle rain", icon: "09d" },
        { id: 312, main: "Drizzle", description: "heavy intensity  drizzle rain", icon: "09d" },
        { id: 313, main: "Drizzle", description: "shower rain and drizzle ", icon: "09d" },
        { id: 314, main: "Drizzle", description: "heavy shower rain and drizzle", icon: "09d" },
        { id: 321, main: "Drizzle", description: "shower drizzle", icon: "09d" },
        { id: 500, main: "Rain", description: "light rain", icon: "10d" },
        { id: 501, main: "Rain", description: "moderate rain", icon: "10d" },
        { id: 502, main: "Rain", description: "heavy intensity rain", icon: "10d" },
        { id: 503, main: "Rain", description: "very heavy rain", icon: "10d" },
        { id: 504, main: "Rain", description: "extreme rain", icon: "10d" },
        { id: 511, main: "Rain", description: "freezing rain", icon: "13d" },
        { id: 520, main: "Rain", description: "light intensity shower rain", icon: "" },
        { id: 521, main: "Rain", description: "shower rain", icon: "09d" },
        { id: 522, main: "Rain", description: "heavy intensity shower rain", icon: "09d" },
        { id: 531, main: "Rain", description: "ragged shower rain", icon: "09d" },
        { id: 600, main: "Snow", description: "light snow", icon: "13d" },
        { id: 601, main: "Snow", description: "snow", icon: "13d" },
        { id: 602, main: "Snow", description: "heavy snow", icon: "13d" },
        { id: 611, main: "Snow", description: "sleet", icon: "13d" },
        { id: 612, main: "Snow", description: "light shower sleet", icon: "13d" },
        { id: 613, main: "Snow", description: "shower sleet", icon: "13d" },
        { id: 615, main: "Snow", description: "light rain and snow", icon: "13d" },
        { id: 616, main: "Snow", description: "rain and snow", icon: "13d" },
        { id: 620, main: "Snow", description: "light shower snow", icon: "13d" },
        { id: 621, main: "Snow", description: "shower snow", icon: "13d" },
        { id: 622, main: "Snow", description: "heavy shower snow", icon: "13d" },
        { id: 701, main: "Mist", description: "mist", icon: "50d" },
        { id: 711, main: "Smoke", description: "smoke", icon: "50d" },
        { id: 721, main: "Haze", description: "haze", icon: "50d" },
        { id: 731, main: "Dust", description: "sand/dust whirls", icon: "50d" },
        { id: 741, main: "Fog", description: "fog", icon: "50d" },
        { id: 751, main: "Sand", description: "sand", icon: "50d" },
        { id: 761, main: "Dust", description: "dust", icon: "50d" },
        { id: 762, main: "Ash", description: "volcanic ash", icon: "50d" },
        { id: 771, main: "Squall", description: "squalls", icon: "50d" },
        { id: 781, main: "Tornado", description: "tornado", icon: "50d" },
        { id: 800, main: "Clear", description: "clear sky", icon: "01d" }, // TODO(durandj): or 01n
        { id: 801, main: "Clouds", description: "few clouds: 11-25%", icon: "02d" }, // TODO(durandj): or 02n
        { id: 802, main: "Clouds", description: "scattered clouds: 25-50%", icon: "03d" }, // TODO(durandj): or 03n
        { id: 803, main: "Clouds", description: "broken clouds: 51-84%", icon: "04d" }, // TODO(durandj): or 04n
        { id: 804, main: "Clouds", description: "overcast clouds: 85-100%", icon: "04d" }, // TODO(durandj): or 04n
    ]);
}

function createWeather() {
    const iterations = range({ max: randomInt({ max: 2 }) });

    if (iterations.length === 0) {
        // TODO(durandj): or 01n
        return [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }];
    }

    return iterations.map(createWeatherCondition);
}

// TODO(durandj): this should allow for choosing between metric and imperial units
// eslint-disable-next-line import/prefer-default-export
export function createMockForecast(values?: Partial<Forecast>): Forecast {
    const coordinate = createMockCoordinate();

    const now = new Date();

    return {
        lat: coordinate.latitude,
        lon: coordinate.longitude,
        timezone: "UTC",
        timezoneOffset: 0,
        current: {
            dt: getUnixTime(now),
            sunrise: getUnixTime(addHours(now, 6)),
            sunset: getUnixTime(addHours(now, 20)),
            temp: randomTemperature(),
            feelsLike: randomTemperature(),
            pressure: randomInt({ min: 900, max: 1100 }),
            humidity: randomInt({ min: 0, max: 110 }),
            dewPoint: randomInt({ min: 30, max: 50 }),
            uvi: randomInt({ max: 11 }),
            clouds: randomInt({ min: 0, max: 100 }),
            visibility: randomInt({ min: 200, max: 12000 }),
            windSpeed: randomInt({ min: 0, max: 80 }),
            windGust: randomInt({ min: 0, max: 80 }),
            windDeg: randomInt({ min: 0, max: 360 }),
            rain: {
                "1h": randomInt({ max: 10 }),
            },
            snow: {
                "1h": randomInt({ max: 10 }),
            },
            weather: createWeather(),
        },
        minutely: range({ max: 60 }).map((iteration) => ({
            dt: getUnixTime(addMinutes(now, iteration)),
            precipitation: randomFloat({ min: 0, max: 10 }),
        })),
        hourly: range({ max: 48 }).map((iteration) => ({
            dt: getUnixTime(addHours(now, iteration)),
            temp: randomTemperature(),
            feelsLike: randomTemperature(),
            pressure: randomInt({ min: 900, max: 1100 }),
            humidity: randomInt({ min: 0, max: 110 }),
            dewPoint: randomInt({ min: 30, max: 50 }),
            clouds: randomInt({ min: 0, max: 100 }),
            visibility: randomInt({ min: 200, max: 12000 }),
            windSpeed: randomInt({ min: 0, max: 80 }),
            windGust: randomInt({ min: 0, max: 80 }),
            windDeg: randomInt({ min: 0, max: 360 }),
            pop: randomInt({ min: 0, max: 100 }),
            rain: {
                "1h": randomInt({ max: 10 }),
            },
            snow: {
                "1h": randomInt({ max: 10 }),
            },
            weather: createWeather(),
        })),
        daily: range({ max: 7 }).map((iteration) => ({
            dt: getUnixTime(addDays(now, iteration)),
            sunrise: getUnixTime(addHours(now, 6)),
            sunset: getUnixTime(addHours(now, 20)),
            temp: {
                morn: randomTemperature(),
                day: randomTemperature(),
                eve: randomTemperature(),
                night: randomTemperature(),
                min: randomTemperature(),
                max: randomTemperature(),
            },
            feelsLike: {
                morn: randomTemperature(),
                day: randomTemperature(),
                eve: randomTemperature(),
                night: randomTemperature(),
            },
            pressure: randomInt({ min: 900, max: 1100 }),
            humidity: randomInt({ min: 0, max: 110 }),
            dewPoint: randomInt({ min: 30, max: 50 }),
            uvi: randomInt({ max: 11 }),
            windSpeed: randomInt({ min: 0, max: 80 }),
            windGust: randomInt({ min: 0, max: 80 }),
            windDeg: randomInt({ min: 0, max: 360 }),
            clouds: randomInt({ min: 0, max: 100 }),
            pop: randomInt({ min: 0, max: 100 }),
            rain: randomInt({ max: 10 }),
            snow: randomInt({ max: 10 }),
            weather: createWeather(),
        })),
        alerts: range({ max: randomInt({ max: 1 }) }).map(() => ({
            senderName: `Radio station ${randomInt({ min: 1000, max: 10000 })}`,
            event: randomChoice(["tornado", "flooding", "alien invasion", "volcanic eruption"]),
            start: getUnixTime(addMinutes(now, 20)),
            end: getUnixTime(addMinutes(now, 60)),
            description: "Seek shelter",
        })),

        ...values,
    };
}
