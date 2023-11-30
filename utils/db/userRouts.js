import express from 'express';
import { config } from './config.js';
import Database from './database.js';

const router = express.Router();
router.use(express.json());

// Create database object
const database = new Database(config);

router.get('/', async (_, res) => {
  try {

    const users = await database.readAll();
    console.log(`users: ${JSON.stringify(users)}`);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

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


router.get('/id/:id', async (req, res) => {
  try {
    // Get the user with the specified ID
    const userId = req.params.id;
    console.log(`userId: ${userId}`);

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

router.get('/username/:username', async (req, res) => {
  try {
    // Get the user with the specified username
    const username = req.params.username;
    console.log(`username: ${username}`);
  
    if (username) {
      const result = await database.readByUsername(username);
      console.log(`users: ${JSON.stringify(result)}`);
      res.status(200).json(result);
    } else {
      res.status(404);
    }
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});

router.get('/email/:email', async (req, res) => {
  try {
    // Get the user with the specified email
    const email = req.params.email;
    console.log(`email: ${email}`);
  
    if (email) {
      const result = await database.readByEmail(email);
      console.log(`users: ${JSON.stringify(result)}`);
      res.status(200).json(result);
    } else {
      res.status(404);
    }
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
});




router.put('/:id', async (req, res) => {
  try {
    // Update the user with the specified ID
    const userId = req.params.id;
    console.log(`userId: ${userId}`);
    const user = req.body;

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
  }
});

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