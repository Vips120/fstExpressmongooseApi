let express = require("express");
let app = express();
let mongoose = require("mongoose");
let fawn = require("fawn");
fawn.init(mongoose);
let user = require("./routes/user");
let genre = require("./routes/movie/genre");
let movie = require("./routes/movie/movie");
let stockmovie = require("./routes/transaction/movie");
let stockuser = require("./routes/transaction/user");
let usermoviestock = require("./routes/transaction/usermovie");
let port = process.env.PORT || 4600;
app.use(express.json());
mongoose
    .connect("mongodb://localhost/UDH", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`connected to db`))
    .catch(error => console.log(`something went wrong ${error.message}`));
app.listen(port, () => console.log(`connected to port`));

app.use("/api", user);
app.use("/api", genre);
app.use("/api", movie);
app.use("/api/stocks", stockmovie);
app.use("/api/stocks", stockuser);
app.use("/api/stocks", usermoviestock);