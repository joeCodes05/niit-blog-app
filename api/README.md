# niit-blog-app-backend
```

This backend application is a simple RESTful API for a blog, built using Node.js with Express and MySQL.

## Prerequisites

Make sure you have the following installed:

- Node.js
- MySQL

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/joeCodes05/niit-blog-app-backend.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up the MySQL database:

   - Create a MySQL database named `niit-blog-app`.
   - Modify the database configuration in `db.js` with your MySQL credentials.

4. Run the application:

   ```bash
   npm run dev
   ```

The server will start running at `http://localhost:5000`.

## API Endpoints

- `GET /posts`: Retrieves all blog posts.
- `POST /posts`: Adds a new blog post.
  - Request Body:
    ```json
    {
      "title": "Post Title",
      "content": "Post Content",
      "cover_photo": "Post cover image"
    }
    ```

## Database Structure

The application assumes a table named `posts` with the following structure:

```sql
CREATE TABLE posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Feel free to modify the table structure or add more features as needed.

## Contributing

Contributions are welcome! If you have any suggestions, improvements, or bug fixes, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
```
