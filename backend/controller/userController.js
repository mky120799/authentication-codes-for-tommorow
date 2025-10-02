const { model } = require("mongoose");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

//  Signup 
module.exports.signUp = async (req, res) => {
  try {
     console.log("register end point...");
    const { firstName, lastName, email, password } = req.body;
     
    // check whether user already exists
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists, please login",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // save password and userDetails into the db
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hash,
    });

    res.status(201).json({
      success: true,
      message: "User created",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
};

// Login
module.exports.login = async (req, res) => {
  try {
    console.log('login end point...')
    const { email, password } = req.body;
    const user = await User.findOne({ email });
     console.log(user)
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const match = await bcrypt.compare(password, user.password);
    console.log(match)
    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Wrong credentials",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .cookie("jwt", token, {
        httpOnly: true,

        expires: new Date(Date.now() + 60 * 60 * 1000),
      })
      .status(200)
      .json({
        success: true,
        message: "User logged in successfully",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

//  Forgot Password 
module.exports.forgotPassword = async (req, res) => {
  try {
     console.log("forgotpassword end point...");
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // reset token with 5 min expiry
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });

    //reset link
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    // nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App password
      },
    });

    // send email
    await transporter.sendMail({
      from: '"Support Team" <codesForTommorow@gmail.com>',
      to: user.email,
      subject: "Password Reset Request",
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. 
             <br/>This link will expire in 5 minutes.</p>`,
    });

    res.status(200).json({
      success: true,
      message: "Reset link sent to email",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error sending reset email",
      error,
    });
  }
};

//  Reset Password 
module.exports.resetPassword = async (req, res) => {
  try {
     console.log("reset end point...");
    const { token } = req.params; // token comes from URL
    const { newPassword } = req.body;

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid or expired reset token",
      error,
    });
  }
};
