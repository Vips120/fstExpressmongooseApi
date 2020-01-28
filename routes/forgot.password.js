let express = require("express");
let router = express.Router();
let User = require("../dbModel/user");
let bcrypt = require("bcrypt");
let Joi = require("@hapi/joi");

router.post("/forgotpassword/:token", async (req, res) => {
    let user = await User.userModel.findOne({
        "resetpaswordtoken": req.params.token,
        "resetpasswordexpires": {
$gt: Date.now()
        }
    });

    if (!user) { return res.status(403).send({ message: "Invalid token or token got expires" }) };
    let { error } = Validationerror(req.body);
    if (error) { return res.send(error.details[0].message) };
    let oldpassword = await bcrypt.compare(req.body.UserLogin.Password, user.UserLogin.Password);
    if (oldpassword) { return res.status(402).send({ message: "Hey its old then you! please make something a very very new password" }) };
    user.UserLogin.Password = req.body.UserLogin.Password;
    user.resetpasswordexpires = undefined;
    user.resetpaswordtoken = undefined;
    let salt = await bcrypt.genSalt(10);
    user.UserLogin.Password = await bcrypt.hash(user.UserLogin.Password, salt);
    await user.save();
    res.send({ message: "password updated" });
});

function Validationerror(error) {
    let Schema = Joi.object({
        UserLogin: {
            Password: Joi.string().required()
        }
    });
    return Schema.validate(error);
}

module.exports = router;
