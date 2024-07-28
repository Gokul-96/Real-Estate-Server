const express = require('express');

const app = express();

const cors = require('cors');
const agentRoutes = require('./routes/agentRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
app.use(cors());
app.use(express.json());

//Define routes
//to check in postman or browser for register:  POST Request - localhost: 3001/api/agentRoutes/register
//GET Request - localhost: 3001/api/agentRoutes/agents (All details)
// For login :  localhost: 3001/api/agentRoutes/login
app.use('/api/agentRoutes', agentRoutes);
app.use('/api/properties', propertyRoutes);



module.exports =app;