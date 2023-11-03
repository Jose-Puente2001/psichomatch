var passport = require('passport')
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


// Emails Allows
const emails = ["kevinreyes005@gmail.com","zeduard89@gmail.com"]
require("dotenv").config();
const { GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET} = process.env;
passport.use("auth-google",
    new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "https://psicomatchapi.onrender.com/auth/google",
},

function(accessToken, refreshToken, profile, done){
    //Update emails to DB -FIX IT-
   const response = emails.includes(profile.emails[0].value)
    if(response){
        done(null,profile);
    } else{
        emails.push(profile.emails[0].value);
        done(null,profile)
    }
   
}

))