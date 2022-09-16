const util = require('util');
// Here is a regular function with many assignments.

function emojiFromString(str) {
    str = str.trim();
    codePoint = parseInt(str, 16);
    codePoint = codePoint + 1;
    return String.fromCodePoint(codePoint);

}

console.log(emojiFromString(" 1F603 "));

// Remove assignments.

function emojiFromString(str) {
    return String.fromCodePoint(parseInt(str.trim(), 16)+1);
}

console.log(emojiFromString(" 1F603 "));

// Convert str to array and map over it.
// Then create the box 

const Box = x => ({
    map: f => Box(f(x)),
    fold: f => f(x),
    [util.inspect.custom]: () => `Box(${x})`
})

function newEmojiFromString(str) {
    return Box(str)
            .map(s => s.trim())
            .map(n => parseInt(n, 16))
            .map(t => t+1)
            .fold(c => String.fromCodePoint(c))
    }

console.log(newEmojiFromString(" 1F603 "));