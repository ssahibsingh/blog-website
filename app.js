const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
require('dotenv').config()


mongoose.connect(process.env.MONGODB_URI);

const homeContent = "This is Blog Website in which you can compose new Blog Posts by writing '/compose' after the current URL and you will see your composed post on the Home Page itself.";
const aboutContent = "This Blog Website is created with the help of Node.js and Database MongoDB. Other Technologies used are: Expressjs, EJS and Mongoose.";
const contactContent = ""

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  }
})

const Post = mongoose.model('Post', postSchema);

app.get("/", function (req, res) {

  Post.find({}, function (err, result) {
    if (!err) {
      res.render('home', { startingContent: homeContent, posts: result });
    }
  })
});

app.get("/about", function (req, res) {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactContent: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  async function postInsert() {
    Post.insertMany(post, (err, result) => {
      if (!err) {
        console.log("Successfully Composed New Post");
      }
    })
  }
  postInsert().then(res.redirect("/"));
});

app.get("/delete", function (req, res) {

  Post.find({}, function (err, result) {
    if (!err) {
      res.render('delete', { posts: result });
    }
  })
})

app.post('/delete', (req, res) => {
  const deletePostId = req.body.deleteButton;

  async function postDelete() {
    Post.deleteMany({ _id: deletePostId }, (err, result) => {
      if (!err) {
        console.log("Successfully Deleted Post " + deletePostId);
        console.log(result);
      }
      else {
        console.log(err);
      }
    })
  }
  postDelete().then(res.redirect("/delete"));

})
app.get("/favicon.ico", (req, res) => { });

app.get("/posts/:postId", function (req, res) {
  const requestedId = req.params.postId;

  Post.findOne({ _id: requestedId }, (err, result) => {
    if (!err) {
      res.render("post", { title: result.title, content: result.content });
    }
    else {

    }
  })
});


app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
