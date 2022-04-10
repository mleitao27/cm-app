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

// add service
router.post('/', async (req, res) => {
    if(req.body.service) {
        await db.updateDocument('services', {clientId: new mongodb.ObjectId(req.body.clientId), isActive: true}, {isActive: false});
        await db.insertDocument('services', {
            clientId: new mongodb.ObjectId(req.body.clientId),
            type: req.body.service.type,
            regime: req.body.service.regime,
            shifts: req.body.service.shifts,
            beginning: req.body.service.beginning,
            duration: req.body.service.duration,
            isActive: true,
            createdAt: new Date()
        })
        res.status(200).send();
    } else res.status(500).send();
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

// Activate service
router.get('/:id/activate', async (req, res) => {
    let service = await db.getFirstDocument('services', {_id: new mongodb.ObjectId(req.params.id)})
    await db.updateDocument('services', {clientId: service.clientId, isActive: true}, {isActive: false});
    await db.updateDocument('services', {_id: new mongodb.ObjectId(req.params.id)}, {isActive: true});
    res.status(200).send();
});

module.exports = router;