import { addDays, addHours } from "date-fns";

import { randomChoice, randomInt, range } from "@daily-paper/test-utils";

import { Coordinate, Temperature, WeatherCondition, WeatherReport } from "./types";

// eslint-disable-next-line import/prefer-default-export
export function createMockCoordinate(values?: Partial<Coordinate>): Coordinate {
    return {
        latitude: randomInt({ min: -90, max: 90 }),
        longitude: randomInt({ min: -180, max: 180 }),

        ...values,
    };
}

function formatTemperature(value: number): Temperature {
    return {
        unit: "metric",
        value,
    };
}

// TODO(durandj): createMockWeatherReport could benefit from Gaussian selection of events
export function createMockWeatherReport(values?: Partial<WeatherReport>): WeatherReport {
    const reportDay = new Date();

    return {
        location: createMockCoordinate(),
        today: {
            byTheHour: range({ max: 48 }).map((hour: number) => {
                const currentTemperature = randomInt({ min: -50, max: 50 });

                return {
                    time: addHours(reportDay, hour).toISOString(),
                    temperature: formatTemperature(currentTemperature),
                    feelsLike: formatTemperature(
                        currentTemperature + randomInt({ min: -5, max: 5 }),
                    ),
                    humidity: randomInt({ min: 0, max: 100 }),
                    chanceOfRain: randomInt({ min: 0, max: 100 }),
                    conditions: range({ min: 0, max: 2 }).map(() => {
                        const condition = randomChoice(WeatherCondition);

                        return {
                            weather: condition,
                            description: condition,
                        };
                    }),
                };
            }),
            sunrise: addHours(reportDay, 2).toISOString(),
            sunset: addHours(reportDay, 12).toISOString(),
            alerts: range({ min: 0, max: 1 }).map(() => {
                const startTime = addHours(reportDay, randomInt({ min: 1, max: 6 }));
                return {
                    sender: "National Weather Service",
                    event: randomChoice([
                        "Thunder storm",
                        "Tornado",
                        "Hurricane",
                        "Hale storm",
                        "Flooding",
                    ]),
                    description: "Seek shelter immediately",
                    startTime: startTime.toISOString(),
                    endTime: addHours(startTime, randomInt({ min: 1, max: 4 })).toISOString(),
                };
            }),
        },
        upcoming: range({ max: 7 }).map((day: number) => {
            const date = addDays(reportDay, day);
            const initialTemperature = randomInt({ min: -50, max: 50 });

            return {
                date: date.toISOString(),
                sunrise: addHours(date, 2).toISOString(),
                sunset: addHours(date, 12).toISOString(),
                temperatures: {
                    morning: formatTemperature(initialTemperature),
                    day: formatTemperature(initialTemperature + randomInt({ min: -5, max: 5 })),
                    evening: formatTemperature(initialTemperature + randomInt({ min: -5, max: 5 })),
                    night: formatTemperature(initialTemperature + randomInt({ min: -5, max: 5 })),
                    minimum: formatTemperature(
                        initialTemperature + randomInt({ min: -10, max: -5 }),
                    ),
                    maximum: formatTemperature(initialTemperature + randomInt({ min: 5, max: 10 })),
                },
                feelsLike: {
                    morning: formatTemperature(initialTemperature),
                    day: formatTemperature(initialTemperature + randomInt({ min: -5, max: 5 })),
                    evening: formatTemperature(initialTemperature + randomInt({ min: -5, max: 5 })),
                    night: formatTemperature(initialTemperature + randomInt({ min: -5, max: 5 })),
                },
                conditions: range({ min: 0, max: 2 }).map(() => {
                    const condition = randomChoice(WeatherCondition);

                    return {
                        weather: condition,
                        description: condition,
                    };
                }),
            };
        }),

        ...values,
    };
}
