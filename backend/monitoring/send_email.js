// import nodemailer (after npm install nodemailer)
const nodemailer = require('nodemailer');
const send_email = function sendEmail(to, subject, text) {
// config for mailserver and mail, input your data
    const config = {
        mailserver: {
            pool: true,
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: 'mailt605@gmail.com',
                pass: 'khouloud123'
            }
        },
        mail: {
            from: 'mailt605@gmail.com',
            to: to,
            subject: subject,
            text: "Hello, you have a call please join it from this URL => http://localhost:3000/App/"+text
        }
    };

    const sendMail = async ({mailserver, mail}) => {
        // create a nodemailer transporter using smtp
        let transporter = nodemailer.createTransport(mailserver);

        // send mail using transporter
        let info = await transporter.sendMail(mail);

        console.log(`Preview: ${nodemailer.getTestMessageUrl(info)}`);
    };

    sendMail(config).catch(console.error);
}
module.exports = send_email;
