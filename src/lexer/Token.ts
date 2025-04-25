import {str_intern} from "./str_intern";

export enum TokenKind {
    TOKEN_DEFAULT,

    TOKEN_BINARY,
    TOKEN_HEX,
    TOKEN_OCTAL,
    TOKEN_FLOAT,
    TOKEN_INT,
    TOKEN_IDENTIFIER,
    TOKEN_AND_AND,
    TOKEN_OR_OR,
    TOKEN_LAMBDA,
    TOKEN_ADD_ASSIGN,
    TOKEN_SUB_ASSIGN,
    TOKEN_MUL_ASSIGN,
    TOKEN_DIV_ASSIGN,
    TOKEN_OR_ASSIGN,
    TOKEN_AND_ASSIGN,
    TOKEN_XOR_ASSIGN,
    TOKEN_MOD_ASSIGN,
    TOKEN_LSHIFT_ASSIGN,
    TOKEN_RSHIFT_ASSIGN,
    TOKEN_EQUAL,
    TOKEN_NOT_EQUAL,
    TOKEN_LESS,
    TOKEN_LESS_EQUAL,
    TOKEN_MORE,
    TOKEN_MORE_EQUAL,
    TOKEN_ASSIGN,
    TOKEN_INCREMENT_PREFIX,
    TOKEN_INCREMENT_POSTFIX,
    TOKEN_DECREMENT_PREFIX,
    TOKEN_DECREMENT_POSTFIX,
    TOKEN_PLUS,
    TOKEN_MINUS,
    TOKEN_MULTIPLY,
    TOKEN_DIVIDE,
    TOKEN_OR,
    TOKEN_AND,
    TOKEN_XOR,
    TOKEN_MOD,
    TOKEN_LSHIFT,
    TOKEN_RSHIFT,
    TOKEN_SEMI,
    TOKEN_COLON,
    TOKEN_LINE_TERMINATOR,
    TOKEN_WHITESPACE,
    TOKEN_INLINE_COMMENT,
    TOKEN_BLOCK_COMMENT,
    TOKEN_LPAREN,
    TOKEN_RPAREN,
    TOKEN_LBRACE,
    TOKEN_RBRACE,
    TOKEN_LBRACKET,
    TOKEN_RBRACKET,

    TOKEN_KEYWORD,
    TOKEN_TYPE,
    TOKEN_EOF,
    __LENGTH__
}

