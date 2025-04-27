import StringIntern from "./StringIntern";

export enum TokenKind {
    TOKEN_DEFAULT,

    TOKEN_BINARY,
    TOKEN_HEX,
    TOKEN_OCTAL,
    TOKEN_FLOAT,
    TOKEN_INT,
    TOKEN_INCREMENT_PREFIX,
    TOKEN_DECREMENT_PREFIX,
    TOKEN_INCREMENT_POSTFIX,
    TOKEN_DECREMENT_POSTFIX,
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
    __LENGTH__,
}

export const TokenKindNames: Record<TokenKind, string> = Object.freeze({
    [TokenKind.TOKEN_DEFAULT]: StringIntern.add("default"),
    [TokenKind.TOKEN_INT]: StringIntern.add("int"),
    [TokenKind.TOKEN_BINARY]: StringIntern.add("binary"),
    [TokenKind.TOKEN_HEX]: StringIntern.add("hex"),
    [TokenKind.TOKEN_OCTAL]: StringIntern.add("octal"),
    [TokenKind.TOKEN_FLOAT]: StringIntern.add("float"),
    [TokenKind.TOKEN_EOF]: StringIntern.add("eof"),
    [TokenKind.TOKEN_LINE_TERMINATOR]: StringIntern.add("line_terminator"),
    [TokenKind.TOKEN_WHITESPACE]: StringIntern.add("whitespace"),
    [TokenKind.TOKEN_EQUAL]: StringIntern.add("equal"),
    [TokenKind.TOKEN_NOT_EQUAL]: StringIntern.add("not_equal"),
    [TokenKind.TOKEN_LESS]: StringIntern.add("less"),
    [TokenKind.TOKEN_LESS_EQUAL]: StringIntern.add("less_equal"),
    [TokenKind.TOKEN_MORE]: StringIntern.add("more"),
    [TokenKind.TOKEN_MORE_EQUAL]: StringIntern.add("more_equal"),
    [TokenKind.TOKEN_IDENTIFIER]: StringIntern.add("identifier"),
    [TokenKind.TOKEN_LAMBDA]: StringIntern.add("lambda"),
    [TokenKind.TOKEN_ADD_ASSIGN]: StringIntern.add("add_assign"),
    [TokenKind.TOKEN_SUB_ASSIGN]: StringIntern.add("sub_assign"),
    [TokenKind.TOKEN_MUL_ASSIGN]: StringIntern.add("mul_assign"),
    [TokenKind.TOKEN_DIV_ASSIGN]: StringIntern.add("div_assign"),
    [TokenKind.TOKEN_OR_ASSIGN]: StringIntern.add("or_assign"),
    [TokenKind.TOKEN_AND_ASSIGN]: StringIntern.add("and_assign"),
    [TokenKind.TOKEN_XOR_ASSIGN]: StringIntern.add("xor_assign"),
    [TokenKind.TOKEN_MOD_ASSIGN]: StringIntern.add("mod_assign"),
    [TokenKind.TOKEN_LSHIFT_ASSIGN]: StringIntern.add("lshift_assign"),
    [TokenKind.TOKEN_RSHIFT_ASSIGN]: StringIntern.add("rshift_assign"),
    [TokenKind.TOKEN_KEYWORD]: StringIntern.add("keyword"),
    [TokenKind.TOKEN_TYPE]: StringIntern.add("type"),
    [TokenKind.TOKEN_SEMI]: StringIntern.add("semi"),
    [TokenKind.TOKEN_COLON]: StringIntern.add("colon"),
    [TokenKind.TOKEN_INCREMENT_PREFIX]: StringIntern.add("increment_prefix"),
    [TokenKind.TOKEN_INCREMENT_POSTFIX]: StringIntern.add("increment_postfix"),
    [TokenKind.TOKEN_DECREMENT_PREFIX]: StringIntern.add("decrement_prefix"),
    [TokenKind.TOKEN_DECREMENT_POSTFIX]: StringIntern.add("decrement_postfix"),
    [TokenKind.TOKEN_PLUS]: StringIntern.add("plus"),
    [TokenKind.TOKEN_MINUS]: StringIntern.add("minus"),
    [TokenKind.TOKEN_MULTIPLY]: StringIntern.add("multiply"),
    [TokenKind.TOKEN_DIVIDE]: StringIntern.add("divide"),
    [TokenKind.TOKEN_OR]: StringIntern.add("or"),
    [TokenKind.TOKEN_AND]: StringIntern.add("and"),
    [TokenKind.TOKEN_XOR]: StringIntern.add("xor"),
    [TokenKind.TOKEN_MOD]: StringIntern.add("mod"),
    [TokenKind.TOKEN_LSHIFT]: StringIntern.add("lshift"),
    [TokenKind.TOKEN_RSHIFT]: StringIntern.add("rshift"),
    [TokenKind.TOKEN_ASSIGN]: StringIntern.add("assign"),
    [TokenKind.TOKEN_INLINE_COMMENT]: StringIntern.add("inline_comment"),
    [TokenKind.TOKEN_BLOCK_COMMENT]: StringIntern.add("block_comment"),
    [TokenKind.TOKEN_LPAREN]: StringIntern.add("left_paren"),
    [TokenKind.TOKEN_RPAREN]: StringIntern.add("right_paren"),
    [TokenKind.TOKEN_LBRACE]: StringIntern.add("left_brace"),
    [TokenKind.TOKEN_RBRACE]: StringIntern.add("right_brace"),
    [TokenKind.TOKEN_LBRACKET]: StringIntern.add("left_bracket"),
    [TokenKind.TOKEN_RBRACKET]: StringIntern.add("right_bracket"),
    [TokenKind.TOKEN_AND_AND]: StringIntern.add("and_and"),
    [TokenKind.TOKEN_OR_OR]: StringIntern.add("or_or"),

    [TokenKind.__LENGTH__]: StringIntern.add("__LENGTH__"),
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