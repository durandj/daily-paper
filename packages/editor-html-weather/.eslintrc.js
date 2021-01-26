const path = require("path");

module.exports = {
    extends: [
        "@daily-paper/eslint-config-react",
    ],
    parserOptions: {
        project: path.resolve(__dirname, "tsconfig.json"),
    },
};
