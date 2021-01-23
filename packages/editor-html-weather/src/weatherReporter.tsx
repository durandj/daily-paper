import React, { FunctionComponent } from "react";
import "wired-elements";

import Theme from "./theme";

interface Props {
    report: Record<string, unknown>; // TODO(durandj): replace this with real type
}

const WeatherReporter: FunctionComponent<Props> = ({ report }: Props) => {
    return (
        <Theme>
            <wired-textarea value={JSON.stringify(report, null, 4)} rows={30} />
        </Theme>
    );
};

export default WeatherReporter;
