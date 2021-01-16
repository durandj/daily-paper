import React from "react";

import { Meta, Story } from "@storybook/react";

import WeatherReporter, { WeatherReporterProps } from "./weatherReporter";

export default {
    title: "WeatherReporter",
    component: WeatherReporter,
} as Meta;

const Template: Story<WeatherReporterProps> = (props: WeatherReporterProps) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <WeatherReporter {...props} />
);

export const Sample = Template.bind({});
Sample.args = {};
