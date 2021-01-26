import React, { FunctionComponent, useCallback, useEffect, useRef } from "react";

import { PaperError } from "@daily-paper/core";

import { Context } from "@daily-paper/micro-frontend/application";
import MicroFrontendRegistry from "@daily-paper/micro-frontend/registry";

function getCanonicalIDs(name: string) {
    const prefix = `micro-frontend--${name}`;

    return {
        containerID: `${prefix}--container`,
        scriptID: `${prefix}--script`,
    };
}

export type ScriptLoader = ({ host, name }: { host: string; name: string }) => Promise<void>;

const defaultScriptLoader: ScriptLoader = ({ host, name }) => {
    return fetch(`${host}/${name}--manifest.json`)
        .then((response) => response.json())
        .then(
            (manifest) =>
                new Promise((resolve, reject) => {
                    const { scriptID } = getCanonicalIDs(name);

                    const scriptTag = document.createElement("script");
                    scriptTag.id = scriptID;
                    scriptTag.src = `${host}${manifest.main}`; // TODO(durandj): validate manifest format
                    scriptTag.onload = () => resolve;
                    scriptTag.onerror = reject;

                    document.head.appendChild(scriptTag);
                }),
        );
};

interface Props {
    host: string;
    name: string;
    registry: MicroFrontendRegistry;
    context: Context;
    onError?: (error: PaperError) => void;
    scriptLoader?: ScriptLoader;
}

const MicroFrontend: FunctionComponent<Props> = ({
    host,
    name,
    registry,
    context,
    onError = () => {},
    scriptLoader = defaultScriptLoader,
}: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { containerID, scriptID } = getCanonicalIDs(name);

    const renderMicroFrontend = useCallback(() => {
        registry.getApp(name).mount(containerRef.current as HTMLElement, context);
    }, [context, name, registry]);

    const container = containerRef.current;
    useEffect(() => {
        if (document.getElementById(scriptID)) {
            renderMicroFrontend();

            return () => {};
        }

        scriptLoader({ host, name })
            .then(renderMicroFrontend)
            .catch((error) => {
                onError(
                    new PaperError("Unable to load micro frontend", {
                        name,
                        error,
                    }),
                );
            });

        return (): void => {
            if (!registry.hasApp(name)) {
                return;
            }

            registry.getApp(name).unmount(container as HTMLElement);
        };
    }, [container, host, name, onError, registry, renderMicroFrontend, scriptID, scriptLoader]);

    return <div ref={containerRef} id={containerID} />;
};

MicroFrontend.defaultProps = {
    onError: () => {},
    scriptLoader: defaultScriptLoader,
};

export default MicroFrontend;
