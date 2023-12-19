const db = require("../../config/db");
const jwt = require('jsonwebtoken');

const getPosts = (req, res) => {
  const query = req.query.topic ? "SELECT `full_name`, `email`, `title`, `post_id`, `content`, `cover_image`, `profile_image`, `category`, posts.created_at FROM posts JOIN users ON users.user_id = posts.user_id WHERE category=?" : "SELECT `full_name`, `email`, users.user_id, `title`, `post_id`, `content`, `cover_image`, `profile_image`, `category`, posts.created_at FROM posts JOIN users ON users.user_id = posts.user_id";
  const topic = req.query.topic;

  db.query(query, [topic], (err, data) => {
    if (err) return res.status(500).json({
      error: true,
      message: "Somethin went wrong"
    });
    
    return (
      res.status(200).json({
        error: false,
        data
      })
    )
  });
}

const getSinglePost = (req, res) => {
  const postId = req.params.id;
  db.query("SELECT `full_name`, `post_id`, users.user_id, `email`, `title`, `content`, `cover_image`, `post_id`, `profile_image`, `category`, posts.created_at FROM users JOIN posts ON users.user_id = posts.user_id WHERE posts.post_id = ?", [postId], (err, data) => {
    if (err) {
      console.log(err)
      return res.status(500).json({
        error: true,
        message: "Something went wrong, please try again"
      })
    }

    return res.status(200).json({
      error: false,
      data: data[0]
    });
  })
}

const addPost = (req, res) => {
  const token = req.cookies.user_token
  const { title, content, cover_image, category } = req.body;

  if(!token) {
    return res.status(401).json({
      error: true,
      message: "Not authenticated!"
    })
  }

  jwt.verify(token, process.env.MY_SECRET, (err, info) => {
    if (err) {
      return res.status(403).json({
        error: true,
        message: "Tokis is not valid!",
        err
      })
    }

    db.query("INSERT INTO posts (title, content, cover_image, category, user_id) VALUES (?, ?, ?, ?, ?)", [title, content, cover_image, category, info.id], (err, data) => {
      if (err) {
        return res.status(500).json({
          error: false,
          message: "Something went wrong, please try again!",
          err
        })
      }

      return res.status(200).json({
        error: false,
        message: "Your post has been uploaded"
      });
    })
  })
}

const deletePost = (req, res) => {
  const token = req.cookies.user_token;

  if (!token) {
    return res.status(401).json({
      error: false,
      message: "Not authenticated!"
    })
  }

  jwt.verify(token, process.env.MY_SECRET, (err, info) => {
    if (err) {
      return res.status(403).json({
        error: true,
        message: "Tokis is not valid!",
        err
      })
    }

    const postId = req.params.id;

    db.query("DELETE FROM posts WHERE `post_id` = ? AND `user_id` = ?", [postId, info.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");

      return res.json("Post has been deleted!");
    })
  })
}

const editPost = (req, res) => {
  const token = req.cookies.user_token;
  const { title, content, cover_image, category } = req.body;
  const postId = req.params.id;

  if (!token) {
    return res.status(401).json({
      error: true,
      message: "Not authenticated!"
    })
  }

  jwt.verify(token, process.env.MY_SECRET, (err, info) => {
    db.query("UPDATE posts SET `title`=?, `content`=?, `cover_image`=?, `category`=? WHERE `post_id`=? AND `user_id`=?", [title, content, cover_image, category, postId, info.id], (err, data) => {
      if (err) {
        return res.status(500).json({
          error: true,
          message: "Something went wrong, please try again later!",
          errorMessage: err
        })
      }

      return res.status(200).json({
        error: false,
        message: "Your post has been uploaded"
      })
    })
  })
}

module.exports = {getPosts, getSinglePost, addPost, deletePost, editPost};