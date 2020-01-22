let mongoose = require("mongoose");
let userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    emailid: { type: String, required: true }
});

let userModel = mongoose.model("userstocks", userSchema);

module.exports = { userSchema, userModel };

