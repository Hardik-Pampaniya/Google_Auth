const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { QueryTypes } = require("sequelize");
const sequelize = require('./database')
 
passport.serializeUser((user, done) => {
    done(null, user);
});
 
passport.deserializeUser((user, done) => {
    done(null, user);
});
 
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "http://localhost:8080/google/callback",
            scope : ["email","profile"]
        },
        async (accessToken, refreshToken, profile, done) =>{
            // console.log(profile);
           
            // callback(null, profile);
            try {
                console.log(profile);
   
                let user = await sequelize.query(
                    'SELECT * FROM login WHERE googleId = :googleId',
                    {
                      replacements: { googleId: profile.id },
                      type: QueryTypes.SELECT
                    }
                );
   
                if(user.length === 0) {
                    await sequelize.query(
                        "INSERT INTO login (fname, googleId, email) VALUES (?, ?, ?)",
                        {
                            replacements: [profile.displayName, profile.id, profile.emails[0].value],
                            type: QueryTypes.INSERT
                        }
                    );
                    console.log("User added successfully");
                } else {
                    console.log("User already exists");
                }
   
                return done(null, profile);
            } catch (error) {
                console.error(error);
            }
        }
    ));
 
module.exports = passport;
 