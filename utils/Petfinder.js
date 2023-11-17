import dotenv from 'dotenv'
dotenv.config();

let accessToken = '';

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
    async getPets(page=1) {
        if (accessToken === '') {
            await Petfinder.getAccessToken()
        }
        const requestURL = `https://api.petfinder.com/v2/animals?page=${page}`;
        return fetch(requestURL, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        })
        .then(response => {
            if(!response.ok) {
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