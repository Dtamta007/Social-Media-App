const express = require('express');
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');
const passport = require('passport');

// REGISTER
router.post('/register', async (req,res)=>{

    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            ...req.body,
            password: hashedPassword
        });

        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json(err);
    }
});

// LOGIN

// router.post("/login", async (req,res)=>{
//     try{
//         const user = await User.findOne({username: req.body.username});
//         if(!user){
//             res.status(404).json("User not found");
//         }

//         const valid = await bcrypt.compare(req.body.password, user.password);
//         if(!valid){
//             res.status(400).json("Password is worng!")
//         }

//         res.status(200).json(user);
//     }catch{
//         res.status(500).json(err);
//     }
// })

router.post("/login", passport.authenticate('local',{
    successRedirect: "/",
    failureRedirect: "/login"
}), (req,res)=>{
    // console.log("HEEEEELLLLLLOOOOOOOO!!!!!!!!")
    res.json(user);
});

module.exports = router;