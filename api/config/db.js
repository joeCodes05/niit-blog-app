const mysql = require("mysql");
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
  charset: "utf8mb4"
});

db.connect((error) => {
  if (error)
    console.log(`Could not connect to MYSQL: ${error.stack}`);
  else {
    // create user table
    db.query(`CREATE TABLE IF NOT EXISTS users (
      user_id INT(255) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      full_name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      password VARCHAR(100) NOT NULL,
      profile_image VARCHAR(100) NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) CHARSET utf8mb4 COLLATE = utf8mb4_unicode_ci, ENGINE = InnoDB`);

    // create posts table
    db.query(`CREATE TABLE IF NOT EXISTS posts (
      post_id INT(255) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      title VARCHAR(255) NOT NULL,
      content LONGTEXT NOT NULL,
      cover_image VARCHAR(255) NULL,
      user_id INT(255) UNSIGNED NOT NULL,
      category VARCHAR(45) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(user_id)
    ) CHARSET utf8mb4 COLLATE = utf8mb4_unicode_ci, ENGINE = InnoDB`);

    // create comment table
    db.query(`CREATE TABLE IF NOT EXISTS comments (
      comment_id INT(255) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      comment_content LONGTEXT NOT NULL,
      profile_image VARCHAR(255) NULL,
      post_id INT(255) UNSIGNED NOT NULL,
      full_name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      user_id INT(255) UNSIGNED NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY(post_id) REFERENCES posts(post_id),
      FOREIGN KEY(user_id) REFERENCES users(user_id)
    ) CHARSET utf8mb4 COLLATE = utf8mb4_unicode_ci, ENGINE = InnoDB`);

    console.log(`Connected to MYSQL database`);
  }
});

module.exports = db;
