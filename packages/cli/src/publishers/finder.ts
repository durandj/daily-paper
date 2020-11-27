import { PublisherConfig } from "@daily-paper/cli/config";

import filePublisher from "./filePublisher";
import { Publisher } from "./publisher";

class UnknownPublisher extends Error {
    public constructor(name: string, type: string) {
        super(`Unable to find publisher of type '${type}' for '${name}'`);
    }
}

export function findPublisher(publisherConfig: PublisherConfig): Publisher {
    switch (publisherConfig.type) {
        case "file":
            return filePublisher;

        default:
            throw new UnknownPublisher(publisherConfig.name, publisherConfig.type);
    }
}
