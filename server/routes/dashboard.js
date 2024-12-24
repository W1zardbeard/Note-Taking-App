import db from "../db.js";
import { generateAccessToken, authenticateToken  } from "./auth.js";
import express from "express";

const router = express.Router();

// Route to get user tags
router.get("/getUserTags", authenticateToken, async (req, res) => {
    // Sample tags data
    const tags = [
        { id: 1, name: "Spingle" },
        { id: 2, name: "Spangle" },
        { id: 3, name: "Sprottle" },
        { id: 4, name: "Spletty" },
        { id: 5, name: "Spwert" }
    ];
    // Send the tags data as response
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


router.post("/saveNote" , authenticateToken, async (req, res) => {
    console.log(req.body);
    console.log(req.user.data.userId);
    res.status(200).send("Note saved successfully");
    
});


export default router;