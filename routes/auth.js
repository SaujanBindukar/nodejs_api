const express = require('express');
//importng user from userModel
const User = require('../models/user');

const authRouter = express.Router();

authRouter.post('/api/signup', async (req, res) => {

    try {
        ///accesing the request body send from the client
        const { name, email, password } = req.body;

        //find existing user if available
        const existingUser = await User.findOne({ email });

        //doesnot return bool but return object 
        if (existingUser) {
            return res.status().json({ message: 'User with this email already exists' });
        }

        ///creating user with new keyword
        //can use let or var 
        let user = new User({
            email,
            name,
            password,
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
