const mongoose = require("mongoose");
const Post = require("../models/post.model");

exports.createPost = async (req, res) => {
  const post = req.body;

  if (!post.title || !post.content || !post.author) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  try {
    const newPost = new Post(req.body);
    const postSaved = await newPost.save();

    res.status(201).json({
      success: true,
      message: "Le post a été creér avec succées",
      data: postSaved,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
      error,
    });
  }
};

exports.getPosts = async (_, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({
      message: "Get all",
      data: posts,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

exports.getPost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid post id",
    });
  }

  try {
    const post = await Post.findById(id);
    if (post === null) {
      res.status(404).json({
        message: "Not found",
      });
    } else {
      res.status(200).json({
        message: "Posts",
        data: post,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid post id",
    });
  }

  try {
    const update = req.body;
    const doc = await Post.findByIdAndUpdate(id, update);
    await doc.save();
    return res.status(200).json({
      success: true,
      message: "Updated",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Invalid post id",
    });
  }

  try {
    const d = await Post.findByIdAndDelete(id);
    if (d === null) {
      return res.status(404).json({
        success: false,
        message: "Not found",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Deleted",
        data: d,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
};
