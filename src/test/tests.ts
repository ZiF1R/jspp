import Lexer from "../lexer/Lexer";
import Token, {TokenKind} from "../lexer/Token";
import lexerTests from "./lexer.test";

const fn_time = (fn: Function) => () => {
    let start = Date.now();
    fn();
    let end = Date.now();

    console.log(`Total time: ${end - start}ms`);
}

const lexer_tests = fn_time(() => {
    lexerTests.forEach((testCase, n) => {
        console.log(`--- Test ${n + 1} ---`);

        try {
            const lexer: Lexer = new Lexer(testCase.input);
            let i = 0;
            let nextToken: Token = new Token(TokenKind.TOKEN_DEFAULT, "");

            do {
                nextToken = lexer.next_token();
                let cmp = Lexer.token_cmp(nextToken, testCase.expect[i]);
                console.log(nextToken, cmp);

                if (!cmp) {
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
});

lexer_tests();