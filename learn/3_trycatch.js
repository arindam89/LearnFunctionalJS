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
    // chain: f => f(x),
    fold: (f,g) => g(x),
    [util.inspect.custom]: () => `Right(${x})`
});

//console.log(Right(2).map(x => x+2).fold(x => x/3));

const Left = x => ({
    map: f => Left(x),
    // Later
    // chain: f => Left(x),
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

console.log(getAppPort("web-dashboard"));