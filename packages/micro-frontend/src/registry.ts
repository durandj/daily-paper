import { PaperError } from "@daily-paper/core";

import { MicroFrontendApp } from "./application";

export default class MicroFrontendRegistry {
    private readonly registry = new Map<string, MicroFrontendApp>();

    public registerApp(name: string, app: MicroFrontendApp): void {
        this.registry.set(name, app);
    }

    public hasApp(name: string): boolean {
        return this.registry.has(name);
    }

    public getApp(name: string): MicroFrontendApp {
        const app = this.registry.get(name);
        if (!app) {
            throw new PaperError(`Unknown application ${name}`, {
                name,
            });
        }

        return app;
    }
}
