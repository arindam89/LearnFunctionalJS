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

// Learn: Either = Right | Left