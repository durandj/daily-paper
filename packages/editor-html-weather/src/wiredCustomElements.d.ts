declare namespace JSX {
    interface IntrinsicElements {
        "wired-button": React.DetailedHTMLProps<
            React.HTMLAttributes<HTMLButtonElement>,
            HTMLButtonElement
        >;

        "wired-divider": React.DetailedHTMLProps<>;

        "wired-textarea": React.DetailedHTMLProps<
            React.FunctionComponent<{
                value?: string;
                placeholder?: string;
                rows?: number;
                maxrows?: number;
                disabled?: boolean;
            }>
        >;
    }
}
