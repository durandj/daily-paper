module.exports = {
    extends: [
        "eslint-config-airbnb",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "@daily-paper",
    ],
    rules: {
        "react/jsx-indent": "off",
        "react/jsx-indent-props": "off",
        "react/static-property-placement": "off",
    },
};
