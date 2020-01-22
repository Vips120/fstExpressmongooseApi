let express = require("express");
let router = express.Router();
let Joi = require("@hapi/joi");
let movie = require("../../dbModel/movie/movie");
let genre = require("../../dbModel/movie/genre");

router.post("/movie", async (req, res) => {
    let { error } = MovieValidationerror(req.body);
    if (error) { return res.send(error.details[0].message) };
    let G = await genre.genreModel.findById(req.body.genreId);
    if (!G) { return res.status(403).send({ message: "Invalid genre id" }) };
    let data = new movie({
        name: req.body.name,
        actor: req.body.actor,
        price: req.body.price,
        genre: {
            _id: G._id,
            name: G.name
        }
    });
    let item = await data.save();
    res.send(item);

});

function MovieValidationerror(error) {
    let Schema = Joi.object({
        name: Joi.string().required(),
        actor: Joi.string().required(),
        price: Joi.number().required(),
        genreId: Joi.string().required()
    });
    return Schema.validate(error);
};
module.exports = router;