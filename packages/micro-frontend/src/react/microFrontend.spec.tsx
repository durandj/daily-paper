import { expect, Mock, mockFn } from "earljs";
import { mount } from "enzyme";
import { describe, it } from "mocha";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";

import { PaperError } from "@daily-paper/core";

import { Context, MicroFrontendApp } from "@daily-paper/micro-frontend/application";
import MicroFrontendRegistry from "@daily-paper/micro-frontend/registry";

import MicroFrontend from "./microFrontend";

function wait(ms: number): Promise<void> {
    return new Promise((resolve): void => {
        setTimeout(resolve, ms);
    });
}

function createMockApp(): MicroFrontendApp {
    return {
        mount(container: HTMLElement, context: Context) {
            render(
                <div>
                    Hello,
                    {context.name}
                </div>,
                container,
            );
        },

        unmount(container: HTMLElement) {
            unmountComponentAtNode(container);
        },
    };
}

describe("microFrontend", (): void => {
    it("should render a micro frontend", async (): Promise<void> => {
        const name = "mock";
        const host = "https://localhost";
        const registry = new MicroFrontendRegistry();
        const mockApp = createMockApp();

        const mockScriptLoader = mockFn<[{ host: string; name: string }], Promise<void>>(
            async (): Promise<void> => {
                registry.registerApp("mock", mockApp);
            },
        );

        const component = mount(
            <MicroFrontend
                name={name}
                host={host}
                registry={registry}
                context={{ name: "world" }}
                scriptLoader={mockScriptLoader}
            />,
        );

        expect(mockScriptLoader).toHaveBeenCalledWith([
            {
                host,
                name,
            },
        ]);

        await wait(0);

        const renderedContent = component.getDOMNode();
        expect(renderedContent.textContent).toEqual("Hello,world");
    });

    it("should unmount the application", async (): Promise<void> => {
        const name = "mock";
        const host = "https://localhost";
        const registry = new MicroFrontendRegistry();
        const mockApp = createMockApp();

        mockApp.unmount = mockFn(mockApp.unmount);

        const mockScriptLoader = mockFn<[{ host: string; name: string }], Promise<void>>(
            async (): Promise<void> => {
                registry.registerApp("mock", mockApp);
            },
        );

        const component = mount(
            <MicroFrontend
                name={name}
                host={host}
                registry={registry}
                context={{}}
                scriptLoader={mockScriptLoader}
            />,
        );

        await wait(0);
        component.unmount();
        await wait(0);

        const mockUnmount = mockApp.unmount as Mock<[HTMLElement], void>;
        expect(mockUnmount.calls.length).toEqual(1);
    });

    it("should notify the host of errors loading the application", async (): Promise<void> => {
        const name = "mock";
        const host = "https://localhost";
        const registry = new MicroFrontendRegistry();
        const onError = mockFn<[PaperError], void>(() => {});

        const mockScriptLoader = mockFn<[{ host: string; name: string }], Promise<void>>(() =>
            Promise.reject(new Error("Unknown error")),
        );

        mount(
            <MicroFrontend
                name={name}
                host={host}
                registry={registry}
                context={{}}
                onError={onError}
                scriptLoader={mockScriptLoader}
            />,
        );

        await wait(0);

        expect(onError.calls.length).toEqual(1);
        expect(onError).toHaveBeenCalledWith([expect.a(PaperError)]);
    });

    it("should notify the host when the application didn't register itself", async (): Promise<void> => {
        const name = "mock";
        const host = "https://localhost";
        const registry = new MicroFrontendRegistry();
        const onError = mockFn(() => {});

        const mockScriptLoader = mockFn<[{ host: string; name: string }], Promise<void>>(
            async (): Promise<void> => {},
        );

        mount(
            <MicroFrontend
                name={name}
                host={host}
                registry={registry}
                context={{}}
                onError={onError}
                scriptLoader={mockScriptLoader}
            />,
        );

        await wait(0);

        expect(onError.calls.length).toEqual(1);
    });
});
