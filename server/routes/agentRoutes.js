const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Agent = require('../models/AgentModel');

const router = express.Router();




//agent register here


router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

try {
    const agentExist = await Agent.findOne({ email });
    if (agentExist) {
      return res.status(400).json({ message: 'Agent exist' });
}

    const hashedPassword = await bcrypt.hash(password, 15);

    const agent = new Agent({
      name,
      email,
      password: hashedPassword,
    });

    await agent.save();

    res.status(201).json({ message: ' Successfully registered' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Agent Login here 
router.post('/login', async (req, res) => {

  const { email, password } = req.body;

try {
    const agent = await Agent.findOne({ email });
if (!agent) {
      return res.status(400).json({ message: 'Login Invalid ' });
    }

    const isMatch = await bcrypt.compare(password, agent.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Login Invalid' });
    }



const token = jwt.sign({ agentId: agent._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;