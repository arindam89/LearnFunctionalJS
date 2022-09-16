/* ================================== */

// Imperative Code
const openSite = (currentUser) => {
    if(currentUser) {
        return renderPage(currentUser);
    } else {
        return showLogin();
    }
}

// Functional Code
const openSiteF = (currentUser) => 
     fromNullable(currentUser)
        .fold(showLogin, renderPage);

/* ================================== */

// Imperative Code
const getPreferences = user => {
    if(user.premium) {
        return loadPreference(user.preferences)
    } else {
        return defaultPreferences;
    }
}

// Functional Code
const getPreferencesF = user => 
        (user.premium ? Right(user) : Left('not premium'))
            .map(u => u.preferences)
            .fold(() => defaultPreferences, pref => loadPreference(pref));

/* ================================== */

// Imperative Code
const streetName = user => {
    const address = user.address;
    
    if(address) {
        const street = address.street;

        if(steet) {
            return street.name;
        }
    }

    return 'no street';
}

// Functional Code
const streetNameF = user => 
        fromNullable(user.address)
            .chain(a => fromNullable(a.street))
            .fold(() => 'no street', s => s.name)

/* ================================== */

// Imperative Code
const concatUniq = (x, ys) => {
    const found = ys.filter(y => y === x)[0];
    return found ? ys : ys.concat(x);
}

// Functional Code
const concatUniqF = (x, ys) => 
    fromNullable(ys.filter(y => y===x)[0])
        .fold(() => ys.concat(x), y => ys)

/* ================================== */

// Imperative Code
const wrapExample = example => {
    if(example.previewPath) {
        try {
            example.preview = fs.readFileSync(example.previewPath);
        } catch (e) {}
    }
    return example;
}

// Functional Code
const wrapExampleF = x =>
    fromNullable(x.previewPath)
        .chain(() => tryCatch(() => fs.readFileSync(x.previewPath)))
        .fold(() => example, ex => Object.assign(x.preview, ex))

/* ================================== */
