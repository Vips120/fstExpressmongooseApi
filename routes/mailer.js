let express = require("express");
let router = express.Router();
let nodemailer = require("nodemailer");
let crypto = require("crypto");
let User = require("../dbModel/user");

router.post("/nodemailer", async (req, res) => {
    let user = await User.userModel.findOne({ "UserLogin.EmailId": req.body.UserLogin.EmailId });
    if (!user) { return res.status(403).send({ message: "Invalid email id" }) };
    let token = crypto.randomBytes(32).toString("hex");
    user.resetpaswordtoken = token;
    user.resetpasswordexpires = Date.now() + 3600000 // 1 hrs
    await user.save();

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: '-', // generated ethereal user
            pass: '-' // generated ethereal password
        }
    });

    if (!transporter) res.status(401).send({
        message: 'something went wrong'
    });
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Vs Apps:sweat_smile:" <wynebatman@gmail.com>', // sender address
        to: user.UserLogin.EmailId, // list of receivers
        subject: 'Reset Your Password', // Subject line:smile:
        text: 'open this link to change your password http://localhost:4200/forgotpassword/' + token // plain text body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
    res.send({ message: "PLEASE CHECK YOUR MAIL BOX", d: user });
});

module.exports = router;