import React, { useCallback, useState } from "react";

import { Meta, Story } from "@storybook/react";

import { createMockWeatherReport } from "@daily-paper/common-weather";

import Theme from "./theme";
import WeatherReporter from "./weatherReporter";

export default {
    title: "WeatherReporter",
    component: WeatherReporter,
} as Meta;

type Props = Record<string, unknown>;

export const Sample: Story<Props> = (_: Record<string, unknown>) => {
    const [report, setReport] = useState(createMockWeatherReport());

    const generateReportCallback = useCallback(() => {
        setReport(createMockWeatherReport());
    }, []);

    return (
        <Theme>
            <WeatherReporter report={report} />

            <wired-divider style={{ margin: "2rem 0" }} />

            <wired-button
                style={{ backgroundColor: "#4A4", color: "white" }}
                onClick={generateReportCallback}
            >
                New Sample Report
            </wired-button>
        </Theme>
    );
};
