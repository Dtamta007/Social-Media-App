// Libraries required
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const dotenv = require('dotenv');
const morgan= require('morgan');
const multer = require('multer');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const bodyparser = require('body-parser');

// ROUTER FILES
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postsRoute = require('./routes/posts');

//meta data
const app = express();
const PORT = 8800;
dotenv.config();
require('./passportConfig')(passport);

//CONNECTING TO DATABASE
mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("Connected to Database!");
    }).catch((err)=>{
        console.log(err);
    });
app.use("/images", express.static(path.join(__dirname, "public/images")));

//MIDDLEWARES
app.use(express.json());
app.use(bodyparser.json());
app.use(helmet());
app.use(morgan("common"));
app.use(session({
    secret : "This is a secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null, "public/images");
    },
    filename: (req,file,cb) =>{
        cb(null, req.body.name );
    }
});

const upload = multer({ storage:storage });

app.post("/api/upload", upload.single("file"), (req,res)=>{
    try{ 
        console.log(req.file);
        return res.status(200).json("File uploaded!");
    }catch(err){
        console.log(err);
    }
})

// Routers
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postsRoute);

app.get("/", (req,res)=>{
    res.send("Welcome to homepage");
});

app.get("/users", (req,res)=>{
    res.send("Welcome to Users");
});

// app.post("/logout", (req,res)=>{
//     req.logout();
//     res.redirect('/login');
// })

app.listen(PORT, ()=>{
    console.log("Server listening on port "+ PORT);
})