# 🔗 URL Shortener

A simple and secure URL Shortener web application built using **Node.js, Express.js, MongoDB, and EJS**.

This project allows users to create short URLs for long links and redirect users to the original URL using the generated short link. It also includes user authentication with signup and login functionality.

## 🚀 Features

- 🔗 Create short URLs from long URLs
- 👤 User signup and login
- 🔐 Authentication using cookies and sessions
- 🗄️ MongoDB database integration
- 📊 Store and manage shortened URLs
- 🔄 Redirect short URLs to original URLs
- 🎨 EJS-based user interface
- ⚡ Express.js backend
- 🛡️ Authentication middleware for protected routes

## 🛠️ Technologies Used

- **HTML**
- **CSS**
- **JavaScript**
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **EJS**
- **Nanoid / ShortID**
- **Cookie Parser**
- **Nodemon**

## 📁 Project Structure

```text
URL-shortener/
│
├── controllers/
│   ├── url.js
│   └── user.js
│
├── middlewares/
│   └── auth.js
│
├── models/
│   ├── url.js
│   └── user.js
│
├── routes/
│   ├── staticRouter.js
│   ├── url.js
│   └── user.js
│
├── service/
│   └── auth.js
│
├── views/
│   ├── home.ejs
│   ├── login.ejs
│   └── signup.ejs
│
├── connect.js
├── index.js
├── package.json
├── package-lock.json
└── .gitignore