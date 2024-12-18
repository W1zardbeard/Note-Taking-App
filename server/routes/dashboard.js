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

router.get("/getUserNotes", authenticateToken, async (req, res) => {
    // const notes = [
    //     { 
    //         id: 1, 
    //         title: "Example note 1", 
    //         content: "This is the first note",
    //         tags: [
    //             "Spingle", 
    //             "Spangle"
    //         ],
    //         lastEditDate: "2021-07-01",
    //     },
    //     { 
    //         id: 2, 
    //         title: "Example note 2", 
    //         content: "This is the first note",
    //         tags: [
    //             "Spingle", 
    //             "Spangle"
    //         ],
    //         lastEditDate: "2021-07-01",
    //     },
    // ];

    const notes = [
       
    ];
    res.send(notes);
});


export default router;