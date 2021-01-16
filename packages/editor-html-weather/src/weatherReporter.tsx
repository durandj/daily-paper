import React, { FunctionComponent } from "react";
import "wired-elements";

import Theme from "./theme";

export interface WeatherReporterProps {}

const WeatherReporter: FunctionComponent<WeatherReporterProps> = () => {
    return (
        <Theme>
            <wired-button>Test</wired-button>
        </Theme>
    );
};

export default WeatherReporter;
