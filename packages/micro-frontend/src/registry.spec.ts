import { expect } from "earljs";
import { describe, it } from "mocha";

import { MicroFrontendApp } from "./application";
import MicroFrontendRegistry from "./registry";

class MockApp implements MicroFrontendApp {
    // eslint-disable-next-line class-methods-use-this
    mount(): void {
        // Do nothing
    }

    // eslint-disable-next-line class-methods-use-this
    unmount(): void {
        // Do nothing
    }
}

describe("registry", (): void => {
    it("should register an application", (): void => {
        const appName = "mock";
        const app = new MockApp();
        const registry = new MicroFrontendRegistry();

        registry.registerApp(appName, app);

        expect(registry.hasApp(appName)).toEqual(true);
        expect(registry.getApp(appName)).toEqual(app);
    });

    it("should return false for hasApp when an app isn't registered", (): void => {
        const registry = new MicroFrontendRegistry();

        expect(registry.hasApp("mock")).toEqual(false);
    });

    it("should throw an error when getApp is called with an unrecognized app", (): void => {
        const registry = new MicroFrontendRegistry();

        expect((): void => {
            registry.getApp("mock");
        }).toThrow();
    });
});
