import express from "express";
import axios from "axios";
import env from "dotenv";
import bodyParser from "body-parser";
import pg from "pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { join, dirname } from "path";
import { fileURLToPath } from "url"; // Import fileURLToPath from url module

// Define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create express app
const app = express();
const port = 3000;
app.use(express.static(join(__dirname, "public")));

// Load environment variables
env.config();

// Bcrypt salt rounds
const saltRounds = 10;

// Database connection
const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
  });

  db.connect();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


//cookie parser
app.use(cookieParser());



// ==============================
// Create token
// ==============================
function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '12h' });
}


// ==============================
// Verify Token Middleware
// ==============================
// Middleware to authenticate token
function authenticateToken(req, res, next) {
  // Retrieve token from cookies
  const token = req.cookies.token;
  try {
    // If token is not present, return 401 Unauthorized
    if (token == null) return res.sendStatus(401);

    // Verify the token using the secret key
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      // If token verification fails, return 403 Forbidden
      if (err) return res.sendStatus(403);

      // Attach user information to the request object
      req.user = user;

      // Send user data in the response
      res.send(user.data);

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


// ==============================
// Login Endpoint
// ==============================
// ==============================
// Login Endpoint
// ==============================
app.post("/api/login", async (req, res) => {
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

        // Send response with the token
        res.status(200).json({
          message: "Login successful",
          token: accessToken
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

app.post("/api/register", async (req, res) => {
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
      bcrypt.hash(password, saltRounds, async (err, hash) => {
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



app.post("/api/test", authenticateToken, (req, res) => {
  console.log(req.body);
});














// ==============================
// Start the server
// ==============================
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });