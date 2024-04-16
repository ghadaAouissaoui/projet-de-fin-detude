const nodemailer = require("nodemailer");

const envoyerVerification = async (email, verificationLink) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });

        const emailText = `
            <p>Hello,</p>
            <p>Thank you for registering. Please click the following link to verify your email address:</p>
            <a href="${verificationLink}">Verify Email</a>
            <p>If you didn't request this, you can ignore this email.</p>
            <p>Best regards,</p>
            <p>Vetoline Team</p>
        `;

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: 'Email Verification',
            html: emailText, // Use HTML instead of text for formatting
        });

        console.log("Email sent successfully");
    } catch (error) {
        console.error("Email not sent:", error);
        return error;
    }
};

module.exports = {
    envoyerVerification,
};
