import CTest from "./Test";
import tests from "./tests";

const __test__ = new CTest(tests);
__test__.processAll();