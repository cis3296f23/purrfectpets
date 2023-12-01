// object for mapping preference strings to an integer which is a power of 2
const userPrefsStrToInt = {
    "Dog": 1, // 2**0
    "Cat": 2, // 2**1
    "Rabbit": 4, // 2**2
    "Small & Furry": 8, // 2**3
    "Horse": 16, // 2**4
    "Bird": 32, // 2**5
    "Scales, Fins & Other": 64, // 2**6
    "Barnyard": 128, // 2**7
    "good_with_children": 256, // 2**8
    "good_with_dogs": 512, // 2**9
    "good_with_cats": 1024, // 2**10
    "house_trained": 2048, // 2**11
    "special_needs": 4096, // 2**12
}

const animalTypes = ['Dog', 'Cat', 'Rabbit', 'Small-Furry', 'Horse', 'Bird', 'Scales-Fins-Other', 'Barnyard'];
const otherPrefs = ['&good_with_children=true', '&good_with_dogs=true', '&good_with_cats=true', '&house_trained=true', '&special_needs=true'];

// function for encoding perference strings into an integer for storing in the database
// uses userPrefsStrToInt object to map the strings to powers of 2
// maps the elements from the string array to the powers of 2 and takes a sum to be the integer representation of the users preferences
// resulting integer acts as a bit array with a 1 set whenever a preferrence is true
export const prefsToInt = (prefsStringArray) => {
    let sum = 0;
    prefsStringArray.forEach(element => {
        sum += userPrefsStrToInt[element]
    });
    return sum;
}

// function for decoding the integer representation of the user preferences to get their animal tupes
// returns an array of the user's animal type preferences
// filters the array of all animal types by performing a bit-wise AND with the user pref int, and 2**(index value of pet)
// if that bit was set when the integer was encoded, it will return true and that animal will be added to the output array
export const getUserAnimalPrefsFromInt = (prefsInt) => {
    return animalTypes.filter((curr, i, arr) => {return prefsInt & 2**i})
}

// function for building the part of the request url for perfinder that includes the users other preferences
// returns a string to the concatonated onto the rest of the request URL
// does so following the same methodology as prefsToInt, but starts at an offset based on the length of the animalTypes array
// each string that returns true from bit-wise AND will be concatonated onto the prefsUrl string
export const makeUserPrefsURL = (prefsInt) => {
    let prefsUrl = "";
    otherPrefs.forEach((curr, i, arr) => {if (prefsInt & 2**(animalTypes.length + i)) prefsUrl = prefsUrl.concat(curr)});
    return prefsUrl;
}

export default {prefsToInt, getUserAnimalPrefsFromInt, makeUserPrefsURL}
