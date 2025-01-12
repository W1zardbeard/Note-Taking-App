import axios from 'axios';
import {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SideNav from '../components/dashboard/sideNav/SideNav.tsx';
import TopHeader from '../components/dashboard/topHeader/TopHeader.tsx';
import NoteList from '../components/dashboard/notePane/NoteList.tsx';
import NoteContent from '../components/dashboard/notePane/noteContent/NoteContent.tsx';
import TagModal from '../components/TagModal.jsx';
import NoteControls from '../components/dashboard/notePane/NoteControls.jsx';



export default function Dashboard() {

 

    const [tags, setTags] = useState([]);
    const [search, setSearch] = useState("");
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState();
    const [selectedPage, setSelectedPage] = useState("All notes");

    const [isOpenTagModal, setIsOpenTagModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        getUserTags();
        getUserNotes();
    }, []);


  


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


    function getUserNotes(){    
          // Fetch user notes from the API
          setSelectedPage("All notes");
          axios.get("/api/getUserNotes").then((response) => {
            console.log(response.data);
            // Update the notes state with the fetched data
            setNotes(response.data);

            //if there are notes, set the first note as the selected note
            if (response.data.length > 0) {
                setSelectedNote(response.data[0].noteId);
            }
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
            if (error.response.status === 403) {
                // If the user is forbidden, redirect to the home page
                navigate("/");
            }
        });
    }


    function searchGetter(search){
        setSearch(search);
    }




    /**
     * Creates a new note with default values and updates the state.
     * 
     * The new note object contains the following properties:
     * - noteId: A unique identifier for the note, based on the current number of notes.
     * - noteTitle: An empty string representing the title of the note.
     * - noteContent: An empty string representing the content of the note.
     * - noteTags: An empty array representing the tags associated with the note.
     * - noteLastEditDate: The current date in a localized string format.
     * 
     * The function updates the state by adding the new note to the existing list of notes
     * and sets the newly created note as the selected note.
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
        const updatedNotes = notes.map((note) => {
            if (note.noteId === selectedNote) {
                return {
                    ...note,
                    tags: [...note.tags, tag]
                };
            }
            return note;
        });
        setNotes(updatedNotes);
    }
    


    // function to set the selected note
    function setSelected(id){
        setSelectedNote(id);
    }

    // Function to save the selected note
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


    //function to archive the selected note
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


    //function to unarchive note

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

 

   

    return (
        <div className='dashboard'>
            <SideNav 
                getArchivedNotes={getArchivedNotes}
                getAllNotes={getUserNotes}
                tags={tags}
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
        </div>
    )
}