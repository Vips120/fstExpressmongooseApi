let express = require("express");
let router = express.Router();
let Joi = require("@hapi/joi");
let User = require("../dbModel/user");
//fetch data
router.get("/fetchuser", async (req, res) => {
    let data = await User.find();
    res.send({ d: data });
});
//fetch data by id
router.get("/fetchuser/:id", async (req, res) => {
    let user = await User.findById(req.params.id);
    if (!user) { return res.status(404).send({ message: "Invalid user id" }) };
    res.send({ data: user });
});

//create data
router.post("/createuser", async (req, res) => {
    let user = await User.findOne({ "UserLogin.EmailId": req.body.UserLogin.EmailId });
    if (user) { return res.status(403).send({ message: "user already exists in our system" }) };

    let { error } = ValidationError(req.body);
    if (error) { return res.send(error.details[0].message) };
    let newuser = new User({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        MobileNo: req.body.MobileNo,
        UserLogin: req.body.UserLogin
    });
    let data = await newuser.save();
    res.send({ message: "THANK YOU!" , d: data});
});

//update data
router.put("/updateuser/:id", async (req, res) => {
    let user = await User.findById(req.params.id);
    if (!user) { return res.status(404).send({ message: "Invalid user id" }) };
    let { error } = ValidationError(req.body);
    if (error) { return res.send(error.details[0].message) };
    user.FirstName = req.body.FirstName;
    user.LastName = req.body.LastName;
    user.MobileNo = req.body.MobileNo;
    user.UserLogin.EmailId = req.body.UserLogin.EmailId;
    user.UserLogin.Password = req.body.UserLogin.Password;
    await user.save();
    res.send({ message: "Data updated" });
});

//remove data
router.delete("/removeuser/:id", async (req, res) => {
    let user = await User.findByIdAndRemove(req.params.id);
    if (!user) { return res.status(404).send({ message: "Invalid user id" }) };
    res.send({message:"THANK YOU ! COME BACK AGAIN :("})
});

function ValidationError(error) {
    let Schema = Joi.object({
        FirstName: Joi.string().min(3).max(200).required(),
        LastName: Joi.string().min(3).max(200).required(),
        MobileNo: Joi.string().required(),
        UserLogin: {
            EmailId: Joi.string().required().email(),
            Password: Joi.string().required()
        }
    });
    return Schema.validate(error);
};

module.exports = router;