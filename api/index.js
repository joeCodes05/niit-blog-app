const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const multer = require('multer');

// routes
const authRoutes = require('./routes/auth/auth.routes');
const postRoutes = require('./routes/posts/posts.routes');
const commentRoutes = require('./routes/comments/comments.routes');
const replyRoutes = require('./routes/replies/replies.routes');

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

// middlewares
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/upload');
  }, 
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname.replaceAll(' ', '-').replaceAll('-', ""));
  }
})
const upload = multer({ storage });
app.post('/api/upload', upload.single('file'), function (req, res) {
  const file = req.file;
  res.status(200).json({
    error: false,
    uploadedFile: file.filename
  });
})

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/replies', replyRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
