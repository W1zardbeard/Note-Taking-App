import db from "../db.js";
import { generateAccessToken, authenticateToken  } from "./auth.js";
import express from "express";

const router = express.Router();

router.get("/getUserTags", authenticateToken, async (req, res) => {
    const tags = [
        { id: 1, name: "JavaScript" },
        { id: 2, name: "Node.js" },
        { id: 3, name: "Express" },
        { id: 4, name: "React" },
        { id: 5, name: "MongoDB" }
    ];
    res.send(tags);
});


export default router;