const nodemailer = require("nodemailer");

const {SMTP_HOST, SMTP_PORT,SMTP_EMAIL, SMTP_PASSWORD,FROM_NAME, FROM_EMAIL} = process.env

const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD,
    },
});

const sendEmail = async (options) => {
    // send mail with defined transport object
    const message = {
        from: `${FROM_NAME} <${FROM_EMAIL}>`, // sender address
        to: options.email, // list of receivers
        subject: options.subject, // Subject line
        text: options.message, // plain text body
    };

    const info = await transporter.sendMail(message)

    console.log("Message sent: %s", info.messageId);
}

module.exports = sendEmail;