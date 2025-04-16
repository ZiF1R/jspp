import Lexer from "../lexer/Lexer";
import Token from "../lexer/Token";

const tests = [
    {
        input: "1",
        expect: [],
    },
];

tests.forEach(testCase => {
    const lexer: Lexer = new Lexer(testCase.input);

    const nextToken: Token = lexer.next_token();
    console.log(nextToken.type, nextToken.literal);
});