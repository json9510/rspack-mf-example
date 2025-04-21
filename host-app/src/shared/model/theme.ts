export interface Theme {
    global:    Global;
    $themes:   unknown[];
    $metadata: Metadata;
}

export interface Metadata {
    tokenSetOrder: string[];
}

export interface Global {
    White:            Color;
    Black:            Color;
    Presentation:     Color;
    Variant:          Color;
    Neutral:          { [key: string]: Color };
    Primary:          { [key: string]: Color };
    Secondary:        Secondary;
    Secondary_green:  { [key: string]: Color };
    Tertiary:         { [key: string]: Color };
    Error:            { [key: string]: Color };
    Warning:          { [key: string]: Color };
    Success:          { [key: string]: Color };
    Information:      { [key: string]: Color };
}

export interface Color {
    value: string;
    type:  string;
}

export interface Secondary {
    orange: { [key: string]: Color };
    green:  { [key: string]: Color };
    yellow: { [key: string]: Color };
}