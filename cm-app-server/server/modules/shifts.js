const mongodb = require('mongodb');
const db = require('./db');

var generateShifts = async (clientId) => {
    let res = false;

    let services = await db.getDocument('services', {clientId: new mongodb.ObjectId(clientId), isActive: true});
    
    if(services.length === 1) res = true;
    return [res, res ? services[0] : null]
};

// Export functions
exports.generateShifts = generateShifts;