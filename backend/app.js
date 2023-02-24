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

    post.save().then(result =>{
        // console.log(result)

        res.status(201).json({
            message: "post added successfully", 
            postId: result._id
        });
    });
    console.log(post)
    
});

app.put("/api/posts/:id", (req, res, next) =>{
    const post = new Post({
        _id:req.body.id,
        title:req.body.title,
        content:req.body.content
    });
    Post.updateOne({
        _id:req.params.id
    }, post).then(result =>{
        console.log(result);
        res.status(200).json({
            message:"update successful!"
        })
    })
})




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


app.delete("/api/posts/:id", (req, res, next) =>{
    // console.log (req.params.id);

    Post.deleteOne({
        _id:req.params.id
    })
    .then(result =>{
        console.log(result)
        res.status(201).json({message:"post deleted"})
    }) 
})

module.exports = app;