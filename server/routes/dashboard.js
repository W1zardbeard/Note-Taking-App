import db from "../db.js";
import { generateAccessToken, authenticateToken  } from "./auth.js";
import express from "express";

const router = express.Router();

router.get("/getUserTags", authenticateToken, async (req, res) => {
    const tags = [
        { id: 1, name: "Spingle" },
        { id: 2, name: "Spangle" },
        { id: 3, name: "Sprottle" },
        { id: 4, name: "Spletty" },
        { id: 5, name: "Spwert" }
    ];
    res.send(tags);
});


export default router;