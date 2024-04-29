require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

module.exports = transporter;
const sendEmail = async (contributorEmail, postOwnerEmail, subject, text) =>{
    try {
        await transporter.sendMail({
            from: contributorEmail,
            to: postOwnerEmail,
            subject: subject,
            text: text
        });
        console.log("Email sent successfully");
    }catch (error) {
        console.error("Error sending email:", error );
    }
};

module.exports = sendEmail;


//EXAMPLE ADD TO ANY PAGE THAT NEEDS TO SEND EMAIL
// const sendEmail = require('.server/utils/emailUtils.js');

// sendEmail(contributorEmail, postOwnerEmail, 'Subject', 'Hello, this is a test email');