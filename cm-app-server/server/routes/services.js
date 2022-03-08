const express = require('express');
const mongodb = require('mongodb');
const db = require('../modules/db');

const router = express.Router();

// Get services
router.get('/', async (req, res) => {
    res.status(200).send(await db.getDocument('services', {}));
});

// Get service by id
router.get('/:id', async (req, res) => {
    res.status(200).send(await db.getFirstDocument('services', {_id: new mongodb.ObjectId(req.params.id)}));
});

// Update services
router.put('/:id', async (req, res) => {
    await db.updateDocument('services', {_id: new mongodb.ObjectId(req.params.id)}, req.body);
    res.status(200).send();
});

// Delete services
router.delete('/', (req, res) => {
    res.status(200).send('delete service');
});

module.exports = router;