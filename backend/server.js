const express = require("express");
require("dotenv").config();
const { connectDB } = require("./db/config");
const app = express();
const cors = require('cors')
const userRoute = require("./routes/userRoutes");
const cookieParker = require('cookie-parser')


//middlewares
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true, // allow cookies to be sent
    })
);
app.use(express.json());
app.use(cookieParker())
app.use((req, res, next) => {
    // console.log(req.params);
    // console.log(req.body);
    next();
});

// routes middleware
app.use("/api/auth", userRoute);

//DB connection

connectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`app is running on PORT${PORT}`);
});
