const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const PORT = 3000;

// Middleware to parse JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// POST /send-otp
app.post('/send-otp', async (req, res) => {
    const { email, otp, token } = req.body;

    // 1. Token validation
    if (token !== 'my_secure_token_2025') {
        return res.status(403).json({ success: false, error: "Unauthorized request" });
    }

    if (!email || !otp) {
        return res.status(400).json({ success: false, error: "Email or OTP missing" });
    }

    // 2. Nodemailer setup
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mdtanif0091@gmail.com',
            pass: 'sgot sidl qksl mbcd'  // Use your Gmail app password
        }
    });

    // 3. Mail options
    const mailOptions = {
        from: '"Dairy OTP System" <mdtanif0091@gmail.com>',
        to: email,
        subject: 'Your OTP Code',
        html: `<p>Your OTP code is: <b>${otp}</b></p>`
    };

    // 4. Send email
    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`OTP server running at http://localhost:${PORT}`);
});
