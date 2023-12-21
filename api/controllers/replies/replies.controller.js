const db = require('../../config/db');
const jwt = require('jsonwebtoken');

const getReplies = (req, res) => {
  const commentId = req.params.id;

  db.query("SELECT comments.comment_id, replies.user_id, `content`, replies.email, replies.profile_image, replies.full_name, `reply_id`, replies.created_at, replies.updated_at FROM replies JOIN comments ON comments.comment_id = replies.comment_id WHERE replies.comment_id = ?", [commentId], (err, data) => {
    if (err) return res.status(500).json({
      error: true,
      message: "Something went wrong, please try again!",
      errorMessage: err
    });

    return res.status(200).json({
      error: false,
      replyData: data
    });
  });
}

const addReply = (req, res) => {
  const token = req.cookies.user_token;
  const { content, profile_image, full_name, comment_id, email } = req.body;

  if (!token) return res.status(401).json({
    error: true,
    message: "Not authenticated!"
  });

  jwt.verify(token, process.env.MY_SECRET, (err, info) => {
    if (err) return res.status(403).json({
      error: true,
      message: "Token is not valid!",
      errorMessage: err
    });

    db.query("INSERT INTO replies (content, profile_image, full_name, comment_id, email, user_id) VALUES (?, ?, ?, ?, ?, ?)", [content, profile_image, full_name, comment_id, email, info.id], (err, data) => {
      if (err) return res.status(500).json({
        error: true,
        message: "Something went wrong, please try again!",
        errorMessage: err
      });

      return res.status(200).json({
        error: false,
        message: "Your reply has been uploaded"
      })
    })
  })
}

const deleteReplies = (req, res) => {
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

    const replyId = req.params.id;

    db.query("DELETE FROM replies WHERE `reply_id` = ? AND `user_id` = ?", [replyId, info.id], (err, data) => {
      if (err) return res.status(403).json("You can delete only your replies!");

      return res.status(200).json("Your reply has been deleted");
    })
  })
}

module.exports = { getReplies, addReply, deleteReplies }