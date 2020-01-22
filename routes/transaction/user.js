let express = require("express");
let router = express.Router();
let Joi = require("@hapi/joi");
let User = require("../../dbModel/transaction/user");
router.post("/user", async (req, res) => {
    let { error } = userValidation(req.body);
    if (error) { return res.send(error.details[0].message) };
    let data = new User.userModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        emailid: req.body.emailid
    });
    let item = await data.save();
    res.send({ i: item });
});

function userValidation(error) {
    let Schema = Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        emailid: Joi.string().required()
    });
    return Schema.validate(error);
}

module.exports = router;