export const TokenKindNames: Record<TokenKind, string> = Object.freeze({
    [TokenKind.TOKEN_DEFAULT]: str_intern("default"),
    [TokenKind.TOKEN_INT]: str_intern("int"),
    [TokenKind.TOKEN_BINARY]: str_intern("binary"),
    [TokenKind.TOKEN_HEX]: str_intern("hex"),
    [TokenKind.TOKEN_OCTAL]: str_intern("octal"),
    [TokenKind.TOKEN_FLOAT]: str_intern("float"),
    [TokenKind.TOKEN_EOF]: str_intern("eof"),
    [TokenKind.TOKEN_LINE_TERMINATOR]: str_intern("line_terminator"),
    [TokenKind.TOKEN_WHITESPACE]: str_intern("whitespace"),
    [TokenKind.TOKEN_EQUAL]: str_intern("equal"),
    [TokenKind.TOKEN_NOT_EQUAL]: str_intern("not_equal"),
    [TokenKind.TOKEN_LESS]: str_intern("less"),
    [TokenKind.TOKEN_LESS_EQUAL]: str_intern("less_equal"),
    [TokenKind.TOKEN_MORE]: str_intern("more"),
    [TokenKind.TOKEN_MORE_EQUAL]: str_intern("more_equal"),
    [TokenKind.TOKEN_IDENTIFIER]: str_intern("identifier"),
    [TokenKind.TOKEN_LAMBDA]: str_intern("lambda"),
    [TokenKind.TOKEN_ADD_ASSIGN]: str_intern("add_assign"),
    [TokenKind.TOKEN_SUB_ASSIGN]: str_intern("sub_assign"),
    [TokenKind.TOKEN_MUL_ASSIGN]: str_intern("mul_assign"),
    [TokenKind.TOKEN_DIV_ASSIGN]: str_intern("div_assign"),
    [TokenKind.TOKEN_OR_ASSIGN]: str_intern("or_assign"),
    [TokenKind.TOKEN_AND_ASSIGN]: str_intern("and_assign"),
    [TokenKind.TOKEN_XOR_ASSIGN]: str_intern("xor_assign"),
    [TokenKind.TOKEN_MOD_ASSIGN]: str_intern("mod_assign"),
    [TokenKind.TOKEN_LSHIFT_ASSIGN]: str_intern("lshift_assign"),
    [TokenKind.TOKEN_RSHIFT_ASSIGN]: str_intern("rshift_assign"),
    [TokenKind.TOKEN_KEYWORD]: str_intern("keyword"),
    [TokenKind.TOKEN_TYPE]: str_intern("type"),
    [TokenKind.TOKEN_SEMI]: str_intern("semi"),
    [TokenKind.TOKEN_COLON]: str_intern("colon"),
    [TokenKind.TOKEN_INCREMENT_PREFIX]: str_intern("increment_prefix"),
    [TokenKind.TOKEN_INCREMENT_POSTFIX]: str_intern("increment_postfix"),
    [TokenKind.TOKEN_DECREMENT_PREFIX]: str_intern("decrement_prefix"),
    [TokenKind.TOKEN_DECREMENT_POSTFIX]: str_intern("decrement_postfix"),
    [TokenKind.TOKEN_PLUS]: str_intern("plus"),
    [TokenKind.TOKEN_MINUS]: str_intern("minus"),
    [TokenKind.TOKEN_MULTIPLY]: str_intern("multiply"),
    [TokenKind.TOKEN_DIVIDE]: str_intern("divide"),
    [TokenKind.TOKEN_OR]: str_intern("or"),
    [TokenKind.TOKEN_AND]: str_intern("and"),
    [TokenKind.TOKEN_XOR]: str_intern("xor"),
    [TokenKind.TOKEN_MOD]: str_intern("mod"),
    [TokenKind.TOKEN_LSHIFT]: str_intern("lshift"),
    [TokenKind.TOKEN_RSHIFT]: str_intern("rshift"),
    [TokenKind.TOKEN_ASSIGN]: str_intern("assign"),
    [TokenKind.TOKEN_INLINE_COMMENT]: str_intern("inline_comment"),
    [TokenKind.TOKEN_BLOCK_COMMENT]: str_intern("block_comment"),
    [TokenKind.TOKEN_LPAREN]: str_intern("left_paren"),
    [TokenKind.TOKEN_RPAREN]: str_intern("right_paren"),
    [TokenKind.TOKEN_LBRACE]: str_intern("left_brace"),
    [TokenKind.TOKEN_RBRACE]: str_intern("right_brace"),
    [TokenKind.TOKEN_LBRACKET]: str_intern("left_bracket"),
    [TokenKind.TOKEN_RBRACKET]: str_intern("right_bracket"),
    [TokenKind.TOKEN_AND_AND]: str_intern("and_and"),
    [TokenKind.TOKEN_OR_OR]: str_intern("or_or"),

    [TokenKind.__LENGTH__]: str_intern("__LENGTH__"),
});

export function token_kind_name(kind: TokenKind): string {
    if (kind < TokenKind.__LENGTH__) {
        return TokenKindNames[kind];
    } else {
        return "<unknown>"
    }
}

export default class Token {
    public type: TokenKind;
    public literal: string;
    public start: number;
    public end: number;

    constructor(type: TokenKind, literal: string, start: number = 0, end: number = 0) {
        this.type = type;
        this.literal = literal;
        this.start = start;
        this.end = end;
    }

    static token_cmp(t1: Token, t2: Token): boolean {
        return t1.literal === t2.literal && t1.type === t2.type;
    }

    humanize_type() {
        return {
            ...this,
            type: token_kind_name(this.type),
        }
    }
}