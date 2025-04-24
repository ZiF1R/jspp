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
    console.log("--- Lexer ---");
    let errors: boolean = false;

    lexerTests.forEach((testCase, n) => {
        try {
            const lexer: Lexer = new Lexer(testCase.input);
            let i = 0;
            let nextToken: Token = new Token(TokenKind.TOKEN_DEFAULT, "");

            do {
                nextToken = lexer.next_token();
                let cmp = Lexer.token_cmp(nextToken, testCase.expect[i]);

                if (!cmp) {
                    console.log(`\n--- Test ${n + 1} ---`)
                    console.log('failed: ', nextToken, testCase.expect[i]);
                    throw new Error();
                } else {
                    // console.log('success: ', nextToken.humanize_type());
                }

                i++;
            } while (nextToken.type !== TokenKind.TOKEN_EOF);
        } catch (e) {
            errors = true;
            return console.log('\x1b[31m%s\x1b[0m', `test failed\n`);
        }

        // console.log('\x1b[32m%s\x1b[0m', `test passed\n`);
    });

    if (!errors) {
        console.log('\x1b[32m%s\x1b[0m', `test passed\n`);
    }
});

lexer_tests();