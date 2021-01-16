import { WeatherCondition, WeatherReport } from "@daily-paper/common-weather";
import { PaperError, Reporter, ReporterContext } from "@daily-paper/core";

import { createClient, OpenWeatherMapClient } from "./client";
import { validateReporterConfig } from "./options";
import { unixTimeToISO8601 } from "./units";

interface WeatherReporterContext extends ReporterContext {
    client?: OpenWeatherMapClient;
}

function getClient(context: WeatherReporterContext, apiKey: string): OpenWeatherMapClient {
    if (context.client) {
        return context.client;
    }

    return createClient({ apiKey });
}

const weatherConditionMapping: Record<string, WeatherCondition> = {
    Thunderstorm: "thunderstorm",
    Drizzle: "drizzle",
    Rain: "rain",
    Snow: "snow",
    Mist: "mist",
    Smoke: "smoke",
    Haze: "haze",
    Dust: "dust",
    Fog: "fog",
    Sand: "sand",
    Ash: "ash",
    Squall: "squall",
    Tornado: "tornado",
    Clear: "clear",
    Clouds: "clouds",
};

function lookupWeatherCondition(value: string): WeatherCondition {
    const condition = weatherConditionMapping[value];
    if (!condition) {
        throw new Error(`Unrecognized weather condition given: '${value}'`);
    }

    return condition;
}

const weatherReporter: Reporter<WeatherReporterContext> = async (
    context: WeatherReporterContext,
): Promise<WeatherReport> => {
    const { apiKey, location, units = "metric" } = validateReporterConfig(
        context.reporterConfig.options,
    );
    const client = getClient(context, apiKey);

    const forecast = await client.getForecastByCoordinate({
        coordinate: location,
        units,
        exclude: ["minutely"],
    });

    const currentConditions = forecast.current;
    if (!currentConditions) {
        throw new PaperError("Missing current weather conditions");
    }

    const hourlyForecast = forecast.hourly || [];
    const dailyForecast = forecast.daily || [];
    const alerts = forecast.alerts || [];

    return {
        location,
        today: {
            byTheHour: hourlyForecast
                .sort((first, second) => {
                    if (first.dt === second.dt) {
                        return 0;
                    }

                    if (first.dt < second.dt) {
                        return -1;
                    }

                    return 1;
                })
                .map((hourForecast) => ({
                    time: unixTimeToISO8601(hourForecast.dt),
                    temperature: {
                        unit: units,
                        value: hourForecast.temp,
                    },
                    feelsLike: {
                        unit: units,
                        value: hourForecast.feelsLike,
                    },
                    humidity: hourForecast.humidity,
                    chanceOfRain: hourForecast.pop,
                    conditions: hourForecast.weather.map((weather) => ({
                        weather: lookupWeatherCondition(weather.main),
                        description: weather.description,
                    })),
                })),
            sunrise: unixTimeToISO8601(currentConditions.sunrise),
            sunset: unixTimeToISO8601(currentConditions.sunset),
            alerts: alerts
                .sort((first, second) => {
                    if (first.start === second.start) {
                        return 0;
                    }

                    if (first.start < second.start) {
                        return -1;
                    }

                    return 1;
                })
                .map((alert) => ({
                    sender: alert.senderName,
                    event: alert.event,
                    description: alert.description,
                    startTime: unixTimeToISO8601(alert.start),
                    endTime: unixTimeToISO8601(alert.end),
                })),
        },
        upcoming: dailyForecast
            .sort((first, second) => {
                if (first.dt === second.dt) {
                    return 0;
                }
                if (first.dt < second.dt) {
                    return -1;
                }
                return 1;
            })
            .map((dayForecast) => ({
                date: unixTimeToISO8601(dayForecast.dt),
                sunrise: unixTimeToISO8601(dayForecast.sunrise),
                sunset: unixTimeToISO8601(dayForecast.sunset),
                temperatures: {
                    morning: {
                        unit: units,
                        value: dayForecast.temp.morn,
                    },
                    day: {
                        unit: units,
                        value: dayForecast.temp.day,
                    },
                    evening: {
                        unit: units,
                        value: dayForecast.temp.eve,
                    },
                    night: {
                        unit: units,
                        value: dayForecast.temp.night,
                    },
                    minimum: {
                        unit: units,
                        value: dayForecast.temp.min,
                    },
                    maximum: {
                        unit: units,
                        value: dayForecast.temp.max,
                    },
                },
                feelsLike: {
                    morning: {
                        unit: units,
                        value: dayForecast.feelsLike.morn,
                    },
                    day: {
                        unit: units,
                        value: dayForecast.feelsLike.day,
                    },
                    evening: {
                        unit: units,
                        value: dayForecast.feelsLike.eve,
                    },
                    night: {
                        unit: units,
                        value: dayForecast.feelsLike.night,
                    },
                },
                conditions: dayForecast.weather.map((weather) => ({
                    weather: lookupWeatherCondition(weather.main),
                    description: weather.description,
                })),
            })),
    };
};

export default weatherReporter;
