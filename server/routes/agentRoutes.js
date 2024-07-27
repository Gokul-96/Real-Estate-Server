const express = require('express');
const bcrypt = require('bcryptjs'); //create hashed version of password for secure
const jwt = require('jsonwebtoken');
const Agent = require('../models/AgentModel');
const router = express.Router();




//agent register here
//check with db if agent already exist or not.
//In try block if agentExist it show 400 for existing agent
//If not 1st hashpassword and create new user and save in db.
//If any database issue catch block used to handle error with 500 status

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;


try {
    const agentExist = await Agent.findOne({ email });
    if (agentExist) {
      return res.status(400).json({ message: 'Agent already exist' });
}

    const hashedPassword = await bcrypt.hash(password, 15);

    const agent = new Agent({
      name,
      email,
      password: hashedPassword,
    });

    await agent.save(); 

    res.status(201).json({ message: ' Successfully registered I mean saved' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});




// Agent Login here 
// check User(agent) already exist or not.
//if agent not exist return 400 error
//compare user password with existing register agent db
//If not match  return 400 error
//If paswword matches generate json web token
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


//jsw
const token = jwt.sign({ agentId: agent._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

res.json({ token });


  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;