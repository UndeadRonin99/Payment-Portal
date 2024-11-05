const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const zxcvbn = require('zxcvbn');
const validator = require('validator');
const argon2 = require('argon2');


// Joi schema for input validation
const registerSchema = Joi.object({
  fullName: Joi.string().min(3).max(50).required(),
  idNumber: Joi.string().min(6).max(20).required(),
  accountNumber: Joi.string().min(6).max(20).required(),
  password: Joi.string()
      .min(12)  // Minimum length of 12 characters
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])")) // Must include uppercase, lowercase, number, special character
      .required()
      .custom((value, helpers) => {
          // Check against common passwords using zxcvbn
          const result = zxcvbn(value);
          if (result.score < 3) {
              return helpers.error("password.tooWeak", { value });
          }
          return value;
      }, 'Password Strength'),
  role: Joi.string().min(8).max(8)
});

const loginSchema = Joi.object({
  idNumber: Joi.string().required(),
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
    const hashedPassword = await argon2.hash(password, {
        type: argon2.argon2id,  // Secure variant of Argon2
        memoryCost: 2 ** 16,    // Amount of memory to use (64MB)
        timeCost: 4,            // Number of iterations
        parallelism: 2          // Number of parallel threads
      });
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

    const { idNumber, accountNumber, password } = req.body;

    // Use explicit equality operator to prevent injection
    const sanitizedIdNumber = validator.escape(idNumber.trim());
    const sanitizedAccountNumber = validator.escape(accountNumber.trim());

    // Find user with both accountNumber and idNumber
    const user = await User.findOne({
      accountNumber: sanitizedAccountNumber,
      idNumber: sanitizedIdNumber
    });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password
    const isMatch = await argon2.verify(user.password, password);
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
