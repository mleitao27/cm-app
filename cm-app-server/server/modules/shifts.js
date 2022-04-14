const mongodb = require('mongodb');
const db = require('./db');

var generateShifts = async (clientId) => {
    let res = false;
    let resData = {};

    let services = await db.getDocument('services', {clientId: new mongodb.ObjectId(clientId), isActive: true});
    // Check if beginning this month or the next

    let now = new Date();
    let sameMonth = true;
    
    let i = 0;
    // From string to milliseconds
    let start = Date.parse(services[0].beginning);
    let end = Date.parse(services[0].beginning);

    resData.days = [];

    while (sameMonth) {
        end = end + services[0].shifts * 60 * 1000;

        if(now.getMonth() !== new Date(end).getMonth()) sameMonth = false;

        resData.days.push({
            clientId: new mongodb.ObjectId(clientId),
            // Date format
            start: new Date(start),
            end: new Date(end) 
        });

        i = i + 1;
        start = end;
    }
    
    if(services.length === 1) res = true;
    return [res, res ? {...services[0], ...resData} : null]
};

// Export functions
exports.generateShifts = generateShifts;