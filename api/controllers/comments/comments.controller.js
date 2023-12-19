const db = require('../../config/db');
const jwt = require('jsonwebtoken');

const getComments = (req, res) => {
  db.query("SELECT * from comments JOIN posts ON posts.post_id = comments.post_id", [], (err, data) => {
    if (err) return res.status(500).json({
      error: true,
      message: "Something went wrong, please try again!"
    });

    return res.status(200).json({
      error: false,
      commentData: data
    })
  });
}

const addComment = (req, res) => {
  const token = req.cookies.user_token;
  const { commentContent, comment_image, post_id } = req.body;

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

    db.query("INSERT INTO comments (comment_content, comment_image, post_id, user_id) VALUES (?, ?, ?, ?)", [commentContent, comment_image, post_id, info.id], (err, data) => {
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

module.exports = { getComments, addComment }