/**
 * contains functions for communicating with the Petfinder API
 */

import dotenv from 'dotenv'
import { getUserAnimalPrefsFromInt, makeUserPrefsURL } from "../encodeDecodeUserPrefs.js"
dotenv.config();

let accessToken = '';
let userPrefs = -1;
let userAnimals = [];
let prefsURL = '';

/**
 * @function getAccessToken gets api access token from petfinder
 * sets global variable to the returned token and set timeout for the token expires to set the accessToken string back to ''
 */
async function getAccessToken() {
    const requestUrl = `https://api.petfinder.com/v2/oauth2/token`;
    const response = await fetch(requestUrl, {
        method: 'POST',
        body: `grant_type=client_credentials&client_id=${process.env.PETFINDER_API_KEY}&client_secret=${process.env.PETFINDER_API_SECRET}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
    const jsonResponse = await response.json();
    accessToken = jsonResponse.access_token;
    const expiresIn = jsonResponse.expires_in;
    setTimeout(() => accessToken = '', expiresIn);
}

/**
 * @function getPets
 * function for encoding perference strings into an integer for storing in the database
 * uses userPrefsStrToInt object to map the strings to powers of 2
 * maps the elements from the string array to the powers of 2 and takes a sum to be the integer representation of the users preferences
 * resulting integer acts as a bit array with a 1 set whenever a preferrence is true
 * @param {Number} page page to request pets from
 * @param {Number} prefs integer value of the user preferences
 * @returns {Array} an array of pets matching the user preferences
 */
export async function getPets(page = 1, prefs = 255) {
    // if we do not have an access token, get one
    if (!accessToken) {
        await getAccessToken()
    }
    // assign prefs default value of 255 if it is out of valid range
    if (prefs < 1 || prefs >= 8192) {
        prefs = 255;
    }
    // if first time checking prefs, or if user as changed their preferences since last call to petfinder, set variables to user prefs
    if (userPrefs != prefs) {
        userPrefs = prefs;
        userAnimals = getUserAnimalPrefsFromInt(userPrefs);
        prefsURL = makeUserPrefsURL(userPrefs);
    }
    const url = `https://api.petfinder.com/v2/animals?type=${userAnimals[Math.floor(Math.random() * userAnimals.length)]}&page=${page}${prefsURL}`
    console.log(url)
    // fetch a random type from the user's preferences conforming to the users other preferences
    return fetch(url, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    })
        .then(response => {
            if (!response.ok) {
                console.error('Error status:', response.status);
                console.error('Status text:', response.statusText);
                throw new Error('Request failed in getPets')
            }
            return response.json();
        })
        .then(data => {
            return data.animals;
        })
        .catch(error => {
            console.error('Error fetching: ', error);
            return [];
        });
}

/**
 * Fetches the details of liked pets from the Petfinder API.
 * @param {Array<string>} petIds - The IDs of the pets.
 * @async
 * @function fetchLikedPetDetails
 * @returns {Promise<Array<Object>>} An array of pet details.
 */
export const fetchLikedPetDetails = async (petIds) => {
    const petDetails = await Promise.all(petIds.map(async (petId) => {
        // if we do not have an access token, get one
        if (!accessToken) {
            await getAccessToken()
        }

        console.log(petId)
        const url = `https://api.petfinder.com/v2/animals/${petId}`;
        console.log(url); // Log the URL
        return fetch(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => {
                if(!response.ok) {
                    throw new Error('Request failed in fetchLikedPetDetails');
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error fetching: ', error);
            });
    }));
    return petDetails
}  