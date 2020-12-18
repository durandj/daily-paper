export function randomFloat({ min = 0, max }: { min?: number; max: number }): number {
    const range = max - min;

    return Math.random() * range + min;
}

export function randomInt({ min = 0, max }: { min?: number; max: number }): number {
    return Math.floor(randomFloat({ min, max }));
}

export function randomChoice<Type>(choices: Type[]): Type {
    return choices[randomInt({ max: choices.length })] as Type;
}
