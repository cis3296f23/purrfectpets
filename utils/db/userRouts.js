import express from 'express';
import { config } from './config.js';
import Database from './database.js';

const router = express.Router();
router.use(express.json());

// Create database object
const database = new Database(config);

//** GET routs **\\

router.get('/', async (_, res) => {
  try {
    // Return a list of users
    const users = await database.readAll();
    console.log(`users: ${JSON.stringify(users)}`);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

router.get('/id/:id', async (req, res) => {
  try {
    // Get the user with the specified ID
    const userId = req.params.id;
    console.log(`userId: ${userId}`);
    if (userId) {
      const result = await database.readById(userId);
      console.log(`users: ${JSON.stringify(result)}`);
      res.status(200).json(result);
    } else {
      res.status(404);
    }
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

router.get('/id/:username', async (req, res) => {
  try {
    // Get the id with the specified username
    const username = req.params.username;
    console.log(`username: ${username}`);
    if (username) {
      const result = await database.readIdByUsername(username);
      console.log(`user_id: ${JSON.stringify(result)}`);
      res.status(200).json(result);
    } else {
      res.status(404);
    }
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

router.get('/username/:email', async (req, res) => {
  try {
    // Get the username with the specified email
    const email = req.params.email;
    console.log(`email: ${email}`);
    if (email) {
      const result = await database.getUsernameByEmail(email);
      console.log(`username: ${JSON.stringify(result)}`);
      res.status(200).json(result);
    } else {
      res.status(404);
    }
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

router.get('/checkusername/:username', async (req, res) => {
  try {
    // check if username is already used
    const username = req.params.username;
    console.log(`username: ${username}`);
    if (username) {
      const result = await database.checkUsernameAvailability(username);
      console.log(`usernameCheck: ${JSON.stringify(result)}`);
      res.status(200).json(result);
    } else {
      res.status(404);
    }
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

router.get('/checkemail/:email', async (req, res) => {
  try {
    // check if email is already used
    const email = req.params.email;
    console.log(`email: ${email}`);
    if (email) {
      const result = await database.checkEmailAvailability(email);
      console.log(`emailCheck: ${JSON.stringify(result)}`);
      res.status(200).json(result);
    } else {
      res.status(404);
    }
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

router.get('/salt/:email', async (req, res) => {
  try {
    // Get the user with the specified email
    const email = req.params.email;
    console.log(`email: ${email}`);
    if (email) {
      const result = await database.getSalt(email);
      console.log(`salt: ${JSON.stringify(result)}`);
      res.status(200).json(result);
    } else {
      res.status(404);
    }
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

router.get('/login/:hashedPass/:email', async (req, res) => {
  try {
    // Get the user with the specified email
    const hashedPass = req.params.hashedPass;
    const email = req.params.email;
    console.log(`hashedPass: ${hashedPass}`);
    console.log(`email: ${email}`);
    if (hashedPass && email) {
      const result = await database.checkHashedPass(hashedPass, email);
      console.log(`pw_check: ${JSON.stringify(result)}`);
      res.status(200).json(result);
    } else {
      res.status(404);
    }
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

//** POST routs **\\

router.post('/', async (req, res) => {
  try {
    // Create a user
    const user = req.body;
    console.log(`user: ${JSON.stringify(user)}`);
    const rowsAffected = await database.create(user);
    res.status(201).json({ rowsAffected });
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

//** PUT routs **\\

router.post('/', async (req, res) => {
  try {
    // Create a user
    const user = req.body;
    console.log(`user: ${JSON.stringify(user)}`);
    const rowsAffected = await database.create(user);
    res.status(201).json({ rowsAffected });
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

//** PUT routs **\\

router.post('/', async (req, res) => {
  try {
    // Create a user
    const user = req.body;
    console.log(`user: ${JSON.stringify(user)}`);
    const rowsAffected = await database.create(user);
    res.status(201).json({ rowsAffected });
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

//** PUT routs **\\

router.get('/salt/:email', async (req, res) => {
  try {
    // Get the user with the specified email
    const email = req.params.email;
    console.log(`email: ${email}`);
    if (email) {
      const result = await database.getSalt(email);
      console.log(`salt: ${JSON.stringify(result)}`);
      res.status(200).json(result);
    } else {
      res.status(404);
    }
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

router.get('/login/:hashedPass/:email', async (req, res) => {
  try {
    // Get the user with the specified email
    const hashedPass = req.params.hashedPass;
    const email = req.params.email;
    console.log(`hashedPass: ${hashedPass}`);
    console.log(`email: ${email}`);
    if (hashedPass && email) {
      const result = await database.checkHashedPass(hashedPass, email);
      console.log(`pw_check: ${JSON.stringify(result)}`);
      res.status(200).json(result);
    } else {
      res.status(404);
    }
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

//** POST routs **\\

router.post('/', async (req, res) => {
  try {
    // Create a user
    const user = req.body;
    console.log(`user: ${JSON.stringify(user)}`);
    const rowsAffected = await database.create(user);
    res.status(201).json({ rowsAffected });
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

//** PUT routs **\\

router.put('/id/:id', async (req, res) => {
  try {
    // Update the user with the specified ID
    const userId = req.params.id;
    console.log(`userId: ${userId}`);
    const user = req.body;
    console.log(user)

    if (userId && user) {
      delete user.id;
      console.log(`user: ${JSON.stringify(user)}`);
      const rowsAffected = await database.update(userId, user);
      res.status(200).json({ rowsAffected });
    } else {
      res.status(404);
    }
  } catch (err) {
    res.status(500).json({ error: err?.message });
    console.log(err);
  }
});

router.put('/liked/:userID/:petID', async (req, res) => {
  try {
    // Update the user with the specified ID
    const userId = req.params.userID;
    console.log(`userId: ${userId}`);
    const petId = req.params.petID;
    console.log(petId)

    if (userId && petId) {
      console.log(`petId: ${JSON.stringify(petId)}`);
      const rowsAffected = await database.updateLikes(userId, petId);
      res.status(200).json({ rowsAffected });
    } else {
      res.status(404);
    }
  } catch (err) {
    res.status(500).json({ error: err?.message });
    console.log(err);
  }
});


//** DELETE routs **\\

router.delete('/:id', async (req, res) => {
  try {
    // Delete the user with the specified ID
    const userId = req.params.id;
    console.log(`userId: ${userId}`);

    if (!userId) {
      res.status(404);
    } else {
      const rowsAffected = await database.delete(userId);
      res.status(204).json({ rowsAffected });
    }
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

export default router;