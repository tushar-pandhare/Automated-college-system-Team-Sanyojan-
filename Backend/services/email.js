const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendOTPEmail = async (email, otp) => {
  const msg = {
    to: email,
    from: 'noreply@yourcollege.edu',
    subject: 'Your Parent Portal Access Code',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #1a237e;">College Parent Portal Access</h2>
        <p>Your one-time verification code is:</p>
        <div style="font-size: 24px; font-weight: bold; color: #1a237e; margin: 20px 0;">
          ${otp}
        </div>
        <p>This code will expire in ${process.env.OTP_EXPIRY_MINUTES} minutes.</p>
        <p style="color: #666; font-size: 12px;">
          If you didn't request this code, please contact the college administration.
        </p>
      </div>
    `
  };

  await sgMail.send(msg);
};

module.exports = { sendOTPEmail };