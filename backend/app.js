const express = require('express');
const bodyParser = require('body-parser');
const app = express();

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

app.post("/api/posts",(req, res, next) => {
    const post = req.body;
    console.log(post)
    res.status(201).json({
        message: "post added successfully"
    });
});




app.get('/api/posts',(req, res, next) => {
    // res.send('hello from express');
    const posts = [
        {
            id: '28u23',
            title: 'first server side post',
            content: " this is server running"
        },
        {
            id: '93i845',
            title: ' second server side post',
            content: " this is server running"
        }
    ];
    return res.status(200).json({
        message:'post fetched successfully ',
        posts: posts
    });
});

module.exports = app;