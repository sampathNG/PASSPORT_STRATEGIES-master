const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const MicrosoftStrategy = require("passport-microsoft").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const LinkedinStrategy = require("passport-linkedin-oauth2").Strategy;
const passport = require("passport");
const mongoose = require("mongoose");

const { v4: uuidv4 } = require("uuid");
require("dotenv").config({ path: require("find-config")(".env") });
const User = require("../models/googleModel");
const api_key = "pEGS1b8hdsCSoEKIypon8grLr";
const api_key_secret = "cQVFjJBBoobrHCSQOI4QPZoSq0MSWTD04LreRVbzDbQWxFsjFA";

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

// https://console.cloud.google.com/apis/credentials/oauthclient/
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/google/callback",
      // callbackURL: "/auth/google/callback", // Set at Authorized redirect URIs
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, done) {
      // if (profile.id.match(/^[0-9a-fA-F]{24}$/)) {
      // Yes, it's a valid ObjectId, proceed with `findById` call.
      // if (!mongoose.Types.ObjectId.isValid(profile.id)) return false;
      User.findOne({ Id: profile.id }, (err, user) => {
        // if (mongoose.Types.ObjectId.isValid(profile.id)) {
        // User.findById(profile.id.trim(), (err, user) => {
        if (err) {
          console.log(err);
          return done(err, user);
        } else if (user) {
          return done(null, user);
        } else {
          const newUser = new User();
          newUser.email = profile._json.email;
          newUser.Id = profile.id;
          newUser.source = profile.provider;
          newUser.username = uuidv4().toString();
          newUser.fullname = profile._json.name;
          newUser.photoUrl = profile._json.picture;

          newUser.save((error) => {
            if (error) {
              return done(error, null);
            } else {
              return done(null, newUser);
            }
          });
        }
        // }
      });
    }

    // else {
    //     console.log("not valid id");
    // }
    // }
  )
);

// FACEBOOK
passport.use(
  new FacebookStrategy(
    {
      clientID: "643417163978129",
      clientSecret: "4dcf9bb37fd6e9c62f1dead45cd3a373",
      callbackURL: "http://localhost:3000/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email", "name"],
    },
    function (accessToken, refreshToken, profile, done) {
      // if (profile.id.match(/^[0-9a-fA-F]{24}$/)) {
      // Yes, it's a valid ObjectId, proceed with `findById` call.
      // if (!mongoose.Types.ObjectId.isValid(profile.id)) return false;
      User.findOne({ Id: profile.id }, (err, user) => {
        // if (mongoose.Types.ObjectId.isValid(profile.id)) {
        // User.findById(profile.id.trim(), (err, user) => {
        if (err) {
          console.log(err);
          return done(err, user);
        } else if (user) {
          return done(null, user);
        } else {
          const newUser = new User();
          newUser.Id = profile.id;
          newUser.source = profile.provider;
          newUser.username = uuidv4().toString();
          newUser.fullname = profile.displayName;
          newUser.photoUrl = profile.photos[0].value;

          newUser.save((error) => {
            if (error) {
              return done(error, null);
            } else {
              return done(null, newUser);
            }
          });
        }
        // }
      });
    }
  )
);
// TWITTER

passport.use(
  new TwitterStrategy(
    {
      consumerKey: api_key,
      consumerSecret: api_key_secret,
      callbackURL: "http://localhost:3000/twitter/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // if (profile.id.match(/^[0-9a-fA-F]{24}$/)) {
      // Yes, it's a valid ObjectId, proceed with `findById` call.
      // if (!mongoose.Types.ObjectId.isValid(profile.id)) return false;
      User.findOne({ Id: profile.id }, (err, user) => {
        // if (mongoose.Types.ObjectId.isValid(profile.id)) {
        // User.findById(profile.id.trim(), (err, user) => {
        if (err) {
          console.log(err);
          return done(err, user);
        } else if (user) {
          return done(null, user);
        } else {
          const newUser = new User();
          newUser.Id = profile._json.id_str;
          newUser.username = uuidv4().toString();
          newUser.source = profile.provider;
          newUser.fullname = profile._json.name;
          newUser.screenName = profile._json.screen_name;
          newUser.photoUrl = profile.photos[0].value;
          newUser.location = profile._json.location;

          newUser.save((error) => {
            if (error) {
              return done(error, null);
            } else {
              return done(null, newUser);
            }
          });
        }
        // }
      });
    }
  )
);

