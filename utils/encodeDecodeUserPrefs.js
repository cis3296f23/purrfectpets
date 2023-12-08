/**
 * object for mapping preference strings to an integer which is a power of 2
 */
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

/**
 * array for storing string of pet types
 */
const animalTypes = ['Dog', 'Cat', 'Rabbit', 'Small-Furry', 'Horse', 'Bird', 'Scales-Fins-Other', 'Barnyard'];
/**
 * array for storing other user preferences as strings for URL building
 */
const otherPrefs = ['&good_with_children=true', '&good_with_dogs=true', '&good_with_cats=true', '&house_trained=true', '&special_needs=true'];

/**
 * @function prefsToInt
 * function for encoding perference strings into an integer for storing in the database
 * uses userPrefsStrToInt object to map the strings to powers of 2
 * maps the elements from the string array to the powers of 2 and takes a sum to be the integer representation of the users preferences
 * resulting integer acts as a bit array with a 1 set whenever a preferrence is true
 * @param {Array} prefsStringArray array of strings to be parsed
 * @example
 * // returns 8191
 * prefsToInt(['Dog', 'Cat', 'Rabbit', 'Small-Furry', 'Horse', 'Bird', 'Scales-Fins-Other', 'Barnyard']);
 * @example
 * // returns 3
 * prefsToInt(['Dog', 'Cat']);
 * @returns {Number} Returns integer value of the user preferences.
 */
export const prefsToInt = (prefsStringArray) => {
    let sum = 0;
    prefsStringArray.forEach(element => {
        sum += userPrefsStrToInt[element]
    });
    return sum;
}

/**
 * @function getUserAnimalPrefsFromInt
 * function for decoding the integer representation of the user preferences to get their animal types
 * returns an array of the user's animal type preferences
 * filters the array of all animal types by performing a bit-wise AND with the user pref int, and 2**(index value of pet)
 * if that bit was set when the integer was encoded, it will return true and that animal will be added to the output array
 * @param {Number} prefsInt Integer representation of user prefs
 * @example
 * // returns  ['Dog', 'Cat', 'Rabbit', 'Small-Furry', 'Horse', 'Bird', 'Scales-Fins-Other', 'Barnyard']
 * getUserAnimalPrefsFromInt(8191);
 * @example
 * // returns ['Dog', 'Cat']
 * getUserAnimalPrefsFromInt(3);
 * @returns {Array} Returns array of user animal prefs from integer value.
 */
export const getUserAnimalPrefsFromInt = (prefsInt) => {
    return animalTypes.filter((curr, i, arr) => {return prefsInt & 2**i})
}

/**
 * @function makeUserPrefsURL
 * function for building the part of the request url for perfinder that includes the users other preferences
 * returns a string to the concatonated onto the rest of the request URL
 * does so following the same methodology as prefsToInt, but starts at an offset based on the length of the animalTypes array
 * each string that returns true from bit-wise AND will be concatonated onto the prefsUrl string
 * @param {Number} prefsInt Integer representation of user prefs
 * @example
 * // returns  &good_with_dogs=true&good_with_cats=true'
 * makeUserPrefsURL(1536);
 * @returns {String} Returns string with other user prefrences
 */
export const makeUserPrefsURL = (prefsInt) => {
    let prefsUrl = "";
    otherPrefs.forEach((curr, i, arr) => {if (prefsInt & 2**(animalTypes.length + i)) prefsUrl = prefsUrl.concat(curr)});
    return prefsUrl;
}

export default {prefsToInt, getUserAnimalPrefsFromInt, makeUserPrefsURL}