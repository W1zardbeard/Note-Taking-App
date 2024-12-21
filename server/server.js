import express from "express";
import env from "dotenv";
import bodyParser from "body-parser";
import pg from "pg";
import cookieParser from "cookie-parser";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import loginRegistrationRoutes from "./routes/loginRegister.js"; // Import user routes
import dashboardRoutes from "./routes/dashboard.js"; // Import dashboard routes

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;
app.use(express.static(join(__dirname, "public")));



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Use user routes
app.use("/api", loginRegistrationRoutes);
// Use dashboard routes
app.use("/api", dashboardRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});