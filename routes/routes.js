const router = require("express").Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/googleModel");

const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};

// FRONTEND REDIRECTION API
router.get("/login/success", isLoggedIn, async (req, res) => {
  try {
    res.send(req.user);
    console.log(req.user);
    // res.send("login suceesfull with cookie and session");
    // console.log("login suceesfull with cookie and session");
  } catch (error) {
    res.send(error.message);
    console.log(error);
  }
});

router.get("/login", async (req, res) => {
  try {
    console.log("please login");
    res.send("please login");
  } catch (error) {
    res.send(error.message);
    console.log(error);
  }
});

router.get("/", (req, res) => {
  res.send("Hello World!");
});

// Google
router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/login/success");
  }
);

router.get("/linkedin", passport.authenticate("linkedin"));

router.get(
  "/linkedin/callback",
  passport.authenticate("linkedin", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/login/success");
  }
);

// Facebook
// https://developers.facebook.com/docs/facebook-login/permissions/overview
// YOU MUST SETUP YOUR OWN DOMAIN FOR USING THIS FEATURE

router.get("/facebook", passport.authenticate("facebook"));
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/login/success");
  }
);

router.get("/twitter", passport.authenticate("twitter"));

router.get(
  "/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/login/success");
  }
);

// MICROSOFT
router.get(
  "/microsoft",
  passport.authenticate("microsoft", { scope: ["user.read"] })
);

router.get(
  "/microsoft/callback",
  passport.authenticate("microsoft", { failureRedirect: "/login" }),
  function (req, res) {
    res.redirect("/login/success");
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  // res.redirect(process.env.CLIENT_URL);
});

// database query
// GOOGLE
router.get("/getg", async (req, res) => {
  try {
    const x = await User.find();
    res.send(x);
    console.log(x);
  } catch (error) {
    res.send(error.message);
    console.log(error);
  }
});

router.delete("/getg", async (req, res) => {
  try {
    const x = await User.remove();
    res.send("deleted");
    console.log("deleted");
  } catch (error) {
    res.send(error.message);
    console.log(error);
  }
});

// local
// router.get("/getll", async(req, res) => {
//     try {
//         const x = await localdbs.find();
//         res.send(x);
//         console.log(x);
//     } catch (error) {
//         res.send(error.message);
//         console.log(error);
//     }
// });

// router.post("/getll", async(req, res) => {
//     try {
//         const user = await localdbs.findOne({ email: req.body.email });

//         if (user) res.status(400).send("User already exists");
//         const hashedPassword = await bcrypt.hash(req.body.password, 10);
//         const userr = new localdbs({
//             firstName: req.body.firstName,
//             email: req.body.email,
//             password: hashedPassword,
//             lastName: req.body.lastName,
//         });
//         const data = await localdbs.insertMany(userr);
//         res.send("user added successful");
//         console.log("user added successful");
//     } catch (error) {
//         res.send(error.message);
//         console.log(error);
//     }
// });

// router.get("/protected", (req, res) => {
//     if (req.isAuthenticated()) {
//         res.send("Protected");
//     } else {
//         res.status(401).send({ msg: "Unauthorized" });
//     }
//     console.log(req.session);
//     console.log(req.user);
// });

// router.delete("/getll", async(req, res) => {
//     try {
//         const x = await localdbs.remove();
//         res.send("deleted");
//         console.log("deleted");
//     } catch (error) {
//         res.send(error.message);
//         console.log(error);
//     }
// });

// LOCAL STARTEGY ROUTES

router.get("/logout", (req, res) => {
  req.logout();
  res.send("logged out");
});
// router.post("/register", async(req, res) => {
//     const user = await User.findOne({ emaill: req.body.emaill });

//     if (user) {
//         res.status(400).send("User already exists");
//     } else {
//         const x = new User({
//             firstname: req.body.firstname,
//             lastname: req.body.lastname,
//             emaill: req.body.emaill,
//             password: req.body.password,
//             source: "local",
//         });
//         const newUser = await User.insertMany(x);
//         res.status(201).send("user created");
//     }
// });

//
router.post("/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({ emaill: req.body.email });

    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      emaill: req.body.email,
      password: req.body.password,
      source: "local",
    });
    await User.insertMany(newUser);
    // await newUser.save();
    console.log("User saved");
    res.status(201).send("User created");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Internal Server Error");
  }
});

// EDITED
router.post(
  "/local",
  passport.authenticate("local", {
    session: true,
    successRedirect: "/login/success",
    failureRedirect: "/login",
  })
);
module.exports = router;
