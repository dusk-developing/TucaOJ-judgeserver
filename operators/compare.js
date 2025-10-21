const { normalize } = require("../extra_modules/normalize");

function compareOutput(target, user) {
    let normTarget = normalize(target);
    let normUser = normalize(user);
    return normTarget === normUser;
}

function compareStrict(target, user) {
    return target === user;
}

//console.log(compareOutput("Hello\r\r\r\r\r\r\r\r\nWorld", "Hello\nWorld")); true
module.exports = { compareOutput, compareStrict };