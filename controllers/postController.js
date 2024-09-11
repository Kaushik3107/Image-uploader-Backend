const Post = require('../models/postModel');

exports.addPost = async (req, res) => {
  try {
    const imageUrl = req.file.path;
    const newPost = new Post({ imageUrl });
    await newPost.save();
    res.json(newPost);
  } catch (error) {
    res.status(400).json({ message: 'Error uploading image' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching posts' });
  }
};
