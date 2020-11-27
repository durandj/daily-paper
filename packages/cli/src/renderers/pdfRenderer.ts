import puppeteer from "puppeteer";

import { Configuration } from "@daily-paper/cli/config";

import htmlRenderer from "./htmlRenderer";
import { RenderContext, Renderer } from "./renderer";

const pdfRenderer: Renderer = async (
    config: Configuration,
    context: RenderContext,
): Promise<Buffer> => {
    const { logger } = context;

    const html = await htmlRenderer(config, context);

    logger.debug("Starting headless browser");
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    logger.debug("Setting browser page to rendered HTML");
    await page.setContent(html.toString("utf-8"));

    logger.debug("Saving paper to PDF format");
    const pdf = await page.pdf();

    logger.debug("Closing page");
    await page.close();

    logger.debug("Closing browser");
    await browser.close();

    return pdf;
};

export default pdfRenderer;
