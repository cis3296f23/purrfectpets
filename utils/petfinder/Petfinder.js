import dotenv from 'dotenv'
dotenv.config();

let accessToken = '';
const animalTypes = ['Dog', 'Cat', 'Rabbit', 'Small-Furry', 'Horse', 'Bird', 'Scales-Fins-Other', 'Barnyard'];
const otherPrefs = ['&good_with_children=true', '&good_with_dogs=true', '&good_with_cats=true', '&house_trained=true', '&special_needs=true'];

export const Petfinder = {
    async getAccessToken() {
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
    },
    async getPets(page = 1, prefs = 255) {
        if (accessToken === '') {
            await this.getAccessToken()
        }
        const userAnimals = animalTypes.filter((curr, i, arr) => {return prefs & 2**i})
        let randType = userAnimals[Math.floor(Math.random()*userAnimals.length)];
        let prefsUrl = "";
        otherPrefs.forEach((curr, i, arr) => {if (prefs & 2**(animalTypes.length + i)) prefsUrl = prefsUrl.concat(curr)})
        const requestURL = `https://api.petfinder.com/v2/animals?type=${randType}&page=${page}${prefsUrl}`;
        return fetch(requestURL, {
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
}

export default Petfinder