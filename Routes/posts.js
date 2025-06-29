const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const protected = require("../middleware/middleware");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching posts" });
  }
});
router.post("/addPost",protected, async (req, res) => {
  const user = req.user.id;
  const { text, name, avatar } = req.body;

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
router.put("/like/:id", protected, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    if (
      post.likes.some(
        (like) => like.user && like.user.toString() === req.user.id
      )
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.put("/unlike/:id", protected, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    if (!post.likes.some((like) =>like.user && like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: "Post has not yet been liked" });
    }
    post.likes = post.likes.filter(
      ({ user }) => user.toString() !== req.user.id
    );
    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
router.delete("/delete/:id", protected, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    await post.deleteOne();
    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
