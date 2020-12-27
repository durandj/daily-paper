import { expect } from "earljs";
import { describe, it } from "mocha";

import * as realPluginObject from "@daily-paper/core";
import realPluginFunction from "@daily-paper/reporter-openweathermap";

import NPMPluginLoader from "./npmPluginLoader";

describe("plugins::npmPluginLoader", (): void => {
    it("should throw an exception for an unknown plugin", async (): Promise<void> => {
        const pluginLoader = new NPMPluginLoader();

        await expect(pluginLoader.load("@daily-paper/does-not-exist")).toBeRejected();
    });

    it("should return the plugin when the package exists", async (): Promise<void> => {
        const pluginLoader = new NPMPluginLoader();

        const plugin = await pluginLoader.load("@daily-paper/core");
        expect(plugin).toEqual(realPluginObject);
    });

    it("should unwrap plugins that have a default export and return that instead", async (): Promise<void> => {
        const pluginLoader = new NPMPluginLoader();

        const plugin = await pluginLoader.load("@daily-paper/reporter-openweathermap");
        expect(plugin).toEqual(realPluginFunction);
    });
});
