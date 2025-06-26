const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching posts" });
  }
});
router.post("/addPost", async (req, res) => {
  const { user, text, name, avatar } = req.body;

  if (!user || !text) {
    return res.status(400).json({ error: "User and text are required" });
  }

  try {
    const newPost = new Post({ user, text, name, avatar });
    const post = await newPost.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;
