const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'authorization denied no token' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.agent = decoded.agentId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};



module.exports = authMiddleware;