let mongoose = require("mongoose");
let genreSchema = new mongoose.Schema({
    name: { type: String, required: true }
});

let genreModel = mongoose.model("gernes", genreSchema);

module.exports = { genreModel, genreSchema };
