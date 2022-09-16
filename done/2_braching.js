// Code Example first.

function findRecord(username) {
    const record = {
        "arpaul": "Arindam Paul",
        "cena": "John Cena",
        "bob": "Bob the Builder",
    }
    return record[username]
}

function doGreet(username) {
    const name = findRecord(username);
    if(name) {
        return `Hello, ${name}, welcome to U4B`.toLocaleUpperCase();
    } else {
        return `record not found`;
    }
}

// console.log(doGreet("bob"));
// console.log(doGreet("bob1"));

// Either = Right | Left
// Right is equivalent to Box()
const util = require('util');
const Right = x => ({
    map: f => Right(f(x)),
    fold: (f,g) => g(x),
    [util.inspect.custom]: () => `Right(${x})`
});

//console.log(Right(2).map(x => x+2).fold(x => x/3));

const Left = x => ({
    map: f => Left(x),
    fold: (f,g) => f(x),
    [util.inspect.custom]: () => `Left(${x})`
});

//console.log(Left(2).map(x => x+2).fold(x => x/3));

function newFind(username) {
    const record = {
        "arpaul": "Arindam Paul",
        "cena": "John Cena",
        "bob": "Bob the Builder",
    }
    return record[username] ? Right(record[username]) : Left(null);
}

const newGreet = (user) => {
    return newFind(user)
                .map(u => `Hello, ${u}, welcome to U4B`)
                .fold(() => "record not found", s => s.toUpperCase());
}

console.log(newGreet("bobarindam"));