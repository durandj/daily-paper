module.exports = {
    require: [
        "ts-node/register/transpile-only",
        "tsconfig-paths/register",
    ],
    extension: ["ts"],
    watchExtensions: ["ts"],
    parallel: true,
    fullTrace: true,
};
