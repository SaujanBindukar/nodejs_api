//import express
const express = require('express');
const mongoose = require('mongoose');

const authRouter = require('./routes/auth');

const mongodbUrl = 'mongodb+srv://sauzanbindukar:saujan123@cluster0.p5qrvfp.mongodb.net/?retryWrites=true&w=majority';

//init
const PORT = 3000;
//saving express object in a variable
const app = express();

//middleware
//parse incomming request with json payload
app.use(express.json());
app.use(authRouter);


//connect mongoose
mongoose.connect(mongodbUrl).then(() => {
    console.log("Database connected");
}).catch((e) => {
    console.log(e);
});

//creating an api
app.listen(PORT, () => {
    console.log('connected at port ' + PORT);
});
