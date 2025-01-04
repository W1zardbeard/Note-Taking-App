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

    const [isOpenTagModal, setIsOpenTagModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        getTags();
        getNotes();
    }, []);


    function getTags(){
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

    function getNotes(){
        // Fetch user notes from the API
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
        const newNote = {
            id: null,
            noteId: notes.length + 1,
            title: "",
            content: "",
            tags: [],
            lasteditdate: new Date().toLocaleDateString(),
            isarchived: false
          };
          setNotes([...notes, newNote]);
          setSelectedNote(newNote.noteId);
    }

    



    

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
                    title: title
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
                    content: content
                };
            }
            return note;
        });
        setNotes(updatedNotes);
    }


    // function to update the last edit date of the selected note
    function updateSelectedNoteLastEditDate(id, date){
        const updatedNotes = notes.map((note) => {
            if (note.noteId === selectedNote) {
                return {
                    ...note,
                    lasteditdate: date
                };
            }
            return note;
        });
        setNotes(updatedNotes);
    }

    // function to add a new tag to the selected note
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

    //function to save the selected note
    function saveNote(){
        const saveNote = notes.find((note) => note.noteId === selectedNote);
        console.log(saveNote);
        axios.post("/api/saveNote", {saveNote})
        .then((response) => {
            getTags();
            console.log(response);
            toast.success("Note saved successfully",{
                autoClose: 2000,
                position: "top-center",
            });
        })
        .catch((error) => {
            console.log(error);
            toast.error("Failed to save note",{
                autoClose: 2000,
                position: "top-center",
            });
        });
    }


    //function to archive the selected note
    function archiveNote(){
        const archiveNote = notes.find((note) => note.noteId === selectedNote);
        console.log(archiveNote);
        axios.post("/api/archiveNote", {archiveNote})
        .then((response) => {
            getNotes();
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

 

   

    return (
        <div className='dashboard'>
            <SideNav 
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
                    updateSelectedNoteLastEditDate={updateSelectedNoteLastEditDate}
                    saveNote={saveNote}
                    newTag={setIsOpenTagModal}
                  />
                }
                <NoteControls 
                    archiveNote={archiveNote}
                />
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