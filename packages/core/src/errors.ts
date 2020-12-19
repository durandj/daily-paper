export type ErrorContext = Record<string, unknown>;

export class PaperError extends Error {
    public readonly context: ErrorContext;

    constructor(message: string, context: ErrorContext = {}) {
        super(message);

        this.context = context;
    }
}
