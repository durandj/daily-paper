module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
    },
    extends: [
        "plugin:@typescript-eslint/recommended",
        "eslint-config-airbnb-base",
        "eslint-config-airbnb-typescript",
        "plugin:prettier/recommended",
        "prettier/@typescript-eslint",
        "typestrict",
    ],
    ignorePatterns: [".eslintrc.js"],
    rules: {
        "@typescript-eslint/lines-between-class-members": "off",
        "react/static-property-placement": "off",
    },
}
