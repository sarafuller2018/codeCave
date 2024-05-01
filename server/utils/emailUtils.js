import { createTransport } from 'nodemailer';

const sendEmail = async (from, to, subject, text) => {
    // Create a Nodemailer transporter using SMTP
    let transporter = createTransport({
        service: 'gmail',
        auth: {
            user: 'your_email@gmail.com',
            pass: 'your_password',
        },
    });

    // Setup email data
    let mailOptions = {
        from: from,
        to: to,
        subject: subject,
        text: text,
    };

    // Send the email
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return 'Email sent successfully';
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};

export { sendEmail };

//EXAMPLE ADD TO ANY PAGE THAT NEEDS TO SEND EMAIL
// const sendEmail = require('.server/utils/emailUtils.js');

// sendEmail(contributorEmail, postOwnerEmail, 'Subject', 'Hello, this is a test email');