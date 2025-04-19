import {TokenKind} from "./Token";

export default {
    "if": TokenKind.TOKEN_KEYWORD,
    "else": TokenKind.TOKEN_KEYWORD,
    "elif": TokenKind.TOKEN_KEYWORD,
    "while": TokenKind.TOKEN_KEYWORD,
    "return": TokenKind.TOKEN_KEYWORD,
    "export": TokenKind.TOKEN_KEYWORD,
    "import": TokenKind.TOKEN_KEYWORD,
    "class": TokenKind.TOKEN_KEYWORD,
} as Record<string, TokenKind>;

