const express = require('express');

const app = express();

const cors = require('cors');
const agentRoutes = require('./routes/agentRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
app.use(cors());
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.use('/api/agentRoutes', agentRoutes);
app.use('/api/properties', propertyRoutes);



module.exports =app;