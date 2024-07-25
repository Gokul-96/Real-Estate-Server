const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  agent: { type: mongoose.Schema.Types.ObjectId, ref: 'Agent', required: true },
  type:{ type: String,  required: true },

  location:{ type: String, required: true },
  
  description:{ type: String },
  price: { type: Number, required: true },
  status: { type: String, enum: ['Available', 'Sold'], default: 'Available' },
});



module.exports =  mongoose.model('Property', propertySchema);