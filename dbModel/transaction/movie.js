let mongoose = require("mongoose");
let movieSchema = new mongoose.Schema({
    name: { type: String, required: true },
    actor: { type: String, required: true },
    price: { type: Number, required: true },
    stocks: { type: Number, required: true }
});

let movieModel = mongoose.model("moviestocks", movieSchema);

module.exports = { movieSchema, movieModel };