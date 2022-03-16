const express = require('express');
const mongodb = require('mongodb');
const db = require('../modules/db');

const router = express.Router();

// Get beneficiaries
router.get('/', async (req, res) => {
    res.status(200).send(await db.getDocument('beneficiaries', {}));
});

// Get beneficiary by id
router.get('/:id', async (req, res) => {
    res.status(200).send(await db.getFirstDocument('beneficiaries', {_id: new mongodb.ObjectId(req.params.id)}));
});

// Add beneficiaries
router.post('/', async (req, res) => {
    let clientId = await db.insertDocument('beneficiaries', {
        name: req.body.name,
        address: req.body.address,
        fiscalNumber: req.body.fiscalNumber,
        createdAt: new Date()
    })
    res.status(200).send(clientId);
});

// Update beneficiary
router.put('/:id', async (req, res) => {
    await db.updateDocument('beneficiaries', {_id: new mongodb.ObjectId(req.params.id)}, req.body);
    res.status(200).send();
});


// Delete beneficiaries
router.delete('/:id', async (req, res) => {
    await db.deleteDocument('beneficiaries', {_id: new mongodb.ObjectId(req.params.id)});
    res.status(200).send();

});

module.exports = router;