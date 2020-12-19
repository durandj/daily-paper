import { expect } from "earljs";
import { describe, it } from "mocha";

import { unixTimeToISO8601 } from "./time";

describe("units::time", (): void => {
    describe("unixTimeToISO8601", (): void => {
        it("should convert Unix timestamp into ISO-8601 date/time string", (): void => {
            const formattedDateTime = unixTimeToISO8601(1607360640);
            expect(formattedDateTime).toEqual("2020-12-07T17:04:00.000Z");
        });
    });
});
