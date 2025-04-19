import Lexer from "../lexer/Lexer";
import Token, {TokenKind} from "../lexer/Token";
import lexerTests from "./lexer.test";

lexerTests.forEach((testCase, n) => {
    console.log(`--- Test ${n + 1} ---`);

    try {
        const lexer: Lexer = new Lexer(testCase.input);
        let i = 0;
        let nextToken: Token = new Token(TokenKind.TOKEN_DEFAULT, "");

        do {
            nextToken = lexer.next_token();
            console.log(
                nextToken.type,
                nextToken.literal,
                Lexer.token_cmp(nextToken, testCase.expect[i]),
            );

            if (!Lexer.token_cmp(nextToken, testCase.expect[i])) {
                throw new Error();
            }

            i++;
        } while (nextToken.type !== TokenKind.TOKEN_EOF);
    } catch (e) {
        console.log(`test failed`);
        return;
    }

    console.log(`test passed\n\n`)
});