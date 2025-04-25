import {TokenKind} from "./Token";

export default {
    "int": TokenKind.TOKEN_TYPE,
    "uint": TokenKind.TOKEN_TYPE,
    "float": TokenKind.TOKEN_TYPE,
    "ufloat": TokenKind.TOKEN_TYPE,
    "char": TokenKind.TOKEN_TYPE,
    "string": TokenKind.TOKEN_TYPE,
    "bool": TokenKind.TOKEN_TYPE,
    "void": TokenKind.TOKEN_TYPE,
} as Record<string, TokenKind>;