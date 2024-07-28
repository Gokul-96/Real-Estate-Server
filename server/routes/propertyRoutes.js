const express = require('express');
const Property = require('../models/PropertyModel');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new property (CREATE)
router.post('/', authMiddleware, async (req, res) => {
  const { type, location, description ,price} = req.body;
try {
    const property = new Property({
      agent: req.agent,
      type,
      location,
      price,
      description,
    });

await property.save();

    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message:'Server error' });
  }
});

// Find All properties using get and agent field matches req.agent (READ)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const properties = await Property.find({ agent: req.agent });
    res.json(properties); //In json format properties
  } catch (error) {
    res.status(500).json({ message:'Server error' });
  }
});

// Update a property (UPDATE)
router.put('/:id', authMiddleware, async (req, res) => {
  const { type, location, price, description, status } = req.body;

  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message:'Not found' });
    }

    if (property.agent.toString() !== req.agent) {
      return res.status(401).json({ message: 'Not authorized' });
    }
 //update property with new value or existing value 
    property.type = type || property.type;
    property.location = location || property.location;
    property.price = price || property.price;
    property.description = description || property.description;
    property.status = status || property.status;

    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message:'Server error' });
  }
});

// Update property status (PATCH)
router.patch('/:id/status', authMiddleware, async (req, res) => {
  const { status } = req.body;

  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Not found' });
    }

    if (property.agent.toString() !== req.agent) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    property.status = status;

    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a property (DELETE)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);



    if (!property) {
      return res.status(404).json({ message: 'Not found' });
    }

    if (property.agent.toString() !== req.agent) {
      return res.status(401).json({ message:'Not authorized' });
    }

    await property.remove();

    res.json({ message: 'Property removed' });

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;