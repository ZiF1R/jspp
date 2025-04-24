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
        input: "22 + 22 == 44",
        expect: [
            new Token(TokenKind.TOKEN_INT, "22"),
            new Token(TokenKind.TOKEN_PLUS, "+"),
            new Token(TokenKind.TOKEN_INT, "22"),
            new Token(TokenKind.TOKEN_EQUAL, "=="),
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
        input: `int x = 42;
            x + 3 == 45;`,
        expect: [
            new Token(TokenKind.TOKEN_TYPE, "int"),
            new Token(TokenKind.TOKEN_IDENTIFIER, "x"),
            new Token(TokenKind.TOKEN_ASSIGN, "="),
            new Token(TokenKind.TOKEN_INT, "42"),
            new Token(TokenKind.TOKEN_SEMI, ";"),
            new Token(TokenKind.TOKEN_LINE_TERMINATOR, "\n"),
            new Token(TokenKind.TOKEN_IDENTIFIER, "x"),
            new Token(TokenKind.TOKEN_PLUS, "+"),
            new Token(TokenKind.TOKEN_INT, "3"),
            new Token(TokenKind.TOKEN_EQUAL, "=="),
            new Token(TokenKind.TOKEN_INT, "45"),
            new Token(TokenKind.TOKEN_SEMI, ";"),
            new Token(TokenKind.TOKEN_EOF, ""),
        ],
    },
    {
        input: `# inline comment1
        #- multi line
        int var = 3;
        comment -#
        
        # inline comment2`,
        expect: [
            new Token(TokenKind.TOKEN_INLINE_COMMENT, "# inline comment1"),
            new Token(TokenKind.TOKEN_LINE_TERMINATOR, "\n"),
            new Token(TokenKind.TOKEN_BLOCK_COMMENT, "#- multi line\n        int var = 3;\n        comment -#"),
            new Token(TokenKind.TOKEN_LINE_TERMINATOR, "\n"),
            new Token(TokenKind.TOKEN_INLINE_COMMENT, "# inline comment2"),
            new Token(TokenKind.TOKEN_EOF, ""),
        ],
    },
    {
        input: "(t) && [} || 3 |",
        expect: [
            new Token(TokenKind.TOKEN_LPAREN, "("),
            new Token(TokenKind.TOKEN_IDENTIFIER, "t"),
            new Token(TokenKind.TOKEN_RPAREN, ")"),
            new Token(TokenKind.TOKEN_AND_AND, "&&"),
            new Token(TokenKind.TOKEN_LBRACKET, "["),
            new Token(TokenKind.TOKEN_RBRACE, "}"),
            new Token(TokenKind.TOKEN_OR_OR, "||"),
            new Token(TokenKind.TOKEN_INT, "3"),
            new Token(TokenKind.TOKEN_DEFAULT, "|"),
            new Token(TokenKind.TOKEN_EOF, ""),
        ],
    },
];