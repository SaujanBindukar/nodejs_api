const express = require('express');
//importng user from userModel
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = require('../middleware/auth');

const authRouter = express.Router();


authRouter.post('/api/signup', async (req, res) => {

    try {
        ///accesing the request body send from the client
        const { name, email, password, address } = req.body;

        //find existing user if available
        const existingUser = await User.findOne({ email });

        //doesnot return bool but return object 
        if (existingUser) {
            return res.status(400).json({ msg: 'User with this email already exists' });
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
        //generating the token
        const token = jwt.sign({ _id: user._id }, "passwordKey");
        return res.status(200).json({ token });
        // return res.status(200).json({ token, ...user._doc });

    } catch (e) {
        return res.status(500).json({ error: e.message })
    }


    //Working  method
    //get data from client 
    //save to database
    //return response to client

});


//signin route
authRouter.post('/api/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            //user doesnot exist
            return res.status(400).json({ msg: 'User with this email doesnot exist' });
        }
        //now compare the hash password
        //we had encrpt the password while signup, so now it needs to be decrypt
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            //user doesnot exist
            return res.status(400).json({ msg: 'Password doesnot match' });
        }
        //generating the token
        const token = jwt.sign({ _id: user._id }, "passwordKey");
        return res.status(200).json({ token });

    } catch (error) {
        return res.status(500).json({ error: e.message })

    }
});

//if the token is changed in the memory of device by the hacker
authRouter.post('/isValidToken', async (req, res) => {
    try {
        const token = req.header['Authorization']
        if (!token) return res.json(false);
        const verified = jwt.verify(token, 'passwordKey');
        if (!verified) return res.json(false);
        //what if random token is correct
        const user = await User.findById(verified.id); //using id property of verified token
        if (!user) return res.json(false);
        res.json(true);
    } catch (error) {
        res.status(500).json({ err: e.message });

    }
});


//get user data
//auth is the middle ware whch checks if the token is valid or not
authRouter.get('/api/users', auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.status(200).json({ ...user._doc, token: req.token });
});

module.exports = authRouter;
