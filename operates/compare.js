import { normalize } from "../custom_modules/normalize";

function readToken(str, begin) {
    let end = begin;
    while (end < str.length && !/\s/.test(str[end])) end++;
    const token = str.slice(begin, end);
    return { token, end };
}

function compareOutput(target, user) {
    let normTarget = normalize(target);
    let normUser = normalize(user);
    let tindex = 0, uindex = 0;
    const tlen = normTarget.length, ulen = normUser.length;
    while (tindex < tlen && uindex < ulen) {
        while (tindex < tlen && /\s/.test(normTarget[tindex])) tindex++;
        while (uindex < ulen && /\s/.test(normUser[uindex])) uindex++;
        if (tindex >= tlen && uindex >= ulen) return true;
        if (tindex >= tlen || uindex >= ulen) return false;
        let ttoken = readToken(normTarget, tindex);
        let utoken = readToken(normUser, uindex);
        if (ttoken.token !== utoken.token) return false;
        tindex = ttoken.end;
        uindex = utoken.end;
    }
    return true;
}

function compareStrict(target, user) {
    return target === user;
}

// console.log(compareOutput("Hello\r\r\r\r\r\r\r\r\n \n    World", "Hello\n   \rWorld")); // true
export default { compareOutput, compareStrict };