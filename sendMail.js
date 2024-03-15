const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config(); 

// Create Express app
const app = express();
const port = 3000;

// Middleware 
app.use(express.json());

// POST route to send emails
app.post('/', (req, res) => {
    
    const { to, subject, text } = req.body;

    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'sandrasindhu0701@gmail.com', 
            pass: process.env.GMAIL_APP_PASSWORD 
        }
    });

    // Email content
    let mailOptions = {
        from: 'sandrasindhu0701@gmail.com',
        to: 'aprasanth448@gmail.com', 
        subject: 'Testing Nodemailer', 
        text: 'This is a testing message' 
    };
    

    // Sending email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error occurred:', error);
            res.status(500).send('Error occurred while sending email');
        } else {
            console.log('Message sent: %s', info.messageId);
            res.send('Email sent successfully');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
