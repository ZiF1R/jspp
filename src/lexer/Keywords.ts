import {TokenKind} from "./Token";
import StringIntern from "./StringIntern";

export default {
    [StringIntern.add("if")]: TokenKind.TOKEN_KEYWORD,
    [StringIntern.add("else")]: TokenKind.TOKEN_KEYWORD,
    [StringIntern.add("elif")]: TokenKind.TOKEN_KEYWORD,
    [StringIntern.add("while")]: TokenKind.TOKEN_KEYWORD,
    [StringIntern.add("return")]: TokenKind.TOKEN_KEYWORD,
    [StringIntern.add("export")]: TokenKind.TOKEN_KEYWORD,
    [StringIntern.add("import")]: TokenKind.TOKEN_KEYWORD,
    [StringIntern.add("class")]: TokenKind.TOKEN_KEYWORD,
    [StringIntern.add("static")]: TokenKind.TOKEN_KEYWORD,
    [StringIntern.add("public")]: TokenKind.TOKEN_KEYWORD,
    [StringIntern.add("private")]: TokenKind.TOKEN_KEYWORD,
    [StringIntern.add("delete")]: TokenKind.TOKEN_KEYWORD,
    [StringIntern.add("case")]: TokenKind.TOKEN_KEYWORD,
    [StringIntern.add("const")]: TokenKind.TOKEN_KEYWORD,
    [StringIntern.add("break")]: TokenKind.TOKEN_KEYWORD,
    [StringIntern.add("catch")]: TokenKind.TOKEN_KEYWORD,
    [StringIntern.add("do")]: TokenKind.TOKEN_KEYWORD,
    [StringIntern.add("false")]: TokenKind.TOKEN_KEYWORD,
    [StringIntern.add("true")]: TokenKind.TOKEN_KEYWORD,
    [StringIntern.add("for")]: TokenKind.TOKEN_KEYWORD,
    [StringIntern.add("default")]: TokenKind.TOKEN_KEYWORD,
} as Record<string, TokenKind>;

// break
// case
// catch
// class
// const
// continue
// debugger
// default
// delete
// do
// else
// export
// extends
// false
// finally
// for
// function
// if
// import
// in
// instanceof
// new
// null
// return
// super
// switch
// this
// throw
// true
// try
// typeof
// var
// void
// while
// with
