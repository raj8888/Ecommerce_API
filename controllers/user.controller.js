const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const SECRET_KEY = process.env.SECRET_KEY;

exports.registerUser = async (req, res) => {
    try {
      const { name, email, mobile, password } = req.body;
  
      // Check if the user already exists with the provided email or mobile number
      
      const existingUserByEmail = await User.findOne({ email });
      if (existingUserByEmail) {
        return res.status(400).json({ error: 'User already exists with this email.' });
      }
  
      const existingUserByMobile = await User.findOne({ mobile });
      if (existingUserByMobile) {
        return res.status(400).json({ error: 'User already exists with this mobile number.' });
      }
  
      // Hash the password before saving to the database
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user instance and save it to the database
      const newUser = new User({
        name,
        email,
        mobile,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error.' });
    }
  };

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found with this email.' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password.' });
    }

    // Generate a JWT token with the user ID and email
    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY);

    res.status(200).json({ message: 'Login successful.', token: token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};
