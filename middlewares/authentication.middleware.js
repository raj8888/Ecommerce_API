const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const SECRET_KEY = process.env.SECRET_KEY;

const authMiddleware = async (req, res, next) => {
  try {
    // Get the JWT token from the Authorization header (bearer ${token})
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Authorization token not provided.' });
    }

    // Verify the token
    const decodedToken = jwt.verify(token, SECRET_KEY);

    // Find the user in the database based on the user ID from the token
    const user = await User.findById(decodedToken.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Attach the user object to the request for further use in the protected route
    req.user = user;
    req.body.role = user.role

    next(); // Move to the next middleware or route handler
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token.' });
    }
    res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = {authMiddleware};
