import Token, {TokenKind} from "./Token";
import Keywords from "./Keywords";
import Types from "./Types";

class LexerRegExpCtl {
    public reg_exp_kind: Record<TokenKind, RegExp> = {
        [TokenKind.TOKEN_LAMBDA]: /^=>/,
        [TokenKind.TOKEN_INT]: /^\d+/,
        [TokenKind.TOKEN_IDENTIFIER]: /^[a-zA-Z_]+/,
        [TokenKind.TOKEN_EQUAL]: /^~/,
        [TokenKind.TOKEN_ASSIGN]: /^=/,
        [TokenKind.TOKEN_PLUS]: /^\+/,
        [TokenKind.TOKEN_MINUS]: /^-/,
        [TokenKind.TOKEN_MULTIPLY]: /^\*/,
        [TokenKind.TOKEN_DIVIDE]: /^\//,
        [TokenKind.TOKEN_SEMI]: /^;/,
        [TokenKind.TOKEN_COLON]: /^:/,
        [TokenKind.TOKEN_WHITESPACE]: /^[\s\n\t\r]+/,

        // plug
        [TokenKind.TOKEN_KEYWORD]: /.^/,
        [TokenKind.TOKEN_TYPE]: /.^/,
        [TokenKind.TOKEN_DEFAULT]: /.^/,
        [TokenKind.TOKEN_EOF]: /.^/,
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
        if (this.position >= this.stream.length) {
            return new Token(TokenKind.TOKEN_EOF, "");
        }

        const remaining = this.stream.slice(this.position);

        for (const [kind, regexp] of Object.entries(this.#regexpctl.reg_exp_kind)) {
            let match = remaining.match(regexp);

            if(!match) {
                continue;
            }

            let literal = match[0];
            this.#next_position(literal.length);

            switch (kind) {
                case (TokenKind.TOKEN_WHITESPACE):
                    return this.next_token();

                case (TokenKind.TOKEN_IDENTIFIER):
                    if (literal in Types) {
                        return new Token(TokenKind.TOKEN_TYPE, literal);
                    } else if (literal in Keywords) {
                        return new Token(TokenKind.TOKEN_KEYWORD, literal);
                    }
                    return new Token(kind as TokenKind, literal);

                default:
                    return new Token(kind as TokenKind, literal);
            }

        }

        let literal = this.stream[this.position];
        this.#next_position();

        return new Token(TokenKind.TOKEN_DEFAULT, literal);
    }

    #next_position(n: number = 1) {
        this.position += n;
        this.nextPosition = this.position + 1;
    }


    // Deprecated methods
    //
    // #is_token_kind_type(token_kind: TokenKind): boolean {
    //     if (!this.stream[this.position]) {
    //         return false;
    //     }
    //     return this.#regexpctl.reg_exp_kind[token_kind].test(
    //         this.stream[this.position]
    //     );
    // }
    //
    // #read_token_sequence(token_kind: TokenKind): string {
    //     let start = this.position;
    //
    //     while (this.#is_token_kind_type(token_kind)) {
    //         this.#next_position();
    //     }
    //
    //     return this.stream.substring(start, this.position)
    // }
    //
    // #look_forward(): string | null {
    //     if (this.nextPosition >= this.stream.length) {
    //         return null;
    //     }
    //
    //     return this.stream[this.nextPosition];
    // }
    //
    // #skip_whitespace(): void {
    //     while(this.#is_token_kind_type(TokenKind.TOKEN_WHITESPACE)) {
    //         this.#next_position();
    //     }
    // }

    #str_intern(str: string): string {
        if (str in Lexer.interns) {
            return Lexer.interns[str];
        } else {
            Lexer.interns[str] = str;
            return str;
        }
    }

    static token_cmp(t1: Token, t2: Token): boolean {
        return t1.literal === t2.literal && t1.type === t2.type;
    }
}