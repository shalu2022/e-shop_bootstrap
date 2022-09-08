const nodemailer = require('nodemailer')

const sendMail = async (to, subject, content) =>{
   // let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: 'smpt.gmail.com',
        port: 465,
        auth: {
            user: 'samplemailid@gmail.com',
            pass: process.env.PASS
        }
    });

    const info = await transporter.sendMail({
        to,
        from: 'samplemailid@gmail.com',
        subject,
        html: `<div>${content}</div>`
    });
    return info;
};

module.exports = sendMail