const mongoose = require('mongoose');

//schema creation and fields
//create model with the name 'Agent' with instance "agentSchema"
const agentSchema = new mongoose.Schema({
  name: { type: String, required:   true },
email: { type:String, required: true, unique: true },
  password: { type:String, required: true },
});

module.exports = mongoose.model('Agent', agentSchema);