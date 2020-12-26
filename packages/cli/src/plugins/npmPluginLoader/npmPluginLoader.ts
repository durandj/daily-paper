/* eslint-disable class-methods-use-this */

import PluginLoader from "@daily-paper/cli/plugins/loader";

export default class NPMPluginLoader implements PluginLoader {
    public getPrefix(): string {
        return "npm";
    }

    public load<PluginType>(pluginName: string): Promise<PluginType> {
        return new Promise((resolve, reject): void => {
            try {
                // eslint-disable-next-line global-require, import/no-dynamic-require, @typescript-eslint/no-var-requires
                const plugin = require(pluginName);

                if ("default" in plugin) {
                    resolve(plugin.default);
                } else {
                    resolve(plugin);
                }
            } catch (error) {
                reject(error);
            }
        });
    }
}
