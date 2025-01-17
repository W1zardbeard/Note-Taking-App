import db from "../db.js";
import { generateAccessToken, authenticateToken  } from "./auth.js";
import express from "express";
import pg from "pg";

const router = express.Router();

// ==========================
// Route to get tags
// ==========================

// Route to get user tags
router.get("/getUserTags", authenticateToken, async (req, res) => {
    // Extract the userId from the authenticated user's token
    const userId = req.user.data.userId;

    try{
        const tagResult = await db.query(
            "SELECT name, id FROM tags WHERE user_id = $1",
            [userId]
        );
      
        res.send(tagResult.rows);
    } catch (err) {
        // Log any errors that occur and send a 500 status code
        console.log(err);
        res.status(500).send("Internal Server Error");
    }

});



// ==========================
// Route to get saved notes
// ==========================

router.get("/getUserNotes", authenticateToken, async (req, res) => {

    // Extract the userId from the authenticated user's token
    const userId = req.user.data.userId;
    try {
        // Query the database to get notes for the user with the specified userId
        const notesResult = await db.query(
            "SELECT id, title, content, lastEditDate, isarchived FROM notes WHERE user_id = $1 AND isarchived = false",
            [userId]
        );

        // Extract the rows (notes) from the query result
        const notes = notesResult.rows;

        // Iterate over each note to fetch its associated tags
        for (let note of notes) {
            const tagsResult = await db.query(
                // Query to get tags associated with the current note
                "SELECT t.name FROM tags t INNER JOIN note_tags nt ON t.id = nt.tag_id WHERE nt.note_id = $1",
                [note.id]
            );
            // Add the tags to the note object
            note.tags = tagsResult.rows.map(row => row.name);
        }

        // Add a noteId property to each note for easier identification
        notes.forEach((note, index) => {
            note.noteId = index + 1;
        });

        // Send the notes as the response
        res.send(notes);
    } catch (err) {
        // Log any errors that occur and send a 500 status code
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});





// ==========================
// Route to save notes
// ==========================


router.post("/saveNote" , authenticateToken, async (req, res) => {
    console.log(req.body);  
// Check if the note's dbId is null, indicating it's a new note
if (req.body.saveNote.id == null) {
    try {

        
        // Extract userId from the request's user data
        const userId = req.user.data.userId;
        // Extract note title from the request body
        const title = req.body.saveNote.title;
        // Extract note content from the request body
        const content = req.body.saveNote.content;
        // Extract note tags from the request body (though not used in the query)
        const tags = req.body.saveNote.tags;
        //Extrast last edit date from the request body
        const lasteditdate = req.body.saveNote.lasteditdate;
        

      

        // Insert the new note into the database and return the inserted row
        const result = await db.query(
            "INSERT INTO notes (title, content, user_id, lasteditdate) VALUES ($1, $2, $3, $4) RETURNING *",
            [title, content, userId,lasteditdate]
        );



        const noteId = result.rows[0].id;

        // Insert tags and associate them with the note
        for (const tag of tags) {
            // Insert the tag if it doesn't exist
            const tagResult = await db.query(
                "INSERT INTO tags (name, user_id) VALUES ($1, $2) ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING id",
                [tag, userId]
            );

            const tagId = tagResult.rows[0].id;

            // Associate the tag with the note
            await db.query(
                "INSERT INTO note_tags (note_id, tag_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
                [noteId, tagId]
            );
        }



        // Send a success response to the client with the noteId
        res.status(200).send("Note saved successfully");
    } catch (err) {
        // Log any errors that occur during the database operation
        console.log(err);
        // Send an internal server error response to the client
        res.status(500).send("Internal Server Error");
    }
} else {
    try {
        // Extract userId from the request's user data
        const userId = req.user.data.userId;
        // Extract note title from the request body
        const title = req.body.saveNote.title;
        // Extract note content from the request body
        const content = req.body.saveNote.content;
        // Extract note tags from the request body (though not used in the query)
        const tags = req.body.saveNote.tags;
        // Extract the note's dbId from the request body
        const id = req.body.saveNote.id;
        //Extrast last edit date from the request body
        const lasteditdate = req.body.saveNote.lasteditdate;

        // Update the existing note in the database with the new title and content
        const result = await db.query(
            "UPDATE notes SET title = $1, content = $2, lasteditdate = $3 WHERE id = $4 RETURNING *",
            [title, content, lasteditdate, id]
        );

     

        const noteId = result.rows[0].id;

        // Insert tags and associate them with the note
        for (const tag of tags) {
            // Insert the tag if it doesn't exist
            const tagResult = await db.query(
                "INSERT INTO tags (name, user_id) VALUES ($1, $2) ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name RETURNING id",
                [tag, userId]
            );

            const tagId = tagResult.rows[0].id;

            // Associate the tag with the note
            await db.query(
                "INSERT INTO note_tags (note_id, tag_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
                [noteId, tagId]
            );
        }



        // Send a success response to the client
        res.status(200).send("Note saved successfully");
    } catch (err) {
        // Log any errors that occur during the database operation
        console.log(err);
        // Send an internal server error response to the client
        res.status(500).send("Internal Server Error");
    }
}
});




// ==========================
// Route to archive note
// ==========================


router.post("/archiveNote", authenticateToken, async (req, res) => {
    console.log(req.body);
    
    try{
        const userId = req.user.data.userId;
        const id = req.body.archiveNote.id;
        const result = await db.query(
            "UPDATE notes SET isarchived = true WHERE id = $1 RETURNING *",
            [ id]
        );
        res.status(200).send("Note archived successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
   
});



router.post("/unarchiveNote", authenticateToken, async (req, res) => {
    console.log(req.body);
    
    try{
        const userId = req.user.data.userId;
        const id = req.body.unarchiveNote.id;
        const result = await db.query(
            "UPDATE notes SET isarchived = false WHERE id = $1 RETURNING *",
            [ id]
        );
        res.status(200).send("Note unarchived successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
   
});


router.get("/getArchivedNotes", authenticateToken, async (req, res) => {
      // Extract the userId from the authenticated user's token
      const userId = req.user.data.userId;
      try {
          // Query the database to get notes for the user with the specified userId
          const notesResult = await db.query(
              "SELECT id, title, content, lastEditDate, isarchived FROM notes WHERE user_id = $1 AND isarchived = true",
              [userId]
          );
  
          // Extract the rows (notes) from the query result
          const notes = notesResult.rows;
  
          // Iterate over each note to fetch its associated tags
          for (let note of notes) {
              const tagsResult = await db.query(
                  // Query to get tags associated with the current note
                  "SELECT t.name FROM tags t INNER JOIN note_tags nt ON t.id = nt.tag_id WHERE nt.note_id = $1",
                  [note.id]
              );
              // Add the tags to the note object
              note.tags = tagsResult.rows.map(row => row.name);
          }
  
          // Add a noteId property to each note for easier identification
          notes.forEach((note, index) => {
              note.noteId = index + 1;
          });
  
          // Send the notes as the response
          res.send(notes);
      } catch (err) {
          // Log any errors that occur and send a 500 status code
          console.log(err);
          res.status(500).send("Internal Server Error");
      }
    });


// ==========================
// Route to delete note
// ==========================

router.post("/deleteNote", authenticateToken, async (req, res) => {
    console.log(req.body);
    
    try{
        const userId = req.user.data.userId;
        const id = req.body.deleteNote.id;
        const result = await db.query(
            "DELETE FROM notes WHERE id = $1",
            [id]
        );
        res.status(200).send("Note deleted successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})
    


// ==========================
// Route to delete tag
// ==========================

router.post("/deleteTag", authenticateToken, async (req, res) => {
    console.log(req.body);

    try{
        const tagId = req.body.tagId;
        const result = await db.query(
            "DELETE FROM tags WHERE id = $1",
            [tagId]
        );
        res.status(200).send("Tag deleted successfully");
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }    
    
});

export default router;