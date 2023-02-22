const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose')

const Post = require('./models/post')

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

app.post("/api/posts",(req, res, next) => {
    const post = new Post({
        title:req.body.title,
        content:req.body.content
    });

    post.save();
    console.log(post)
    res.status(201).json({
        message: "post added successfully"
    });
});




app.get('/api/posts',(req, res, next) => {
   Post.find()
    .then(documents =>{
        console.log(documents);
        res.status(200).json({
            message:'post fetched successfully ',
            posts: documents
        });
    })
    .catch(() =>{
        console.log('Error occurred while fetching document')
    })
});

module.exports = app;