const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const validator = require('validator');


// Joi schema for input validation
const registerSchema = Joi.object({
  fullName: Joi.string().min(3).max(50).required(),
  idNumber: Joi.string().min(6).max(20).required(),
  accountNumber: Joi.string().min(6).max(20).required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid('customer', 'employee').required() // Assuming role can only be 'customer' or 'employee'
});

const loginSchema = Joi.object({
  accountNumber: Joi.string().required(),
  password: Joi.string().required()
});

exports.register = async (req, res) => {
  try {
    // Validate user input
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { fullName, idNumber, accountNumber, password, role } = req.body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ fullName, idNumber, accountNumber, password: hashedPassword, role });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    // Validate user input
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { accountNumber, password } = req.body;

    // Use explicit equality operator to prevent injection
    const sanitizedAccountNumber = accountNumber.trim();
    const user = await User.findOne({ accountNumber: sanitizedAccountNumber });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token for the user
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
