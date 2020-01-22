let express = require("express");
let router = express.Router();
let Joi = require("@hapi/joi");
let fawn = require("fawn");
let usermovie = require("../../dbModel/transaction/usermovie");
let user = require("../../dbModel/transaction/user");
let movie = require("../../dbModel/transaction/movie");
router.post("/usermovie", async (req, res) => {
    let { error } = Usermovievalidation(req.body);
    if (error) { return res.send(error.details[0].message) };
    let userstocks = await user.userModel.findById(req.body.userid);
    if (!userstocks) { return res.status(403).send({ message: "invalid user id" }) };
    let moviestocks = await movie.movieModel.findById(req.body.movieid);
    if (!moviestocks) { return res.status(403).send({ message: "invalid movie id" }) };
    if (moviestocks.stocks === 0) { return res.status(404).send({ message: "out of stocks" }) };
    let data = new usermovie({
        userId: {
            firstname: userstocks.firstname,
            lastname: userstocks.lastname,
            emailid: userstocks.emailid
        },
        movieId: {
            name: moviestocks.name,
            actor: moviestocks.actor,
            price: moviestocks.price
        }
    });
    try {
    
        fawn
            .Task()
            .save("usermoviestocks", data)
            .update("moviestocks", { _id: moviestocks._id }, {
                $inc: {
                    stocks: -1
                }
            }).run();
        res.send(data);

    }
    catch (ex) { res.send(ex.message);}
    // let item = await data.save();
    // moviestocks.stocks--;
    // //network error
    // await moviestocks.save();
    // res.send(item);
});

function Usermovievalidation(error) {
    let Schema = Joi.object({
        userid: Joi.string().required(),
        movieid: Joi.string().required()
    });
    return Schema.validate(error);
};


module.exports = router;