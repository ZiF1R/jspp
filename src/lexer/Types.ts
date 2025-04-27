import {TokenKind} from "./Token";
import StringIntern from "./StringIntern";

export default {
    [StringIntern.add("int")]: TokenKind.TOKEN_TYPE,
    [StringIntern.add("uint")]: TokenKind.TOKEN_TYPE,
    [StringIntern.add("float")]: TokenKind.TOKEN_TYPE,
    [StringIntern.add("ufloat")]: TokenKind.TOKEN_TYPE,
    [StringIntern.add("char")]: TokenKind.TOKEN_TYPE,
    [StringIntern.add("string")]: TokenKind.TOKEN_TYPE,
    [StringIntern.add("bool")]: TokenKind.TOKEN_TYPE,
    [StringIntern.add("void")]: TokenKind.TOKEN_TYPE,
} as Record<string, TokenKind>;