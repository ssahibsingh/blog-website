# Blog Website

A modern, feature-rich blog platform built with Node.js and MongoDB. This project demonstrates a full-stack web application with user authentication, CRUD operations, and responsive design.

![App Screenshot](/public/images/blogwebsite.png)


## 🌟 Features

- **User Authentication**
  - Secure login and signup system
  - JWT-based authentication
  - Protected routes for authenticated users

- **Blog Management**
  - Create, read, update, and delete blog posts
  - Author attribution for posts
  - Timestamp for post creation

- **User Experience**
  - Responsive design using Bootstrap
  - Clean and intuitive user interface
  - Pagination for better content navigation
  - Confirmation dialogs for destructive actions

- **Security**
  - Password hashing using bcrypt
  - Protected routes and actions
  - Secure cookie handling
  - Input validation and sanitization

## 🚀 Live Demo

Check out the live demo: [Blog Website](https://blog-6lel.onrender.com/)

## 🛠️ Tech Stack

- **Backend**
  - Node.js
  - Express.js
  - MongoDB with Mongoose
  - JWT for authentication

- **Frontend**
  - EJS templating engine
  - Bootstrap 5
  - Custom CSS
  - Responsive design

## 📦 Installation

1. Clone the repository
```bash
git clone https://github.com/ssahibsingh/blog-website.git
```

2. Navigate to project directory
```bash
cd blog-website
```

3. Install dependencies
```bash
npm install
```

4. Create a `.env` file in the root directory and add your environment variables:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

5. Start the server
```bash
node app.js
```

## 🔧 Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT token generation |
| `PORT` | Port number for the server (default: 3000) |

## 📚 API Documentation

### Authentication Routes
- `POST /auth/signup` - Register a new user
- `POST /auth/login` - Login user
- `GET /auth/logout` - Logout user

### Blog Routes
- `GET /` - Get all blog posts (paginated)
- `GET /posts/new` - Get new post form
- `POST /posts/new` - Create new post
- `GET /posts/:id` - Get single post
- `GET /posts/:id/edit` - Get edit post form
- `POST /posts/:id/edit` - Update post
- `POST /posts/:id/delete` - Delete post

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

- **Sahib Singh** - [GitHub Profile](https://github.com/ssahibsingh)

## 🙏 Acknowledgments

- [Node.js](https://nodejs.org/en/docs/)
- [Express.js](https://expressjs.com/)
- [EJS](https://ejs.co/#docs)
- [Mongoose](https://mongoosejs.com/docs/guide.html)
- [Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/)

## ⭐ Show your support

Give a ⭐️ if this project helped you!
