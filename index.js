let express = require("express");
let app = express();
let mongoose = require("mongoose");
let fawn = require("fawn");
fawn.init(mongoose);
let config = require("config");
let user = require("./routes/user");
let genre = require("./routes/movie/genre");
let movie = require("./routes/movie/movie");
let stockmovie = require("./routes/transaction/movie");
let stockuser = require("./routes/transaction/user");
let usermoviestock = require("./routes/transaction/usermovie");
let auth = require("./routes/auth/auth");
let mailer = require("./routes/mailer");
let forgotpassword = require("./routes/forgot.password");
let pagination = require("./routes/pagination");
let port = process.env.PORT || 4600;
let file = require("./routes/fileupload");
app.use(express.json());
app.use("/uploads", express.static("uploads"));
if (!config.get("apitoken")) {
    process.exit(1);
}
mongoose
    .connect("mongodb://localhost/UDH", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`connected to db`))
    .catch(error => console.log(`something went wrong ${error.message}`));

// mongoose
//     .connect("mongodb+srv://vips120:<Password>@cluster0-hkseo.mongodb.net/UDH?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log(`connected to db`))
//     .catch(error => console.log(`something went wrong ${error.message}`));


app.listen(port, () => console.log(`connected to port`));

app.use("/api", user);
app.use("/api", genre);
app.use("/api", movie);
app.use("/api/userlogin", auth);
app.use("/api/stocks", stockmovie);
app.use("/api/stocks", stockuser);
app.use("/api/stocks", usermoviestock);
app.use("/api", mailer);
app.use("/api", forgotpassword);
app.use("/api", pagination);
app.use("/fileupload", file);