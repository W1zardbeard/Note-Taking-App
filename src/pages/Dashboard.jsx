import axios from 'axios';
import {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';

import SideNav from '../components/dashboard/sideNav/SideNav.tsx';
import TopHeader from '../components/dashboard/topHeader/TopHeader.tsx';
import NoteList from '../components/dashboard/notePane/NoteList.tsx';
import NoteContent from '../components/dashboard/notePane/noteContent/NoteContent.tsx';



export default function Dashboard() {

 

    const [tags, setTags] = useState([]);
    const [search, setSearch] = useState("");
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState();

    const navigate = useNavigate();

    useEffect(() => {
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


        // Fetch user notes from the API
        axios.get("/api/getUserNotes").then((response) => {
            console.log(response.data);
            // Update the notes state with the fetched data
            setNotes(response.data);
        }).catch((error) => {
            console.log(error);
            if (error.response.status === 403) {
                // If the user is forbidden, redirect to the home page
                navigate("/");
            }
        });
    }, []);


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
            noteId: notes.length + 1,
            noteTitle: "",
            noteContent: "",
            noteTags: [],
            noteLastEditDate: new Date().toLocaleDateString()
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
                    noteTitle: title
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

 

   

    return (
        <div className='dashboard'>
            <SideNav 
                tags={tags}
            />
            <div className='main'>
                <TopHeader 
                    tagPage={false}
                    selectedPage="All notes"
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
                  />
                }
                </div>
            </div>
            
        </div>
    )
}