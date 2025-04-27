export type TTest<T> = {
    input: string;
    expect: T[];
}

export interface ICTest<T = any> {
    readonly name: string;
    readonly tests: TTest<T>[];
    processAll(): boolean;
}

export function fn_time<T>(fn: () => T): () => T {
    return function(): T {
        let start = Date.now();
        const result: T = fn();
        let end = Date.now();

        console.log(`\nTotal time: ${end - start}ms`);

        return result;
    }
}

export default class CTest {
    private readonly tests: ICTest[] = [];

    constructor(tests: ICTest[] = []) {
        this.tests = tests;
    }

    processAll(): boolean {
        let errors = false;
        for (const test of this.tests) {
            console.log(`--- ${test.name} ---`);
            const initTests = fn_time<boolean>(test.processAll.bind(test));
            const withErrors: boolean = initTests();

            if (withErrors) {
                errors = true;
                console.log('\x1b[31m%s\x1b[0m', `Test failed`);
            } else {
                console.log('\x1b[32m%s\x1b[0m', `Test passed`);
            }

            console.log("\n".padStart(test.name.length + 9, "-"));
        }

        return errors;
    }
}