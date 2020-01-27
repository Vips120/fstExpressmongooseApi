let Joi = require("@hapi/joi");
let mongoose = require("mongoose");
let config = require("config");
let jwt = require("jsonwebtoken");
let userSchema = new mongoose.Schema({
    FirstName: { type: String, min: 3, max: 200, required: true, alphanum: true, trim: true },
    LastName: { type: String, min: 3, max: 200, required: true, alphanum: true, trim: true },
    MobileNo: { type: String, required: true },
    UserLogin: {
        EmailId: { type: String, required: true, unique: true },
        Password: { type: String, required: true }
    },
    isAdmin: { type:Boolean}
});

userSchema.methods.UserToken = function () {
    let token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin}, config.get("apitoken"));
    return token;
};

let userModel = mongoose.model("users", userSchema);
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


module.exports = { userModel, ValidationError };