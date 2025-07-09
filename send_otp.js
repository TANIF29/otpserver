const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/send-otp', async (req, res) => {
  const { email, otp, token } = req.body;

  // Validate token for security
  if (token !== 'my_secure_token_2025') {
    return res.status(403).json({ success: false, error: "Unauthorized request" });
  }

  if (!email || !otp) {
    return res.status(400).json({ success: false, error: "Email or OTP missing" });
  }

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mdtanif0091@gmail.com',
      pass: 'sgot sidl qksl mbcd' // Your Gmail app password
    }
  });

  const mailOptions = {
    from: '"Dairy OTP System" <mdtanif0091@gmail.com>',
    to: email,
    subject: 'Your OTP Code',
    html: `<p>Your OTP code is: <b>${otp}</b></p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`OTP server running on port ${PORT}`);
});
