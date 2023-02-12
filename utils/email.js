const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // Create transporter
  // const transporter = nodemailer.createTransport({
  //   host: process.env.EMAIL_HOST,
  //   port: process.env.EMAIL_PORT,
  //   auth: {
  //     user: process.env.EMAIL_USERNAME,
  //     pass: process.env.EMAIL_PASSWORD,
  //   },
  // });

  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "36ad77fe35d5a8",
      pass: "d0d0a5c4543d4a",
    },
  });

  // Define the email options
  const mailOptions = {
    from: "Team Natours <dhaval.tst@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html: `<!DOCTYPE html>
    //     <html lang="en">
    //     <head>
    //         <meta charset="UTF-8">
    //         <meta http-equiv="X-UA-Compatible" content="IE=edge">
    //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //         <title>Test Email</title>
    //     </head>
    //     <body>
    //         <h1>Test Email</h1>
    //     </body>
    //     </html>`
  };

  // Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
