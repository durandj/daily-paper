const baseMochaRC = require("@daily-paper/mocharc");

module.exports = {
    ...baseMochaRC,

    require: [
        ...baseMochaRC.require,
        "./src/testSetup.ts",
    ],
};
