const express = require('express');
const router = express.Router();
const {
  register,
  login,
  verifyOTP,
  deleteAccount
} = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.post('/verify-otp', verifyOTP);
router.post('/delete', deleteAccount);

module.exports = router;


// const express = require('express');
// const router = express.Router();
// const User = require('./models/User');

// router.post('/register', async (req, res) => {
//   try {
//     const { name, email, password, company, age, dob, image } = req.body;
//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ msg: 'User already exists' });

//     const user = new User({ name, email, password, company, age, dob, image });
//     await user.save();
//     res.status(201).json({ msg: 'User registered successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ msg: 'Server error' });
//   }
// });

// module.exports = router;
