const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

router.post('/signup',[
    body('name','Enter a valid name of length 3').isLength({min: 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a strong password of minimum 8 length').isLength({min: 8})
    ], async (req, res) => {
        try{
            const {name, email, password} = req.body;
            let success = false;
            const salt = bcrypt.genSaltSync(10);
            const secPass = bcrypt.hashSync(password, salt);
            let user = await User.findOne({email});
            if(user){
                return res.status(400).json({errors: errors.array()})
            }
            user = await User.create({
                name,
                email,
                password: secPass,
            })
            const data = {
                user:{
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET, {
                expiresIn: "20d"
            });
            success = true;
            res.json({success, authToken});
        }
        catch(err){
            console.log(err.msg);
            res.status(500).send("Some error occured");
        }
        
    }
)

router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    try{
        const {email, password} = req.body;
        let success = false;
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({error: 'Please try to login with correct credentials'});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const data = {
            user:{
                id: user.id
            }
        }
        success = true;
        const authToken = jwt.sign(data, JWT_SECRET, {
            expiresIn: "20d"
        });
        res.json({success, authToken});
    }
    catch(err){
        console.log(err.msg);
        res.status(500).send("Some error occured");
    }
})

module.exports = router;