import fs from "fs";

import yaml from "js-yaml";

import { Configuration, createSchemaValidator, schema, validateConfig } from "@daily-paper/core";

export default function loadConfigFromFile(filePath: string): Configuration {
    const validator = createSchemaValidator(schema);

    const file = fs.readFileSync(filePath, "utf-8");
    const yamlFile = yaml.safeLoad(file);

    return validateConfig(validator, yamlFile);
}
