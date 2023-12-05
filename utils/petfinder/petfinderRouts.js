import express from 'express';
import { getPets, fetchLikedPetDetails} from './Petfinder.js'

const router = express.Router();

router.get("/:page/:prefs", async (req, res) => {
    try {
        const pets = await getPets(req.params.page, req.params.prefs);
        res.send(pets)
    } catch (err) {
        res.status(500).send("Petfinder API error");
    }
});

router.get("/likedPets/:petIds", async (req, res) => {
    try {
        const petIds = req.params.petIds.split('-');
        const petDetails = await fetchLikedPetDetails(petIds);
        res.json(petDetails);
    } catch (err) {
        res.status(500).send("Petfinder API error")
    }
})

export default router;