require("dotenv").config()

const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const authRoutes = require("./routes/auth");
const session = require('express-session');
const passport = require("passport");

require("./passport")


const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'key1',
    resave: false,
    saveUninitialized: false,
    // cookie : {
    //     secure : false,
    //     maxAge : 24*60*60*1000
    // }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin : "http://localhost:3000",
        methods : "GET,PUT,POST,DELETE",
        credentials : true,
    })
)

app.use('/', authRoutes);
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: 'http://localhost:3000/home',
        failureRedirect: '/login/failed'
    })
);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
