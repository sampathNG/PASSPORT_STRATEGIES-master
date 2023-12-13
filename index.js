require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const passport = require("passport");

const session = require("express-session");
const connection = require("./models/config");
connection();

const MongoStore = require("connect-mongo");

app.use(
  require("express-session")({
    secret: "This is a secret",
    cookie: {
      maxAge: 100 * 60 * 60 * 24,
      secure: false,
    },

    // store: MongoStore.create({
    //     mongoUrl: "mongodb+srv://kumar:passwords@cluster0.gunh9to.mongodb.net/?retryWrites=true&w=majority",
    // }),
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// app.get("/", function(req, res) {
//     res.send("Hello " + JSON.stringify(req.session));
// });

const passportStrategy = require("./strategy/passport");

const authRoute = require("./routes/routes");
app.use("/", authRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
