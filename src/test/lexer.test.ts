import Token, {TokenKind} from "../lexer/Token";

export default [
    {
        input: "1",
        expect: [
            new Token(TokenKind.TOKEN_INT, "1"),
            new Token(TokenKind.TOKEN_EOF, ""),
        ],
    },
    {
        input: "   12  = t",
        expect: [
            new Token(TokenKind.TOKEN_INT, "12"),
            new Token(TokenKind.TOKEN_ASSIGN, "="),
            new Token(TokenKind.TOKEN_IDENTIFIER, "t"),
            new Token(TokenKind.TOKEN_EOF, ""),
        ],
    },
    {
        input: "22 + 22 ~ 44",
        expect: [
            new Token(TokenKind.TOKEN_INT, "22"),
            new Token(TokenKind.TOKEN_PLUS, "+"),
            new Token(TokenKind.TOKEN_INT, "22"),
            new Token(TokenKind.TOKEN_EQUAL, "~"),
            new Token(TokenKind.TOKEN_INT, "44"),
            new Token(TokenKind.TOKEN_EOF, ""),
        ],
    },
    {
        input: "num = 33;",
        expect: [
            new Token(TokenKind.TOKEN_IDENTIFIER, "num"),
            new Token(TokenKind.TOKEN_ASSIGN, "="),
            new Token(TokenKind.TOKEN_INT, "33"),
            new Token(TokenKind.TOKEN_SEMI, ";"),
            new Token(TokenKind.TOKEN_EOF, ""),
        ],
    },
    {
        input: "num => 33;",
        expect: [
            new Token(TokenKind.TOKEN_IDENTIFIER, "num"),
            new Token(TokenKind.TOKEN_LAMBDA, "=>"),
            new Token(TokenKind.TOKEN_INT, "33"),
            new Token(TokenKind.TOKEN_SEMI, ";"),
            new Token(TokenKind.TOKEN_EOF, ""),
        ],
    },
    {
        input: "int while = 33; if!!",
        expect: [
            new Token(TokenKind.TOKEN_TYPE, "int"),
            new Token(TokenKind.TOKEN_KEYWORD, "while"),
            new Token(TokenKind.TOKEN_ASSIGN, "="),
            new Token(TokenKind.TOKEN_INT, "33"),
            new Token(TokenKind.TOKEN_SEMI, ";"),
            new Token(TokenKind.TOKEN_KEYWORD, "if"),
            new Token(TokenKind.TOKEN_DEFAULT, "!"),
            new Token(TokenKind.TOKEN_DEFAULT, "!"),
            new Token(TokenKind.TOKEN_EOF, ""),
        ],
    },
    {
        input: `
            int x = 42;
            x + 3 ~ 45;
        `,
        expect: [
            new Token(TokenKind.TOKEN_TYPE, "int"),
            new Token(TokenKind.TOKEN_IDENTIFIER, "x"),
            new Token(TokenKind.TOKEN_ASSIGN, "="),
            new Token(TokenKind.TOKEN_INT, "42"),
            new Token(TokenKind.TOKEN_SEMI, ";"),
            new Token(TokenKind.TOKEN_IDENTIFIER, "x"),
            new Token(TokenKind.TOKEN_PLUS, "+"),
            new Token(TokenKind.TOKEN_INT, "3"),
            new Token(TokenKind.TOKEN_EQUAL, "~"),
            new Token(TokenKind.TOKEN_INT, "45"),
            new Token(TokenKind.TOKEN_SEMI, ";"),
            new Token(TokenKind.TOKEN_EOF, ""),
        ],
    },
];