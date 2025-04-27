import Token, {TokenKind} from "./Token";
import Keywords from "./Keywords";
import Types from "./Types";
import StringIntern from "./StringIntern";

const TOKEN_REGEX: Record<TokenKind, RegExp> = Object.freeze({
    [TokenKind.TOKEN_BINARY]: /^0b[01]+(?:\b|$)/,
    [TokenKind.TOKEN_HEX]: /^0h[0-9A-Fa-f]+(?:\b|$)/,
    [TokenKind.TOKEN_OCTAL]: /^0o[0-7]+(?:\b|$)/,
    [TokenKind.TOKEN_FLOAT]: /^[\-+]?\d+\.\d+(?:\b|$)/,
    [TokenKind.TOKEN_INT]: /^[\-+]?\d+(?:\b|$)/,
    [TokenKind.TOKEN_INCREMENT_PREFIX]: /^\+\+(?=[a-zA-Z_]\w*)/,
    [TokenKind.TOKEN_DECREMENT_PREFIX]: /^--(?=[a-zA-Z_]\w*)/,
    [TokenKind.TOKEN_INCREMENT_POSTFIX]: /^\+\+/,
    [TokenKind.TOKEN_DECREMENT_POSTFIX]: /^--/,
    [TokenKind.TOKEN_IDENTIFIER]: /^[a-zA-Z_]\w*(?=\b|$)/,
    [TokenKind.TOKEN_LAMBDA]: /^=>/,
    [TokenKind.TOKEN_ADD_ASSIGN]: /^\+=/,
    [TokenKind.TOKEN_SUB_ASSIGN]: /^-=/,
    [TokenKind.TOKEN_MUL_ASSIGN]: /^\*=/,
    [TokenKind.TOKEN_DIV_ASSIGN]: /^\/=/,
    [TokenKind.TOKEN_OR_ASSIGN]: /^\|=/,
    [TokenKind.TOKEN_AND_ASSIGN]: /^&=/,
    [TokenKind.TOKEN_XOR_ASSIGN]: /^\^=/,
    [TokenKind.TOKEN_MOD_ASSIGN]: /^%=/,
    [TokenKind.TOKEN_LSHIFT_ASSIGN]: /^<<=/,
    [TokenKind.TOKEN_RSHIFT_ASSIGN]: /^>>=/,
    [TokenKind.TOKEN_EQUAL]: /^==/,
    [TokenKind.TOKEN_NOT_EQUAL]: /^<>/,
    [TokenKind.TOKEN_LESS]: /^</,
    [TokenKind.TOKEN_LESS_EQUAL]: /^</,
    [TokenKind.TOKEN_MORE]: /^>/,
    [TokenKind.TOKEN_MORE_EQUAL]: /^>=/,
    [TokenKind.TOKEN_ASSIGN]: /^=(?=[^=])/,
    [TokenKind.TOKEN_PLUS]: /^\+/,
    [TokenKind.TOKEN_MINUS]: /^-/,
    [TokenKind.TOKEN_MULTIPLY]: /^\*/,
    [TokenKind.TOKEN_DIVIDE]: /^\//,
    [TokenKind.TOKEN_OR]: /^\|/,
    [TokenKind.TOKEN_AND]: /^&/,
    [TokenKind.TOKEN_XOR]: /^\^/,
    [TokenKind.TOKEN_MOD]: /^%/,
    [TokenKind.TOKEN_LSHIFT]: /^<</,
    [TokenKind.TOKEN_RSHIFT]: /^>>/,
    [TokenKind.TOKEN_SEMI]: /^;/,
    [TokenKind.TOKEN_COLON]: /^:/,
    [TokenKind.TOKEN_LINE_TERMINATOR]: /^[\n\r]+/,
    [TokenKind.TOKEN_WHITESPACE]: /^[\s\t]+/,
    [TokenKind.TOKEN_INLINE_COMMENT]: /^#[^-].*/,
    [TokenKind.TOKEN_BLOCK_COMMENT]: /^#-.*-#/ms,
    [TokenKind.TOKEN_LPAREN]: /^\(/,
    [TokenKind.TOKEN_RPAREN]: /^\)/,
    [TokenKind.TOKEN_LBRACE]: /^\{/,
    [TokenKind.TOKEN_RBRACE]: /^}/,
    [TokenKind.TOKEN_LBRACKET]: /^\[/,
    [TokenKind.TOKEN_RBRACKET]: /^]/,
    [TokenKind.TOKEN_AND_AND]: /^&&(?=\s|$|\b)/,
    [TokenKind.TOKEN_OR_OR]: /^\|\|(?=\s|$|\b)/,

    // plug
    [TokenKind.TOKEN_KEYWORD]: /.^/,
    [TokenKind.TOKEN_TYPE]: /.^/,
    [TokenKind.TOKEN_DEFAULT]: /.^/,
    [TokenKind.TOKEN_EOF]: /.^/,
    [TokenKind.__LENGTH__]: /.^/,
});

export default class Lexer {
    public stream: string
    public position: number = 0;
    public nextPosition: number = 1;
    private tokens: Token[] = [];

    constructor(stream: string) {
        this.stream = stream;
    }

    public next_token(): Token {
        if (this.position >= this.stream.length) {
            return new Token(TokenKind.TOKEN_EOF, "", this.stream.length, this.stream.length);
        }

        const remaining = this.stream.slice(this.position);

        for (const [kind, regexp] of Object.entries(TOKEN_REGEX)) {
            let match = remaining.match(regexp);
            let kindNum = Number(kind);

            if(!match) {
                continue;
            }

            let literal = StringIntern.add(match[0]);
            let startPos = this.position;
            this.next_position(literal.length);
            switch (kindNum) {
                case (TokenKind.TOKEN_WHITESPACE):
                    return this.next_token();

                case (TokenKind.TOKEN_IDENTIFIER):
                    if (literal in Types) {
                        return new Token(TokenKind.TOKEN_TYPE, literal, startPos, this.position);
                    } else if (literal in Keywords) {
                        return new Token(TokenKind.TOKEN_KEYWORD, literal, startPos, this.position);
                    }
                    return new Token(kindNum as TokenKind, literal, startPos, this.position);

                default:
                    return new Token(kindNum as TokenKind, literal, startPos, this.position);
            }
        }

        let literal = StringIntern.add(this.stream[this.position]);
        let startPos = this.position;
        this.next_position();

        return new Token(TokenKind.TOKEN_DEFAULT, literal, startPos, this.position);
    }

    private next_position(n: number = 1): void {
        this.position += n;
        this.nextPosition = this.position + 1;
    }

    public processAll(): Token[] {
        let nextToken: Token = new Token(TokenKind.TOKEN_DEFAULT, "");

        do {
            nextToken = this.next_token();
            this.tokens.push(nextToken);
        } while (nextToken.type !== TokenKind.TOKEN_EOF);

        return this.tokens;
    }
}