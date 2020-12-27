import { expect, mockFn } from "earljs";
import { describe, it } from "mocha";

import loadPlugin from "./finder";

function createDummyLoader() {
    return {
        getPrefix(): string {
            return "dummy";
        },

        load: mockFn(),
    };
}

describe("plugins::finder", (): void => {
    ["", "name", "prefix:", ":name", "1:name", "1a:name"].forEach((invalidID): void => {
        it(`should throw an exception for an invalid plugin ID: '${invalidID}'`, async (): Promise<void> => {
            await expect(
                loadPlugin({
                    pluginID: invalidID,
                }),
            ).toBeRejected();
        });
    });

    it("should throw an exception when given an unrecognized prefix", async (): Promise<void> => {
        const dummyLoader = createDummyLoader();

        await expect(
            loadPlugin({
                pluginID: "bad:name",
                pluginLoaders: { [dummyLoader.getPrefix()]: dummyLoader },
            }),
        ).toBeRejected();
    });

    it("should load the plugin based on the plugin ID", async (): Promise<void> => {
        const dummyLoader = createDummyLoader();
        const mockPlugin = {};

        dummyLoader.load.resolvesToOnce(mockPlugin);

        const pluginName = "myPlugin";
        expect(
            await loadPlugin({
                pluginID: `${dummyLoader.getPrefix()}:${pluginName}`,
                pluginLoaders: { [dummyLoader.getPrefix()]: dummyLoader },
            }),
        ).toEqual(mockPlugin);
    });

    it("should throw an exception from the plugin loader when unable to load the plugin", async (): Promise<void> => {
        const dummyLoader = createDummyLoader();

        dummyLoader.load.rejectsWithOnce(new Error("Something happened"));

        const pluginName = "myPlugin";
        await expect(
            loadPlugin({
                pluginID: `${dummyLoader.getPrefix()}:${pluginName}`,
                pluginLoaders: { [dummyLoader.getPrefix()]: dummyLoader },
            }),
        ).toBeRejected();
    });
});