// LINKEDIN

passport.use(
  new LinkedinStrategy(
    {
      clientID: "8649epcn0kqhhr",
      clientSecret: "Bn6CdbXFV2Wz6Qw7",
      callbackURL: "http://localhost:3000/linkedin/callback",
      scope: ["r_liteprofile", "r_emailaddress"],
    },
    function (accessToken, refreshToken, profile, done) {
      // if (profile.id.match(/^[0-9a-fA-F]{24}$/)) {
      // Yes, it's a valid ObjectId, proceed with `findById` call.
      // if (!mongoose.Types.ObjectId.isValid(profile.id)) return false;
      User.findOne({ Id: profile.id }, (err, user) => {
        // if (mongoose.Types.ObjectId.isValid(profile.id)) {
        // User.findById(profile.id.trim(), (err, user) => {
        if (err) {
          console.log(err);
          return done(err, user);
        } else if (user) {
          return done(null, user);
        } else {
          const newUser = new User();

          newUser.email = profile.emails[0].value;
          newUser.Id = profile.id;
          newUser.source = profile.provider;
          newUser.username = uuidv4().toString();
          newUser.fullname = profile.displayName;
          newUser.photoUrl = profile.photos[0].value;

          newUser.save((error) => {
            if (error) {
              return done(error, null);
            } else {
              return done(null, newUser);
            }
          });
        }
        // }
      });
    }
  )
);

// MICROSOFT

passport.use(
  new MicrosoftStrategy(
    {
      clientID: "afa7d496-3033-4f87-b064-9c631f482711",
      clientSecret: "jrW8Q~twUofd3v5IN68Yvn.-VL3HcXDlsmBwbcDM",
      callbackURL: "http://localhost:3000/microsoft/callback",
      scope: ["user.read"],
    },
    function (accessToken, refreshToken, profile, done) {
      // if (profile.id.match(/^[0-9a-fA-F]{24}$/)) {
      // Yes, it's a valid ObjectId, proceed with `findById` call.
      // if (!mongoose.Types.ObjectId.isValid(profile.id)) return false;
      User.findOne({ Id: profile.id }, (err, user) => {
        // if (mongoose.Types.ObjectId.isValid(profile.id)) {
        // User.findById(profile.id.trim(), (err, user) => {
        if (err) {
          console.log(err);
          return done(err, user);
        } else if (user) {
          return done(null, user);
        } else {
          const newUser = new User();

          newUser.email = profile._json.userPrincipalName;
          newUser.Id = profile.id;
          newUser.source = profile.provider;
          newUser.username = uuidv4().toString();
          newUser.fullname = profile.displayName;
          newUser.businessPhones = profile._json.businessPhones[0];
          newUser.jobTitle = profile._json.jobTitle;
          newUser.mobilePhone = profile._json.mobilePhone;
          newUser.officeLocation = profile._json.officeLocation;
          newUser.preferredLanguage = profile._json.preferredLanguage;

          newUser.save((error) => {
            if (error) {
              return done(error, null);
            } else {
              return done(null, newUser);
            }
          });
        }
        // }
      });
    }
  )
);

// LOCAL STARTEGY

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      User.findOne({ emailL: email }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect email or password." });
        }
        // if (!user.validPassword(password)) {
        //   return done(null, false, { message: "Incorrect email or password." });
        // }
        return done(null, user);
      });
    }
  )
);
