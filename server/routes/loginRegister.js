import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../db.js";
import { generateAccessToken, authenticateToken  } from "./auth.js";

const router = express.Router();

// ==============================
// Login Endpoint
// ==============================
router.post("/login", async (req, res) => {
    // Extract email and password from the request body
    const { email, password } = req.body;
  
    try {
      // Check if the email exists in the database
      const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  
      // If email exists
      if (checkResult.rows.length > 0) {
        const user = checkResult.rows[0];
        const storedHashPassword = user.password;
        const userCreds = { email, userId: user.id };
  
        // Compare the provided password with the stored hashed password
        const match = await bcrypt.compare(password, storedHashPassword);
  
        // If passwords match
        if (match) {
          // Generate JWT token
          const accessToken = generateAccessToken({ data: userCreds });
            console.log(accessToken);
            // Set the token as a cookie in the response
            res.cookie("token", accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
              });

          // Send response with the token
          res.status(200).json({
            message: "Login successful"
          });
        } else {
          // If passwords do not match
          res.status(400).send("Invalid credentials");
        }
      } else {
        // If email does not exist
        res.status(400).send("Invalid credentials");
      }
    } catch (err) {
      // Log any error that occurs during the process
      console.log(err);
      res.status(500).send("Server error");
    }
  });
  
  
  
  
  
  // ==============================
  // Register Endpoint
  // ==============================
  
  router.post("/register", async (req, res) => {
    // Extract email and password from the request body
    const email = req.body.email;
    const password = req.body.password;
  
    try {
      // Check if the email already exists in the database
      const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [email]);
  
      // If email already exists, send a response indicating so
      if (checkResult.rows.length > 0) {
        console.log("Email already exists");
        res.status(400).send("Email already exists. Try logging in.");
      } else {
        // Hash the password using bcrypt
        bcrypt.hash(password, 10, async (err, hash) => {
          if (err) {
            // Log any error that occurs during hashing
            console.log("Error with hashing: ", err);
          } else {
            try {
              // Insert the new user into the database
              const result = await db.query(
                "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id",
                [email, hash]
              );
  
              // Create user credentials object
              const userCreds = { email, userId: result.rows[0].id };
  
              // Generate JWT token
              const accessToken = generateAccessToken({ data: userCreds });
  
              // Set the token as a cookie in the response
              res.cookie("token", accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
              });
  
              // Send a response indicating successful registration
              res.status(200).json({
                message: "Registration successful"
              });
              
            } catch (err) {
              // Log any error that occurs during database insertion
              console.log(err);
              res.status(500).send("Server error");
            }
          }
        });
      }
    } catch (err) {
      // Log any error that occurs during email check
      console.log(err);
      res.status(500).send("Server error");
    }
  });

// Test route
router.post("/test", authenticateToken, (req, res) => {
  console.log(req.body);
  res.send("Test route");
});

export default router;