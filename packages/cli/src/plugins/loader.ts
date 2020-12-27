export default interface PluginLoader {
    getPrefix(): string;

    load<PluginType>(pluginName: string): Promise<PluginType>;
}
