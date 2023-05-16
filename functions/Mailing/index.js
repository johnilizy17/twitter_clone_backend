const nodemailer = require("nodemailer");
const {MessagSystem} = require("./message");

 function MailingSystem(e, email){
  
  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "admin@massbuy.ng", // generated ethereal user
        pass: 'Massbuy@1', // generated ethereal password
      },
    });
  
    const data = await MessagSystem(e)
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'admin@massbuy.ng', // sender address
      to: email, // list of receivers
    ...data
    });
   }
  
  main().catch(console.error);
  
}

module.exports = { MailingSystem }
