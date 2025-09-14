import { config } from "dotenv";
import { createTransport } from "nodemailer";

config();

const { MAIL_USER, MAIL_CLIENT_ID, MAIL_CLIENT_SECRET, MAIL_REFRESH_TOKEN } = process.env;

let transporter;

// Create the transporter inside an async function to use await
const createEmailTransporter = async () => {
  try {
    transporter = createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: MAIL_USER,
        clientId: MAIL_CLIENT_ID,
        clientSecret: MAIL_CLIENT_SECRET,
        refreshToken: MAIL_REFRESH_TOKEN,
      },
    });
    // Verify the connection
    await transporter.verify();
    console.log('Transporter is ready to send emails.');
  } catch (error) {
    console.error('Failed to create email transporter:', error.message);
  }
};

createEmailTransporter();

export const mailSender = async ({ email, subject, html }) => {
  if (!transporter) {
    throw new Error('Email transporter is not ready. Please try again later.');
  }

  if (!email) {
    throw new Error("Recipient email is required.", { cause: { code: 400 } });
  }

  const mailOptions = {
    from: MAIL_USER,
    to: email,
    subject: subject || "No Subject",
    html: html || "No Description",
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Mail sent successfully to ${email}. Message ID: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`Error sending email to ${email}: ${error.message}`);
  }
};
