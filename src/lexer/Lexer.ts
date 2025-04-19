import Token, {TokenKind} from "./Token";

class LexerRegExpCtl {
    public reg_exp_kind: Record<TokenKind, RegExp> = {
        [TokenKind.TOKEN_INT]: /\d+/,
        [TokenKind.TOKEN_SEMI]: /;/,
        [TokenKind.TOKEN_COLON]: /:/,
        [TokenKind.TOKEN_PLUS]: /\+/,
        [TokenKind.TOKEN_MINUS]: /-/,
        [TokenKind.TOKEN_MULTIPLY]: /\*/,
        [TokenKind.TOKEN_DIVIDE]: /\\+/,
        [TokenKind.TOKEN_ASSIGN]: /=/,
        [TokenKind.TOKEN_WHITESPACE]: /[\s\n\t\r]/,
        [TokenKind.TOKEN_DEFAULT]: /./,
        [TokenKind.TOKEN_KEYWORD]: /./,
        [TokenKind.TOKEN_EOF]: /./,
    }
}

export default class Lexer {
    public stream: string
    public position: number = 0;
    public nextPosition: number = 1;
    static interns: Record<string, string> = {};
    #regexpctl: LexerRegExpCtl = new LexerRegExpCtl();

    constructor(stream: string) {
        this.stream = stream;
    }

    next_token(): Token {
        this.#skip_whitespace();

        let literal: string = this.stream[this.position];
        if (!literal) {
            return new Token(TokenKind.TOKEN_EOF, "");
        }

        if (this.#is_number()) {
            return new Token(TokenKind.TOKEN_INT, this.#read_number());
        }

        for (const [kind, regexp] of Object.entries(this.#regexpctl.reg_exp_kind)) {
            if (regexp.test(literal)) {
                this.#next_position();
                return new Token(kind as TokenKind, literal);
            }
        }

        this.#next_position();
        return new Token(TokenKind.TOKEN_DEFAULT, literal);
    }

    #next_position() {
        this.position = this.nextPosition;
        this.nextPosition++;
    }

    #is_number(): boolean {
        return this.#regexpctl.reg_exp_kind[TokenKind.TOKEN_INT].test(
            this.stream[this.position]
        );
    }

    #read_number() {
        let start = this.position;

        while (this.#is_number()) {
            this.#next_position();
        }

        return this.stream.substring(start, this.position)
    }

    #skip_whitespace(): void {
        while(
            this.#regexpctl.reg_exp_kind[TokenKind.TOKEN_WHITESPACE]
                .test(this.stream[this.position])
        ) {
            this.#next_position();
        }
    }

    #str_intern(str: string): string {
        if (str in Lexer.interns) {
            return Lexer.interns[str];
        } else {
            Lexer.interns[str] = str;
            return str;
        }
    }

    static token_cmp(token1: Token, token2: Token): boolean {
        return token1.literal === token2.literal && token1.type === token2.type;
    }
}