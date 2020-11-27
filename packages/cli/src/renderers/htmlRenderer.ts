import pug from "pug";

import { Configuration } from "@daily-paper/cli/config";

import { RenderContext, Renderer } from "./renderer";

const template = pug.compile(`
doctype html
html
    head
        meta(charset="utf-8")

        title #{title}

        link(rel="icon" href=logo)

    body
        h1 Hello, world!
`);

const htmlRenderer: Renderer = async (
    config: Configuration,
    { logger }: RenderContext,
): Promise<Buffer> => {
    logger.info("Rendering paper as HTML");

    return Buffer.from(
        template({
            title: config.paper?.name,
            logo: config.paper?.logo,
        }),
        "utf-8",
    );
};

export default htmlRenderer;
