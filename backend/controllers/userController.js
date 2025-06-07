const User = require('../models/User');
const nodemailer = require('nodemailer');

exports.register = async (req, res) => {
  try {
    console.log('Register route hit'); // ✅ Add this
    const { name, email, password, company, age, dob, image } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const user = new User({ name, email, password, company, age, dob, image });
    await user.save();

    return res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error('Error in register:', err); // ✅ Check this in terminal
    return res.status(500).json({ error: 'Registration failed' });
  }
};




exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 10 * 60000);
    await user.save();

    // ✅ Send email using nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nithishdmm@gmail.com',      // ✅ your Gmail address
        pass: 'cfwx qtxx iucm qiyw'          // ✅ your Gmail app password
      }
    });

    const mailOptions = {
      from: 'your_email@gmail.com',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is: ${otp}`
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Failed to send OTP email' });
      } else {
        console.log('Email sent: ' + info.response);
        res.json({ msg: 'OTP sent successfully' });  // Don't return OTP now
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
};


exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || user.otpExpiry < new Date()) {
      return res.status(401).json({ error: 'Invalid or expired OTP' });
    }

    res.json({ msg: 'Login successful', user });
  } catch (err) {
    console.error('OTP verification error:', err);
    res.status(500).json({ error: 'OTP verification failed' });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const { email } = req.body;
    await User.deleteOne({ email });
    res.json({ msg: 'Account deleted successfully' });
  } catch (err) {
    console.error('Delete account error:', err);
    res.status(500).json({ error: 'Failed to delete account' });
  }
};
