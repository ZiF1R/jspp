export enum TokenKind {
    TOKEN_DEFAULT = "default",
    TOKEN_INT = "int",
    TOKEN_EOF = "eof",
    TOKEN_NEW_LINE = "new_line",
    TOKEN_KEYWORD = "keyword",
    TOKEN_SEMI = "semi",
    TOKEN_COLON = "colon",
    TOKEN_PLUS = "plus",
    TOKEN_MINUS = "minus",
    TOKEN_MULTIPLY = "multiply",
    TOKEN_DIVIDE = "divide",
    TOKEN_ASSIGN = "assign",
}

export default class Token {
    public type: TokenKind;
    public literal: string;
    // public start: number;
    // public end: number;

    constructor(type: TokenKind, literal: string) {
        this.type = type;
        this.literal = literal;
    }
}