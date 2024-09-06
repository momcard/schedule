export interface TypeDesign {
    zIndex: number;
    width?: number;
    height?: number;
    transform: string;
    backgroundColor?: string;
    color?: string;
    fontSize?: number;
    fontName?: string;
    fontItalic?: boolean;
    letterSpacing?: number;
    lineHeight?: number;
    textAlign?: "left" | "center" | "right" | undefined;
    textShadow?: string;
    boxShadow?: string;
    opacity?: number;
    borderWidth?: number;
    borderRadius?: number;
    borderColor?: string;
    borderStyle?: string;
    padding?: number;
}

export interface TypeTextShadow {
    backgroundColor: string;
    color: string;
    fontSize: number;
    textShadow: string;
}