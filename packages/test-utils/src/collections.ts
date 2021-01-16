import { randomInt } from "./numeric";

// eslint-disable-next-line import/prefer-default-export
export function randomChoice<Type>(choices: Type[]): Type {
    return choices[randomInt({ max: choices.length })] as Type;
}
