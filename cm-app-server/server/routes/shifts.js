const express = require('express');
const mongodb = require('mongodb');
const db = require('../modules/db');
const shiftsModule = require('../modules/shifts');

const router = express.Router();

// Get shifts
router.get('/', async (req, res) => {
    res.status(200).send(await db.getDocument('shifts', {}));
});

// Get shift by id
router.get('/:id', async (req, res) => {
    let shift = await db.getFirstDocument('shifts', {_id: new mongodb.ObjectId(req.params.id)})
    res.status(200).send(shift);
});

// Add shift
router.post('/', async (req, res) => {
    let shiftId = await db.insertDocument('shifts', {
        name: req.body.name,
        address: req.body.address,
        fiscalNumber: req.body.fiscalNumber,
        createdAt: new Date()
    })
    res.status(200).send(shiftId);
});

// Update shift
router.put('/:id', async (req, res) => {
    await db.updateDocument('shifts', {_id: new mongodb.ObjectId(req.params.id)}, req.body);
    res.status(200).send();
});

// Delete shift
router.delete('/:id', (req, res) => {
    res.status(200).send('delete employee');
});

router.get('/generate/:clientId', async (req, res) => {
    let result = await shiftsModule.generateShifts(req.params.clientId);
    
    if(result[0]) {
        res.status(200).send(result[1]);
    } else {
        res.status(424).send('Something went is wrong with the client or their service');
    }
})

module.exports = router;