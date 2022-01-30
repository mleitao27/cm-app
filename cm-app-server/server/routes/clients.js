const express = require('express');
const mongodb = require('mongodb');
const db = require('../modules/db');

const router = express.Router();

// Get clients
router.get('/', async (req, res) => {
    res.status(200).send(await db.getDocument('clients', {}));
});

// Add clients
router.post('/', (req, res) => {
    res.send('hello');
});

// Delete clients
router.delete('/', (req, res) => {
    res.send('hello');
});

module.exports = router;