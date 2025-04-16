export enum TokenKind {
    TOKEN_DEFAULT,
    TOKEN_INT,
    TOKEN_EOF,
    TOKEN_KEYWORD,
    TOKEN_SEMI,
    TOKEN_COLON,
    TOKEN_PLUS,
    TOKEN_MINUS,
    TOKEN_MULTIPLY,
    TOKEN_DIVIDE,
    TOKEN_ASSIGN,
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