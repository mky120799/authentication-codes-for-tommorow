# Authentication System

This project is a **user authentication system** built with **Node.js, Express, MongoDB**, and **JWT-based cookie authentication**.  
It includes:

- User Registration
- User Login
- Forgot Password
- Password Reset
- Protected Routes (accessible only to logged-in users)

---
##  API Documentation

You can view the full API documentation for this project here:

[Postman API Docs](https://documenter.getpostman.com/view/31817931/2sB3QGsWC3)


## Project Structure

```
/Users/mky1207/Desktop/authentication codes for tommorow/
├── .DS_Store
├── backend/
│   ├─] .env (ignored)
│   ├── .gitignore
│   ├── controller/
│   │   └── userController.js
│   ├── db/
│   │   └── config.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── models/
│   │   └── user.js
│   ├─] node_modules/ (ignored)
│   ├── package-lock.json
│   ├── package.json
│   ├── routes/
│   │   └── userRoutes.js
│   └── server.js
└── client/
    ├── .gitignore
    ├── README.md
    ├─] dist/ (ignored)
    ├── eslint.config.js
    ├── index.html
    ├─] node_modules/ (ignored)
    ├── package-lock.json
    ├── package.json
    ├── public/
    │   └── vite.svg
    ├── src/
    │   ├── App.css
    │   ├── App.jsx
    │   ├── assets/
    │   ├── index.css
    │   ├── main.jsx
    │   └── pages/
    │       ├── ForgotPassword.jsx
    │       ├── Home.jsx
    │       ├── Login.jsx
    │       ├── Register.jsx
    │       └── ResetPassword.jsx
    └── vite.config.js


```


---

##  Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate into the backend folder
cd backend

# Install dependencies
npm install

# Start the server
npm run dev
