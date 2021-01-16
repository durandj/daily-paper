import { randomInt } from "@daily-paper/test-utils";

import { Coordinate } from "./types";

// eslint-disable-next-line import/prefer-default-export
export function createMockCoordinate(values?: Partial<Coordinate>): Coordinate {
    return {
        latitude: randomInt({ min: -90, max: 90 }),
        longitude: randomInt({ min: -180, max: 180 }),

        ...values,
    };
}
