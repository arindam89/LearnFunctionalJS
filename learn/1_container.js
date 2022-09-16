// Here is a regular function with many assignments.

function emojiFromString(str) {
    str = str.trim();
    codePoint = parseInt(str, 16);
    codePoint = codePoint + 1;
    return String.fromCodePoint(codePoint);

}

console.log(emojiFromString(" 1F603 "));