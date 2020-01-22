let mongoose = require("mongoose");
let Genre = require("../../dbModel/movie/genre");
let movieSchema = new mongoose.Schema({
    name: { type: String, required: true },
    actor: { type: String, required: true },
    price: { type: Number, required: true },
    genre: { type: Genre.genreSchema }
});

let movieModel = mongoose.model("movies", movieSchema);

module.exports = movieModel;
