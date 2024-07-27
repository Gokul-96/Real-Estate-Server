//custom middleware for authentication and authorization
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

const SECRET_KEY = config.SECRET_KEY;

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  //If token is not valid then show error
  //If Valid verify token
  if (!token) {
    return res.status(401).json({ message: 'authorization denied no token' });
  }
  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    req.agent = decodedToken.agentId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};



module.exports = authMiddleware;