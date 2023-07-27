const catchAsyncError = require("../middleware/catchAsyncError");
const nodeMailer = require('nodemailer')


const sendEmail = catchAsyncError( async (options) =>{
    const transporter = nodeMailer.createTransport({
        host:process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        service:  process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_EMAIL,
            pass: process.env.SMPT_PASSWORD
            }
            })

      const mailOptions = {
        from: process.env.SMPT_EMAIL,
        to: options.email,
        subject: options.subject,
        text: options.text
      }  
      
      await transporter.sendMail(mailOptions)
})





module.exports = {
    sendEmail
}