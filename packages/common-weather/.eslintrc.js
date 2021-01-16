const path = require("path");

module.exports = {
    extends: [
        "@daily-paper",
    ],
    parserOptions: {
        project: path.resolve(__dirname, "tsconfig.json"),
    },
    rules: {
    },
};
