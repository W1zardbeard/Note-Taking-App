import express from "express";
import axios from "axios";
import env from "dotenv";
import bodyParser from "body-parser";
import pg from "pg";
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

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());



app.get("/api/test", (req, res) => {
    res.send("Hello World!");
  });

// ==============================
// Start the server
// ==============================
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });