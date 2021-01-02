export type Context = Record<string, unknown>;

export interface MicroFrontendApp {
    mount(container: HTMLElement, context: Context): void;

    unmount(container: HTMLElement): void;
}
