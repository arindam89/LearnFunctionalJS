// Try/Catch in a functional way.

// Existing Funciton.
const util = require('util');
const fs = require('fs');

/* ----------------------------------------------- */

// Either = Right | Left
// Right is equivalent to Box()
const Right = x => ({
    map: f => Right(f(x)),
    // Later
    chain: f => f(x),
    fold: (f,g) => g(x),
    [util.inspect.custom]: () => `Right(${x})`
});

//console.log(Right(2).map(x => x+2).fold(x => x/3));

const Left = x => ({
    map: f => Left(x),
    // Later
    chain: f => Left(x),
    fold: (f,g) => f(x),
    [util.inspect.custom]: () => `Left(${x})`
});

//console.log(Left(2).map(x => x+2).fold(x => x/3));

/* ----------------------------------------------- */

// Existing Imperative Code.
const DEFAULT_PORT = 3000;

function getAppPort(app) {
    try {
        const file = fs.readFileSync('done/data.json');
        const content = JSON.parse(file);
        const port = content[app];
        return port ? port : DEFAULT_PORT;
    } catch(e) {
        console.log(e);
        return DEFAULT_PORT
    }
}

//console.log(getAppPort("web-dashboard"));


// Fist lets introduce tryCatch

const tryCatch = f => {
    try {
        return Right(f());
    } catch(e) {
        return Left(e) 
    }
}

const fromNullable = x =>
    x != null ? Right(x) : Left(null)

const newAppPort = (app) => {
    return tryCatch(() => fs.readFileSync("done/data.json"))
        .map(c => JSON.parse(c))
        .chain(config => fromNullable(config[app]))
        .fold(e => DEFAULT_PORT,
             c => c)
}

const newAppPortParse = (app) => {
    return tryCatch(() => fs.readFileSync("done/data.json"))
        .chain(c => tryCatch(() => JSON.parse(c)))
        .chain(config => fromNullable(config[app]))
        .fold(e => DEFAULT_PORT,
             c => c)
}

console.log(newAppPortParse("web-dashboard"));
