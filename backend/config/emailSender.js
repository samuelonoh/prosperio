import nodemailer from 'nodemailer';

const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
    //creating a transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        port: 587,
        service: process.env.SERVICE,
        secure: process.env.SECURE,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    //Difine email options
    const mailOptions = {
        from: sent_from,
        to: send_to,
        replyTo: reply_to,
        subject: subject,
        html: message,
    }

    //send the email
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log(info)
        }
        
    })
};

export default sendEmail