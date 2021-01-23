import { fromUnixTime } from "date-fns";

// TODO(durandj): remove this once we add another export
// eslint-disable-next-line import/prefer-default-export
export function unixTimeToISO8601(value: number): string {
    return fromUnixTime(value).toISOString();
}
