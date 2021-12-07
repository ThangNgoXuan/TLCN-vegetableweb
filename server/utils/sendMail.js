import nodemailer from 'nodemailer'

const adminEmail = process.env.MAIL;
const adminPassword = process.env.MAIL_PASSWORD;

export const sendMail = (toEmail, sub, htmlContent) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: adminEmail,
      pass: adminPassword
    }
  });

  const mailOptions = {
    from: adminEmail,
    to: toEmail,
    subject: sub,
    html: htmlContent
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error.message);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

