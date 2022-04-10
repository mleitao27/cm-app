const express = require('express');
const mongodb = require('mongodb');
const db = require('../modules/db');

const router = express.Router();

// Get clients
router.get('/', async (req, res) => {
    res.status(200).send(await db.getDocument('clients', {}));
});

// Get client by id
router.get('/:id', async (req, res) => {
    let client = await db.getFirstDocument('clients', {_id: new mongodb.ObjectId(req.params.id)})
    let beneficiaries = await db.getDocument('beneficiaries', {clientId: new mongodb.ObjectId(req.params.id)})
    let service = await db.getFirstDocument('services', {clientId: new mongodb.ObjectId(req.params.id), isActive: true})
    res.status(200).send({...client, beneficiaries, service});
});

// Add clients
router.post('/', async (req, res) => {
    // Check if client already exists
    let alreadyClient = await db.getDocument('clients', {fiscalNumber: req.body.fiscalNumber});
    if(alreadyClient.length) res.status(409).send('already_exist_client_fiscal_number');
    else {
        let clientId = await db.insertDocument('clients', {
            name: req.body.name,
            address: req.body.address,
            fiscalNumber: req.body.fiscalNumber,
            createdAt: new Date()
        })
        // If no beneficiaries were added
        // or were added and then removed
        // add the client as beneficiary
        if(req.body.beneficiaries && req.body.beneficiaries.length) {
            req.body.beneficiaries.map(async(b) => {
                await db.insertDocument('beneficiaries', {
                    clientId: clientId.insertedId,
                    name: b.name,
                    address: b.address,
                    fiscalNumber: b.fiscalNumber,
                    isClient: b.isClient,
                    createdAt: new Date()
                })
            })
        } else {
            await db.insertDocument('beneficiaries', {
            clientId: clientId.insertedId,
            name: req.body.name,
            address: req.body.address,
            fiscalNumber: req.body.fiscalNumber,
            isClient: true,
            createdAt: new Date()
        })
        }
        // If there is already a service to add
        if(req.body.service) {
            await db.insertDocument('services', {
                clientId: clientId.insertedId,
                type: req.body.service.type,
                regime: req.body.service.regime,
                shifts: req.body.service.shifts,
                beginning: req.body.service.beginning,
                duration: req.body.service.duration,
                isActive: true,
                createdAt: new Date()
            })
        }
        res.status(200).send(clientId);
    }
});

// Update client
router.put('/:id', async (req, res) => {
    await db.updateDocument('clients', {_id: new mongodb.ObjectId(req.params.id)}, req.body);
    // If client is also beneficiary edit it as well
    await db.updateDocument('beneficiaries', {clientId: new mongodb.ObjectId(req.params.id), isClient: true}, req.body);
    res.status(200).send();
});

// Delete client
router.delete('/:id', (req, res) => {
    res.status(200).send('delete client');
});

// Get client services
router.get('/:id/services', async (req, res) => {
    res.status(200).send(await db.getDocument('services', {clientId: new mongodb.ObjectId(req.params.id)}));
});

module.exports = router;