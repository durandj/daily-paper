import { Context, MicroFrontendApp } from "@daily-paper/micro-frontend";

const weatherApp: MicroFrontendApp = {
    mount(_: HTMLElement, __: Context): void {
        throw new Error("Method not implemented.");
    },

    unmount(_: HTMLElement): void {
        throw new Error("Method not implemented.");
    },
};

export default weatherApp;

// TODO(durandj): register application
