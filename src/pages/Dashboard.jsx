import axios from 'axios';
import {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserNotes } from '../components/dashboard/utils/getNotes.jsx';

import SideNav from '../components/dashboard/sideNav/SideNav.tsx';
import TopHeader from '../components/dashboard/topHeader/TopHeader.tsx';
import NoteList from '../components/dashboard/notePane/NoteList.tsx';
import NoteContent from '../components/dashboard/notePane/noteContent/NoteContent.jsx';
import TagModal from '../components/TagModal.jsx';
import DeleteModal from '../components/DeleteModal.jsx';
import DeleteTagModal from '../components/DeleteTagModal.jsx';
import NoteControls from '../components/dashboard/notePane/NoteControls.jsx';



export default function Dashboard() {

 
    // State to store the list of tags
    const [tags, setTags] = useState([]);

    // State to store the search query
    const [search, setSearch] = useState("");

    // State to store the list of notes
    const [notes, setNotes] = useState([]);

    // State to store the ID of the selected note
    const [selectedNote, setSelectedNote] = useState();

    // State to store the name of the selected page
    const [selectedPage, setSelectedPage] = useState("All notes");

    // State to control the visibility of the tag modal
    const [isOpenTagModal, setIsOpenTagModal] = useState(false);

    // State to control the visibility of the tag modal
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    // State to control the visibility of the delete tag modal
    const [isOpenDeleteTagModal, setIsOpenDeleteTagModal] = useState(false);


    //State to store tagId for deletion
    const [deleteTagId, setDeleteTagId] = useState();

    // Hook to navigate programmatically
    const navigate = useNavigate();




/*=======================================================*/
//
//  Get notes and tags
//
/*=======================================================*/

    useEffect(() => {
        getUserTags();
        getUserNotes();
    }, []);


    /**
     * Fetches user notes from the API and updates the notes state.
     * If the user is forbidden, redirects to the home page.
     * Sets the first note as the selected note if there are any notes.
     */
    function getUserNotes(){    
        // Fetch user notes from the API
        setSelectedPage("All notes");
        axios.get("/api/getUserNotes").then((response) => {
    
          // Update the notes state with the fetched data
          setNotes(response.data);
    
          // If there are notes, set the first note as the selected note
          if (response.data.length > 0) {
              setSelectedNote(response.data[0].noteId);
          }
         
      }).catch((error) => {
          console.log(error);
          if (error.response.status === 403) {
              // If the user is forbidden, redirect to the home page
              navigate("/");
          }
      });
    }


    /**
     * Fetches user tags from the API and updates the tags state.
     * If the user is forbidden, redirects to the home page.
     */
    function getUserTags(){
        // Fetch user tags from the API
        axios.get("/api/getUserTags").then((response) => {
            // Update the tags state with the fetched data
            setTags(response.data);
        }).catch((error) => {
            console.log(error);
            if (error.response.status === 403) {
                // If the user is forbidden, redirect to the home page
                navigate("/");
            }
        });
    }


  
/*=======================================================*/
//
//  Search function
//
/*=======================================================*/

    function searchGetter(search){
        setSearch(search);
    }


/*=======================================================*/
//
//  Create new note
//
/*=======================================================*/

    /**
     * Creates a new note with the current date and time as the last edit date.
     * The new note is initialized with an empty title, content, and tags.
     * The note is then added to the existing list of notes and set as the selected note.
     *
     * @function
     * @name createNewNote
     */
    function createNewNote(){
        const date = new Date().toLocaleString() ;
        const newNote = {
            id: null,
            noteId: notes.length + 1,
            title: "",
            content: "",
            tags: [],
            lasteditdate: date
          };
          setNotes([...notes, newNote]);
          setSelectedNote(newNote.noteId);
    }


/*=======================================================*/
//
//  Functions to update the notes
//
/*=======================================================*/

    /**
     * Updates the title of the selected note.
     *
     * @param {string} id - The ID of the note to update.
     * @param {string} title - The new title for the selected note.
     */
    function updateSelectedNoteTitle(id, title){
        const updatedNotes = notes.map((note) => {
            if (note.noteId === selectedNote) {
                return {
                    ...note,
                    title: title,
                    lasteditdate: new Date().toLocaleString()
                };
            }
            return note;
        });
        setNotes(updatedNotes);
    }

    /**
     * Updates the content of the selected note.
     *
     * @param {string} id - The ID of the note to update.
     * @param {string} content - The new content for the note.
     */
    function updateSelectedNoteContent(id, content){
        const updatedNotes = notes.map((note) => {
            if (note.noteId === selectedNote) {
                return {
                    ...note,
                    content: content,
                    lasteditdate: new Date().toLocaleString()
                };
            }
            return note;
        });
        setNotes(updatedNotes);
    }


    /**
     * Adds a new tag to the note with the specified ID.
     *
     * @param {string} id - The ID of the note to which the tag will be added.
     * @param {string} tag - The tag to be added to the note.
     */
    function addNewTag(id, tag){ 
        const newTag = {
            id: null,
            name: tag
        }
        const updatedNotes = notes.map((note) => {
            if (note.noteId === selectedNote) {
                return {
                    ...note,
                    tags: [...note.tags, newTag]
                };
            }
            return note;
        });
        setNotes(updatedNotes);
    }
    


    // function to set the selected note
    /**
     * Sets the selected note by its ID.
     *
     * @param {string} id - The ID of the note to be selected.
     */
    function setSelected(id){
        setSelectedNote(id);
    }


/*=======================================================*/
//
//  save note
//
/*=======================================================*/

    // Function to save the selected note
    /**
     * Saves the currently selected note to the server.
     *
     * This function finds the note that matches the selected note ID and sends a POST request
     * to save the note to the server. Upon successful save, it fetches the updated list of notes
     * and tags from the server and displays a success message to the user. If the save operation
     * fails, it displays an error message to the user.
     *
     * @function saveNote
     * @returns {void}
     */
    function saveNote() {
        // Find the note that matches the selected note ID
        const saveNote = notes.find((note) => note.noteId === selectedNote);
        console.log(saveNote);

        // Send a POST request to save the note to the server
        axios.post("/api/saveNote", { saveNote })
            .then((response) => {
                // Fetch the updated list of notes and tags from the server
                getUserNotes();
                getUserTags();

                // Display a success message to the user
                toast.success("Note saved successfully", {
                    autoClose: 2000,
                    position: "top-center",
                });
            })
            .catch((error) => {
                console.log(error);

                // Display an error message to the user if the save operation fails
                toast.error("Failed to save note", {
                    autoClose: 2000,
                    position: "top-center",
                });
            });
    }

/*=======================================================*/
//
//  Functions to archive and get archived notes
//
/*=======================================================*/

    /**
     * Fetches archived notes from the server and updates the state with the retrieved notes.
     * If the user is not authorized (status 403), navigates to the home page.
     *
     * @function getArchivedNotes
     * @returns {void}
     */
    function getArchivedNotes(){
        setSelectedPage("Archived notes");
        axios.get("/api/getArchivedNotes").then((response) => {
            console.log(response.data);
            setNotes(response.data);
        }).catch((error) => {
            console.log(error);
            if (error.response.status === 403) {
                navigate("/");
            }
        });
    }


    /**
     * Archives a selected note by sending a POST request to the server.
     * 
     * This function finds the note with the specified `noteId` from the `notes` array,
     * sends it to the server to be archived, and updates the user's notes upon success.
     * It also displays a success or error toast notification based on the result.
     * 
     * @function archiveNote
     * @returns {void}
     */
    function archiveNote(){
        const archiveNote = notes.find((note) => note.noteId === selectedNote);
        console.log(archiveNote);
        axios.post("/api/archiveNote", {archiveNote})
        .then((response) => {
            getUserNotes();
            console.log(response);
            toast.success("Note archived successfully",{
                autoClose: 2000,
                position: "top-center",
            });
        })
        .catch((error) => {
            console.log(error);
            toast.error("Failed to archive note",{
                autoClose: 2000,
                position: "top-center",
            });
        });
    }


    /**
     * Unarchives a note by sending a POST request to the server.
     * 
     * This function finds the note with the specified `noteId` from the `notes` array,
     * sends a POST request to the `/api/unarchiveNote` endpoint with the note data,
     * and handles the response by updating the archived notes and displaying a success or error message.
     * 
     * @function
     * @name unarchiveNote
     * 
     * @returns {void}
     */
    function unarchiveNote(){
        const unarchiveNote = notes.find((note) => note.noteId === selectedNote);
        console.log(unarchiveNote);
        axios.post("/api/unarchiveNote", {unarchiveNote})
        .then((response) => {
            getArchivedNotes();
            console.log(response);
            toast.success("Note unarchived successfully",{
                autoClose: 2000,
                position: "top-center",
            });
        })
        .catch((error) => {
            console.log(error);
            toast.error("Failed to unarchive note",{
                autoClose: 2000,
                position: "top-center",
            });
        });
    }

 /*=======================================================*/
//
//  Functions to a delete notes
//
/*=======================================================*/

    function confirmDeleteNote(){
        setIsOpenDeleteModal(true);
    }

    function deleteNote(confirm){
        if(confirm === false){
            return;
        }else{
            const deleteNote = notes.find((note) => note.noteId === selectedNote);
            console.log(deleteNote);

            axios.post("/api/deleteNote", {deleteNote})
            .then((response) => {

                if(selectedPage === "Archived notes"){
                    getArchivedNotes();
                } else {
                    getUserNotes();
                }
                console.log(response);
                setIsOpenDeleteModal(false);
                toast.success("Note deleted successfully",{
                    autoClose: 2000,
                    position: "top-center",
                });
            })
            .catch((error) => {
                console.log(error);
                toast.error("Failed to delete note",{
                    autoClose: 2000,
                    position: "top-center",
                });
            });
        }
    }



    
 /*=======================================================*/
//
//  Functions to a delete tags
//
/*=======================================================*/
function confirmDeleteTag(tagId){
    setIsOpenDeleteTagModal(true);
    setDeleteTagId(tagId);
}


function deleteTag(confirm){
    if(confirm === false){
        return;
    }else{
       
       axios.post("/api/deleteTag", {tagId: deleteTagId})
        .then((response) => {
            console.log(response);
            setIsOpenDeleteModal(false);
            if(selectedPage === "Archived notes"){
                getArchivedNotes();
            } else {
                getUserNotes();
            }
            getUserTags();  
            toast.success("Tag deleted successfully",{
                autoClose: 2000,
                position: "top-center",
            });
        })
        .catch((error) => {
            console.log(error);
            toast.error("Failed to delete Tag",{
                autoClose: 2000,
                position: "top-center",
            });
        });

    }
}


    
 /*=======================================================*/
//
//  Functions to a filter tags
//
/*=======================================================*/

function filterTags(id){
    alert("Filter tags" + id);
    const filteredNotes = notes.filter((note) => 
        note.tags.some((tag) => tag.id === id)
);
    console.log(filteredNotes);

}

   

    return (
        <div className='dashboard'>
            <SideNav 
                getArchivedNotes={getArchivedNotes}
                getAllNotes={getUserNotes}
                tags={tags}
                confirmDeleteTag={confirmDeleteTag}
                filterTags={filterTags}
            />
            <div className='main'>
                <TopHeader 
                    tagPage={false}
                    selectedPage={selectedPage}
                    searchGetter={searchGetter}
                />

                <div className='notePane'>
                  <NoteList
                    selectedPage={selectedPage}
                    selectedNote={selectedNote} 
                    notes={notes}
                    createNewNote={createNewNote}
                    setSelected={setSelected}
                  />
            	{notes.length > 0 &&
                  <NoteContent 
                    selectedNote={selectedNote}
                    note={notes.filter((note) => note.noteId === selectedNote)[0]}
                    updateSelectedNoteTitle={updateSelectedNoteTitle}
                    updateSelectedNoteContent={updateSelectedNoteContent}
                   
                    saveNote={saveNote}
                    newTag={setIsOpenTagModal}
                  />
                }
                {notes.length > 0 &&
                <NoteControls 
                    archiveNote={archiveNote}
                    unarchiveNote={unarchiveNote}
                    confirmDeleteNote={confirmDeleteNote}
                    note={notes.filter((note) => note.noteId === selectedNote)[0]}
                />
                }
                </div>
            </div>
            <ToastContainer />
            {isOpenTagModal && 
                <TagModal 
                    setIsOpenTagModal={setIsOpenTagModal}
                    selectedNote={selectedNote}
                    addNewTag={addNewTag}
                />
            }
            {isOpenDeleteModal && 
                <DeleteModal 
                    setIsOpenDeleteModal={setIsOpenDeleteModal}
                    deleteNote={deleteNote}
                />
            }

            {isOpenDeleteTagModal && 
                <DeleteTagModal 
                    setIsOpenDeleteTagModal={setIsOpenDeleteTagModal}
                    deleteTag={deleteTag}
                />
            }
        </div>
    )
}