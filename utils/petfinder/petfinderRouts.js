/**
 * Router for sending front end Petfinder requests to the back end
 */

import express from 'express';
import { getPets, fetchLikedPetDetails} from './Petfinder.js'

const router = express.Router();
/**
 * Route for getting pets to show to user.
 * @param {string} req - Request object containing the page to search and the user's preferences as an integer.
 * @param {Array} res - Response object containing pets to display to user
 * @returns {Object} 200 - An array of pet details
 * @returns {Error}  500 - Petfinder API error
 */
router.get("/preferences/:page/:prefs", async (req, res) => {
    try {
        const pets = await getPets(req.params.page, req.params.prefs);
        res.send(pets)
    } catch (err) {
        res.status(500).send("Petfinder API error");
    }
});
/**
 * Route serving pet details based on pet IDs.
 * @param {string} req.params.petIds - The IDs of the pets, separated by '-'.
 * @param {Array} res - Response object containing Array of liked pets or error
 * @returns {Object} 200 - An array of pet details
 * @returns {Error}  500 - Petfinder API error
 */
router.get("/liked/:petIds", async (req, res) => {
    try {
        const petIds = req.params.petIds.split('-');
        console.log(petIds)
        const petDetails = await fetchLikedPetDetails(petIds);
        res.json(petDetails);
    } catch (err) {
        res.status(500).send("Petfinder API error")
    }
})

export default router;