import dotenv from 'dotenv'
import { getUserAnimalPrefsFromInt, makeUserPrefsURL } from "../encodeDecodeUserPrefs.js"
dotenv.config();

let accessToken = '';
let userPrefs = -1;
let userAnimals = [];
let prefsURL = '';

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
    // fetch a random type from the user's preferences conforming to the users other preferences
    return fetch(`https://api.petfinder.com/v2/animals?type=${userAnimals[Math.floor(Math.random() * userAnimals.length)]}&page=${page}${prefsURL}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Request failed')
            }
            return response.json();
        })
        .then(data => {
            return data.animals;
        })
        .catch(error => {
            console.error('Error fetching pets: ', error);
            return [];
        });
}
//fetch the users liked pets
export async function fetchLikedPetDetails(petIds){
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
                    throw new Error('Request failed!');
                }
                return response.json();
            })
    }));

    return petDetails
}  
export { getPets, fetchLikedPetDetails };