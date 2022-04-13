const express = require('express');
const mongodb = require('mongodb');
const db = require('../modules/db');

const router = express.Router();

// Get employees
router.get('/', async (req, res) => {
    res.status(200).send(await db.getDocument('employees', {}));
});

// Get employee by id
router.get('/:id', async (req, res) => {
    let employee = await db.getFirstDocument('employees', {_id: new mongodb.ObjectId(req.params.id)})
    res.status(200).send(employee);
});

// Add employee
router.post('/', async (req, res) => {
    let employeeId = await db.insertDocument('employees', {
        name: req.body.name,
        address: req.body.address,
        fiscalNumber: req.body.fiscalNumber,
        createdAt: new Date()
    })
    res.status(200).send(employeeId);
});

// Update employee
router.put('/:id', async (req, res) => {
    await db.updateDocument('employees', {_id: new mongodb.ObjectId(req.params.id)}, req.body);
    res.status(200).send();
});

// Delete employee
router.delete('/:id', (req, res) => {
    res.status(200).send('delete employee');
});

module.exports = router;