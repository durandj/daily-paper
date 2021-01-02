module.exports = {
    require: [
        "ts-node/register/transpile-only",
        "tsconfig-paths/register",
    ],
    extension: ["ts", "tsx"],
    watchExtensions: ["ts", "tsx"],
    parallel: true,
    fullTrace: true,
};
