// // server/routes/auth.js
// const express = require('express');
// const router = express.Router();
// const crypto = require('crypto');
// const { sendOTPEmail } = require('../services/email');
// const OTP = require('../models/OTP');

// // Generate and send OTP
// router.post('/request-otp', async (req, res) => {
//   try {
//     const { studentId } = req.body;
    
//     // 1. Validate student exists
//     const student = await Student.findOne({ studentId });
//     if (!student) return res.status(404).json({ error: 'Student not found' });

//     // 2. Generate OTP
//     const otp = crypto.randomInt(100000, 999999).toString();
//     const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

//     // 3. Save OTP to database
//     await OTP.findOneAndUpdate(
//       { studentId },
//       { otp, expiresAt },
//       { upsert: true, new: true }
//     );

//     // 4. Send OTP to parent's email
//     await sendOTPEmail(student.parentEmail, otp);

//     res.json({ success: true, message: 'OTP sent successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to send OTP' });
//   }
// });

// // Verify OTP
// router.post('/verify-otp', async (req, res) => {
//   try {
//     const { studentId, otp } = req.body;

//     // 1. Find valid OTP
//     const validOTP = await OTP.findOne({
//       studentId,
//       otp,
//       expiresAt: { $gt: new Date() }
//     });

//     if (!validOTP) return res.status(401).json({ error: 'Invalid OTP' });

//     // 2. Delete used OTP
//     await OTP.deleteOne({ _id: validOTP._id });

//     // 3. Return success
//     res.json({ success: true, token: generateAccessToken(studentId) });
//   } catch (error) {
//     res.status(500).json({ error: 'OTP verification failed' });
//   }
// });

const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { sendOTPEmail } = require('../services/email');
const OTP = require('../models/OTP');
const Student = require('../models/Student'); // Assuming you have a Student model

// Generate and send OTP
router.post('/request-otp', async (req, res) => {
  try {
    const { studentId } = req.body;
    
    // Validate student exists
    const student = await Student.findOne({ studentId });
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + process.env.OTP_EXPIRY_MINUTES * 60 * 1000);

    // Save OTP to database
    await OTP.findOneAndUpdate(
      { studentId },
      { otp, expiresAt },
      { upsert: true, new: true }
    );

    // Send OTP to parent's email
    await sendOTPEmail(student.parentEmail, otp);

    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (error) {
    console.error('OTP Error:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  try {
    const { studentId, otp } = req.body;

    // Find valid OTP
    const validOTP = await OTP.findOne({
      studentId,
      otp,
      expiresAt: { $gt: new Date() }
    });

    if (!validOTP) {
      return res.status(401).json({ error: 'Invalid or expired OTP' });
    }

    // Delete used OTP
    await OTP.deleteOne({ _id: validOTP._id });

    // Generate JWT token
    const token = jwt.sign(
      { studentId, role: 'parent' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ success: true, token });
  } catch (error) {
    console.error('OTP Verification Error:', error);
    res.status(500).json({ error: 'OTP verification failed' });
  }
});

module.exports = router;