const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const clients = require('./routes/clients');
const services = require('./routes/services');
const beneficiaries = require('./routes/beneficiaries');

app.use('/api/clients', clients);
app.use('/api/services', services);
app.use('/api/beneficiaries', beneficiaries);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));