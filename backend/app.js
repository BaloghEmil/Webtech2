const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes=require("./routes/user");
const postsRoutes=require("./routes/posts");

//const Post = require('./models/post');
const { createShorthandPropertyAssignment } = require('typescript');

const app = express();

mongoose.connect("mongodb+srv://Emil:Almafa1@cluster0.grt9h.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(()=>{
  console.log('Connected to database');
}).catch(()=>{
  console.log('Connection failed!');
});

app.use(bodyParser.json());

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader("Access-Control-Allow-Credentials", "true");
res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");
  next();
});

/*app.post("/api/posts", (req,res,next)=>{
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost=>{
    res.status(201).json({
      message: 'Post added successfully',
      postId: createdPost
    });
  });
});

app.get('/api/posts',(req, res, next)=>{
  Post.find()
  .then(documents=>{
    res.status(200).json({
      message: 'Post fetched successfully',
      posts:documents
    });
  });
  });

  app.delete("/api/posts/:id", (req, res, next)=>{
    Post.deleteOne({_id:req.params.id})
    .then(result=>{
      console.log(result);
      res.status(200).json({message: "Post deleted!"});
    });
  });
*/


  app.use("/api/posts",postsRoutes);
  app.use("/api/user",userRoutes);

module.exports = app;
