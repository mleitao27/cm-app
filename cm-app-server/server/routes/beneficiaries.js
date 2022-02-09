const express = require('express');
const mongodb = require('mongodb');
const db = require('../modules/db');

const router = express.Router();

// Get clients
router.get('/', async (req, res) => {
    res.status(200).send(await db.getDocument('beneficiaries', {}));
});

// Get client by id
router.get('/:id', async (req, res) => {
    res.status(200).send(await db.getFirstDocument('beneficiaries', {_id: new mongodb.ObjectId(req.params.id)}));
});

// Add clients
router.post('/', async (req, res) => {
    let clientId = await db.insertDocument('beneficiaries', {
        name: req.body.name,
        address: req.body.address,
        fiscalNumber: req.body.fiscalNumber,
        createdAt: new Date()
    })
    res.status(200).send(clientId);
});

// Delete clients
router.delete('/', (req, res) => {
    res.send('hello');
});

module.exports = router;