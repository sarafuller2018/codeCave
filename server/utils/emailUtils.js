import dotenv from 'dotenv';
import { createTransport } from 'nodemailer';

dotenv.config();
const sendEmail = async () => {
    // Create a Nodemailer transporter using SMTP
    let transporter = createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Setup email data
    let mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'recipient@example.com',
        subject: 'Contribution Request',
        text: '',
    };

    // Send the email
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};


export { sendEmail };


//EXAMPLE ADD TO ANY PAGE THAT NEEDS TO SEND EMAIL
// const sendEmail = require('.server/utils/emailUtils.js');

// sendEmail(contributorEmail, postOwnerEmail, 'Subject', 'Hello, this is a test email');