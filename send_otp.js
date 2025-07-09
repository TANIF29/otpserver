const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

app.post('/send-otp', async (req, res) => {
  const { email, otp, token } = req.body;

  // Validate token
  if (token !== 'my_secure_token_2025') {
    return res.status(403).json({ success: false, error: 'Unauthorized request' });
  }

  if (!email || !otp) {
    return res.status(400).json({ success: false, error: 'Email or OTP missing' });
  }

  // Create reusable transporter object using Gmail SMTP
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mdtanif0091@gmail.com',    // your gmail address
      pass: 'sgot sidl qksl mbcd'       // your app password
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
    console.log(`OTP sent to ${email}`);
    res.json({ success: true });
  } catch (error) {
    console.error('Failed to send OTP:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('OTP Sending Service is Running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
