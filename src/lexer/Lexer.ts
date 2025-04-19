import Token, {TokenKind} from "./Token";

class LexerRegExpCtl {
    public reg_exp_kind: Record<TokenKind, RegExp> = {
        [TokenKind.TOKEN_DEFAULT]: /./,
        [TokenKind.TOKEN_INT]: /\d+/,
        [TokenKind.TOKEN_EOF]: /./,
        [TokenKind.TOKEN_NEW_LINE]: /\\n/,
        [TokenKind.TOKEN_KEYWORD]: /./,
        [TokenKind.TOKEN_SEMI]: /;/,
        [TokenKind.TOKEN_COLON]: /:/,
        [TokenKind.TOKEN_PLUS]: /\+/,
        [TokenKind.TOKEN_MINUS]: /-/,
        [TokenKind.TOKEN_MULTIPLY]: /\*/,
        [TokenKind.TOKEN_DIVIDE]: /\\+/,
        [TokenKind.TOKEN_ASSIGN]: /=/,
    }
}

export default class Lexer {
    public stream: string
    public position: number = 0;
    public nextPosition: number = 1;
    public token: Token;
    static interns: Record<string, String> = {};
    #regexpctl: LexerRegExpCtl = new LexerRegExpCtl();

    constructor(stream: string) {
        this.stream = stream;
        this.token = this.next_token();
    }

    next_token(): Token {
        // @ts-ignore
        let literal: string = this.stream[this.position];
        if (!literal) {
            return new Token(TokenKind.TOKEN_EOF, "");
        }

        if (this.#is_number()) {
            return new Token(TokenKind.TOKEN_INT, this.#read_number())
        }

        for (const [kind, regexp] of Object.entries(this.#regexpctl.reg_exp_kind)) {
            if (regexp.test(literal)) {
                this.#next_position();
                return new Token(kind as TokenKind, literal);
            }
        }

        this.#next_position();
        return new Token(TokenKind.TOKEN_DEFAULT, literal)
    }

    #next_position() {
        this.position = this.nextPosition;
        this.nextPosition++;
    }

    #is_number(): boolean {
        return this.#regexpctl.reg_exp_kind[TokenKind.TOKEN_INT].test(
            // @ts-ignore
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

    #str_intern(str: string): String {
        if (str in Lexer.interns) {
            return Lexer.interns[str] as String;
        } else {
            let newIntern = new String(str) as String;
            Lexer.interns[str] = newIntern;
            return newIntern;
        }
    }
}