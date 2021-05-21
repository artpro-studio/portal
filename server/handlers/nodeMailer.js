const nodemailer = require("nodemailer");


const sendMailer = async (toMails, subject, htmlMessage) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'meter@portaljkh.ru', // generated ethereal user
      pass: 'portalJKH@GADmin', // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'meter@portaljkh.ru', // откого будем отправлять
    to: toMails, // передать строку почт через ,
    //to: 'ya.andreyi96@yandex.ru', // передать строку почт через ,
    subject: subject, // Тема письма
    //text: "Hello world?", // Текст письма
    html: htmlMessage, // Текст письмаы html
  });

  //console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports.sendMailer = sendMailer
