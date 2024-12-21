import jwt from "jsonwebtoken";
import express from "express";
import env from "dotenv";

env.config();

// ==============================
// Create token
// ==============================
export function generateAccessToken(user) {
    console.log("generateAccessToken");
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '12h' });
}


// ==============================
// Verify Token Middleware
// ==============================
// Middleware to authenticate token
export function authenticateToken(req, res, next) {
  // Retrieve token from cookies
  const token = req.cookies.token;
  try {
    // If token is not present, return 401 Unauthorized
    if (token == null){
      // Clear the token cookie if an error occurs
    res.clearCookie("token");
    // Redirect to the home page
    return res.status(403).json({ message: "Forbidden" });
    } 

    // Verify the token using the secret key
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      // If token verification fails, return 403 Forbidden
      if (err) return res.sendStatus(403);

      // Attach user information to the request object
      req.user = user;
      // Proceed to the next middleware or route handler
      next();
    });
  } catch (err) {
    // Clear the token cookie if an error occurs
    res.clearCookie("token");

    // Redirect to the home page
    return res.redirect("/");
  }
}

