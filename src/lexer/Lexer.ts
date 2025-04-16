import Token, {TokenKind} from "./Token";

export default class Lexer {
    public stream: string
    public position: number = 0;
    public nextPosition: number = 1;
    public token: Token;
    static interns: {[str: string]: String} = {};

    #int_reg: RegExp = /\d+/;
    #semi_reg: RegExp = /;+/;
    #colon_reg: RegExp = /:+/;
    #plus_reg: RegExp = /\++/;
    #minus_reg: RegExp = /-+/;
    #multiply_reg: RegExp = /\*+/;
    #divide_reg: RegExp = /\\+/;
    #assign_reg: RegExp = /=+/;

    constructor(stream: string) {
        this.stream = stream;
        this.position = 0;
        this.nextPosition = 1;
        this.token = this.next_token();
    }

    next_token(): Token {
        let literal: string = this.stream[this.position];
        let tokenKind: TokenKind = TokenKind.TOKEN_DEFAULT;

        if (this.#is_number()) {
            return new Token(TokenKind.TOKEN_INT, this.#read_number())
        } else if (this.#semi_reg.test(literal)) {
            tokenKind = TokenKind.TOKEN_SEMI;
        } else if (this.#colon_reg.test(literal)) {
            tokenKind = TokenKind.TOKEN_COLON;
        } else if (this.#plus_reg.test(literal)) {
            tokenKind = TokenKind.TOKEN_PLUS;
        } else if (this.#minus_reg.test(literal)) {
            tokenKind = TokenKind.TOKEN_MINUS;
        } else if (this.#multiply_reg.test(literal)) {
            tokenKind = TokenKind.TOKEN_MULTIPLY;
        } else if (this.#divide_reg.test(literal)) {
            tokenKind = TokenKind.TOKEN_DIVIDE;
        } else if (this.#assign_reg.test(literal)) {
            tokenKind = TokenKind.TOKEN_ASSIGN;
        } // ...

        this.#next_position();
        return new Token(tokenKind, literal)
    }

    #next_position() {
        this.position = this.nextPosition;
        this.nextPosition++;
    }

    #is_number(): boolean {
        return this.#int_reg.test(this.stream[this.position]);
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