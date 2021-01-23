import { randomInt } from "./numeric";

type Enumeration<Type> = Record<string, Type>;

export function randomChoice<Type>(choices: Type[] | Enumeration<Type>): Type {
    if (Array.isArray(choices)) {
        return choices[randomInt({ max: choices.length })] as Type;
    }

    return randomChoice(Object.values(choices));
}

interface RangeOpts {
    min?: number;
    max: number;
}
export function range({ min = 0, max }: RangeOpts): number[] {
    const values = [];
    for (let i = min; i < max; i++) {
        values.push(i);
    }

    return values;
}
