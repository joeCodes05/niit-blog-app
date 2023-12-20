const db = require('../../config/db');
const jwt = require('jsonwebtoken');

const getComments = (req, res) => {
  const postId = req.params.id;
  db.query("SELECT posts.post_id, posts.user_id, `comment_content`, comments.email, `profile_image`, `full_name`, `comment_id`, comments.created_at, comments.updated_at FROM comments JOIN posts ON posts.post_id = comments.post_id WHERE comments.post_id = ?", [postId], (err, data) => {
    if (err) return res.status(500).json({
      error: true,
      message: "Something went wrong, please try again!",
      errorMessage: err
    });

    return res.status(200).json({
      error: false,
      commentData: data
    })
  });
}

const addComment = (req, res) => {
  const token = req.cookies.user_token;
  const { commentContent, profile_image, full_name, post_id, email } = req.body;

  if (!token) return res.status(401).json({
    error: true,
    message: "No authenticated"
  });

  jwt.verify(token, process.env.MY_SECRET, (err, info) => {
    if (err) return res.status(403).json({
      error: true,
      message: "Token is not valid!",
      errorMessage: err
    });

    db.query("INSERT INTO comments (comment_content, profile_image, full_name, post_id, email, user_id) VALUES (?, ?, ?, ?, ?, ?)", [commentContent, profile_image, full_name, post_id, email, info.id], (err, data) => {
      if (err) return res.status(500).json({
        error: true,
        message: "Something went wrong, please try again!",
        errorMessage: err
      });

      return res.status(200).json({
        error: false,
        message: "Your comment has been uploaded"
      });
    });
  });
}

const deleteComment = (req, res) => {
  const token = req.cookies.user_token;

  if (!token) return res.status(401).json({
    error: true,
    message: "Not authenticated!"
  });

  jwt.verify(token, process.env.MY_SECRET, (err, info) => {
    if (err) return res.status(403).json({
      error: true,
      message: "Token is not valid",
      errorMessage: err
    });

    const commentId = req.params.id;

    db.query("DELETE FROM comments WHERE `comment_id` = ? AND `user_id` = ?", [commentId, info.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your comment!");

      return res.status(200).json("Your comment has been deleted");
    })
  })
}

module.exports = { getComments, addComment, deleteComment }