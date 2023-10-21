const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

//next=>continue with next route
const auth = async (req, res, next) => {

    try {
        const token = req.header('Authorization');
        if (!token) return res.status(401).json({ message: "No auth token, access denied" });

        const verified = jwt.verify(token, 'passwordKey');
        if (!verified) return res.status(401).json({ message: "Token verification failed, authorization denied" });

        //saving token and user so that we can use this in other place

        req.user = verified._id;
        req.token = token;
        //if everything is OK , then move to next event
        next();

    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
}

module.exports = auth;