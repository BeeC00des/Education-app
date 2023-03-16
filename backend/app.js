const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose')

const postRoutes = require("./routes/post");


mongoose.connect("mongodb+srv://beecoodes:beecoodes@cluster0.jwhgjnj.mongodb.net/courses-base?retryWrites=true&w=majority")
    .then(()=>{
        console.log('connected to database')
    })
    .catch(() =>{
        console.log('connection failed')
    })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:false
}))


app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader(
        'Access-Control-Allow-Headers', 
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        'Access-Control-Allow-Methods', 
        "GET, POST, PATCH, DELETE, PUT, OPTIONS"
    );
    next();
})

// beecoodes

app.use("/api/posts", postRoutes);
module.exports = app;