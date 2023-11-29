import dotenv from 'dotenv'
import { getUserAnimalPrefsFromInt, makeUserPrefsURL } from "../encodeDecodeUserPrefs.js"
dotenv.config();

let accessToken = '';
let userPrefs = 0;
let userAnimals = [];

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
    if (accessToken === '') {
        await getAccessToken()
    }
    if (!userPrefs) {
        userPrefs = prefs;
        userAnimals = getUserAnimalPrefsFromInt(userPrefs);
    }
    return fetch(`https://api.petfinder.com/v2/animals?type=${userAnimals[Math.floor(Math.random() * userAnimals.length)]}&page=${page}${makeUserPrefsURL(userPrefs)}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Request failed!');
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

export default getPets