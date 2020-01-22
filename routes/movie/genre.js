let express = require("express");
let router = express.Router();
let Joi = require("@hapi/joi");
let genre = require("../../dbModel/movie/genre");
router.post("/genre", async (req, res) => {
    let { error } = GenreValidation(req.body);
    if (error) { return res.status(error.details[0].message) };
    let data = new genre.genreModel({
        name: req.body.name
    });
    let item = await data.save();
    res.send({ i: item });
});
 

function GenreValidation(error) {
    let schema = Joi.object({
        name: Joi.string().required()
    });
    return schema.validate(error);
}

module.exports = router;