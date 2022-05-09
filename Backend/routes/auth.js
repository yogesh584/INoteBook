// IMPORTS
const express = require("express");
const router = express.Router();
const userModel = require('../models/User');
const {body, validationResult} = require ("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
require("dotenv").config();

// ROUTES
// CREATING A USER
router.post('/',[
    body('name',"Name must be at least three Characters").isLength({min: 3}),
    body('email',"Please Enter a valid Email").isEmail(),
    body('password',"Password must be at least five Characters").isLength({min: 5})
],async (req,res)=>{
    //  CHECKING ERRORS
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    try {
        const UserData = req.body;
    
        // CHECKING USER EXISTINCE (BY EMAIL)
        let user = await userModel.findOne({"email":UserData.email});
        if(user){
            return res.status(400).json({error : "User with This email already Exist!"})
        }

        // GENRATING SECURE HASH
        const salt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(UserData.password,salt);

        // CREATING NEW USER
        user = await userModel.create({
            name: UserData.name,
            email: UserData.email,
            password: securePassword
        });

        // CREATING JSONWEBTOKEN
        const userData = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(userData,process.env.JWT_SECRET);
        res.json({authToken: authToken});


    } catch (error) {
        console.error(error);
        res.send("Some Error Occured!");
    }
});


// LOGIN A USER OR AUTHENTICATING USER
router.post("/login",[
    body('email',"Please Enter a valid Email").isEmail(),
    body('password',"Password must be at least five Characters").isLength({min: 5})
],async (req,res)=>{
    //  CHECKING ERRORS
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    try {
        const {email, password} = req.body;
        let user = await userModel.findOne({email: email});

        if(!user){
            return res.status(400).json({error: "Please Enter a valid email or password"});
        }

        const isPasswordCompared = await bcrypt.compare(password,user.password);
        if(!isPasswordCompared){
            return res.status(400).json({error: "Please Enter a valid email or password"});
        }

        // CREATING JSONWEBTOKEN
        const userData = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(userData,process.env.JWT_SECRET);
        res.json({authToken: authToken});
        
    } catch (error) {
        console.error(error);
        res.send("Some Error Occured!");
    }
});

router.post("/getuser",fetchuser,async (req,res)=>{
    try {
        userid = req.user.id;
        const user = await userModel.findById(userid).select("-password");
        res.send(user);

    } catch (error) {
        console.error(error);
        res.send("Some Error Occured!");
    }
});

module.exports = router;

// Temparary Login Crediantials
// email : HarryBhai
// password : steavekapassword