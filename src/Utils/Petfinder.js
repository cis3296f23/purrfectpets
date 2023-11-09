const apiKey = import.meta.env.VITE_API_KEY;
const apiSecret = import.meta.env.VITE_API_SECRET;

let accessToken;

export const Petfinder = {
    async getAccessToken() {
        const requestUrl = `https://api.petfinder.com/v2/oauth2/token`;
        const response = await fetch(requestUrl, {
            method: 'POST',
            body: `grant_type=client_credentials&client_id=${apiKey}&client_secret=${apiSecret}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        const jsonResponse = await response.json();
        accessToken = jsonResponse.access_token;
        const expiresIn = jsonResponse.expires_in;
        window.setTimeout(() => accessToken = '', expiresIn);
    },
    async getPets() {
        await Petfinder.getAccessToken()
        console.log(accessToken)
        const requestUrl = 'https://api.petfinder.com/v2/types';
        const headers = {
            Authorization: `Bearer ${accessToken}`
        };
        const response = await fetch(requestUrl, {
            headers: headers
        });
        const jsonResponse = await response.json();
        console.log(jsonResponse)
        return jsonResponse.animals;
    }
};

export default Petfinder