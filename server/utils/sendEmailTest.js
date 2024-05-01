const axios = require('axios');
const sendEmail = require('./sendEmail');

const sendTestEmail = async () => {
  const url = 'http://localhost:3001/api/send-email';
  const data = {
    toEmail: 'bernardo4430@gmail.com',
    subject: 'Test Email',
    text: 'This is a test email sent from your MERN stack project.'
  };

  try {
    const response = await axios.post(url, data);
    console.log('Email sent successfully:');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

sendTestEmail();