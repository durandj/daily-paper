import fs from "fs";

import yaml from "js-yaml";

import { createSchemaValidator, validateConfig } from "./validation";
import { Configuration, schema } from "./schema";

export default function loadConfigFromFile(filePath: string): Configuration {
    const validator = createSchemaValidator(schema);

    const file = fs.readFileSync(filePath, "utf-8");
    const yamlFile = yaml.safeLoad(file);

    return validateConfig(validator, yamlFile);
}
