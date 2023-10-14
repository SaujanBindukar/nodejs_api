const express = require('express');
//importng user from userModel
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const bcryptjs = require('bcryptjs');

const authRouter = express.Router();

authRouter.post('/api/signup', async (req, res) => {

    try {
        ///accesing the request body send from the client
        const { name, email, password, address } = req.body;

        //find existing user if available
        const existingUser = await User.findOne({ email });

        //doesnot return bool but return object 
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }
        //salt is random string 
        const hashPassword = await bcryptjs.hash(password, 8);

        ///creating user with new keyword
        //can use let or var 
        let user = new User({
            email,
            name,
            password: hashPassword,
            address,
        });

        user = await user.save();
        res.json(user);

    } catch (e) {
        return res.status(500).json({ error: e.message })
    }


    //String is object in JS

    //get data from client 
    //save to database
    // return response to client

});




module.exports = authRouter;
