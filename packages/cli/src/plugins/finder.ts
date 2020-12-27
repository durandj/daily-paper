import { PaperError } from "@daily-paper/core";

import PluginLoader from "./loader";
import NPMPluginLoader from "./npmPluginLoader";

class PluginError extends PaperError {
    constructor(message: string, pluginID: string) {
        super(message, { pluginID });
    }
}

const pluginIDFormat = /^(?<prefix>[a-z]\w+):(?<pluginName>.+)$/i;

interface PluginDescriptor {
    prefix: string;
    pluginName: string;
}

function validatePluginID(pluginID: string): PluginDescriptor {
    const result = pluginIDFormat.exec(pluginID);
    const groups = result?.groups;

    if (!groups) {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw new PluginError(`Invalid plugin ID given: '${pluginID}'`, pluginID);
    }

    return (groups as unknown) as PluginDescriptor;
}

const defaultPluginLoaders: Record<string, PluginLoader> = [new NPMPluginLoader()].reduce(
    (loaders, loader) => ({
        ...loaders,

        [loader.getPrefix()]: loader,
    }),
    {},
);

interface LoadPluginOptions {
    pluginID: string;
    pluginLoaders?: Record<string, PluginLoader>;
}

export default async function loadPlugin<PluginType>({
    pluginID,
    pluginLoaders = defaultPluginLoaders,
}: LoadPluginOptions): Promise<PluginType> {
    const { prefix, pluginName } = validatePluginID(pluginID);
    const pluginLoader = pluginLoaders[prefix];

    if (!pluginLoader) {
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw new PluginError(`Unrecognized plugin prefix: '${prefix}'`, pluginID);
    }

    return pluginLoader.load(pluginName);
}
