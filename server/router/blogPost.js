const express = require("express");
const router = express.Router();
const Blog = require("../DataBase/blogSchema");

// ********************** POST *************************************
router.post("/posts", async (req, res) => {
  try {
    const { title, content } = req.body;
    const id = Math.floor(Math.random() * 9000000000000000) + 1000000000000000; // Generate a random ID

    const blog = new Blog({
      id,
      title,
      content,
    });

    await blog.save();
    res.status(201).json();
  } catch (err) {
    res.json(err);
  }
});

// *************************** Find all posts in the database ****************************************
router.get('/posts', async (req, res) => {
    try {
      // Find all posts in the database
      const posts = await Blog.find({});
      res.send({ success: true, data: posts });
    } catch (err) {
      console.log(err);
      res.status(500).send({ success: false, message: 'Error getting posts' });
    }
  });

// ******************************** GET specific POSTS ************************************************
router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Blog.findOne({ id: req.params.id });
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "post not found" });
    }
  } catch (err) {
    res.json(err);
  }
});


// **************************** Update **********************************************************
router.put('/posts/:id', async (req, res) => {
    try {
      const postId = req.params.id;
      const { title, content } = req.body;
        
      const post = await Blog.findOne({id:postId});
      // Find the post by ID and update its title and content
      if (post) {
        post.title = req.body.title || post.title;
        post.content = req.body.content || post.content;
        
        const updatedPost = await post.save();
        res.send({ success: true, data: updatedPost });
      } else {
        res.status(404).send({ success: false, message: 'Post not found' });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ success: false, message: 'Error updating post' });
    }
  });


// ************************ DELETE POST *******************************************
router.delete('/posts/:id', async (req, res) => {
    try {
      const postId = req.params.id;
      // Find the post by email in the database
      const post = await Blog.deleteOne({ id: postId });
    res.send(200).status({message:"delete successfuly"})
    } catch (err) {
      console.log(err);
      res.status(500).send({ success: false, message: 'Error deleting post' });
    }
  });
 

module.exports = router;
