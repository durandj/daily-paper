// eslint-disable-next-line import/no-extraneous-dependencies
import Enzyme from "enzyme";
// eslint-disable-next-line import/no-extraneous-dependencies
import { JSDOM } from "jsdom";

// eslint-disable-next-line import/no-extraneous-dependencies
import ReactAdapter from "@wojtekmaj/enzyme-adapter-react-17";

Enzyme.configure({ adapter: new ReactAdapter() });

const { window } = new JSDOM();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - We're ignoring this there's no better option
global.window = window;

global.document = window.document;
