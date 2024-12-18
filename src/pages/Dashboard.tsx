import axios from 'axios';
import {useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';

import SideNav from '../components/dashboard/sideNav/SideNav.tsx';
import TopHeader from '../components/dashboard/topHeader/TopHeader';
import NoteList from '../components/dashboard/notePane/NoteList';
import NoteContent from '../components/dashboard/notePane/noteContent/NoteContent';

interface Tag {
    id: string;
    name: string;
  }
  
  interface Note {
    noteTitle: string;
    noteContent: string;
    noteTags: string[];
    noteLastEditDate: string;
  }

export default function Dashboard() {

    const [tags, setTags] = useState<Tag[]>([]);
    const [search, setSearch] = useState("");
    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);

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


    function searchGetter(search:string){
        setSearch(search);
    }

    function createNewNote(){
        const newNote = {
            noteTitle: "",
            noteContent: "",
            noteTags: [],
            noteLastEditDate: new Date().toLocaleDateString()
          };
          setNotes([...notes, newNote]);
          setSelectedNote(newNote);
    }

    function updateSelectedNote(title: string){
            setSelectedNote(...selectedNote, noteTitle: title);
        
    }

    //Figure out how to update the note title here!!!!!!!!!!!!!!!!!!!

   

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
                    notes={notes}
                    createNewNote={createNewNote}
                  />
            	{notes.length > 0 &&
                  <NoteContent 
                    selectedNote={selectedNote}
                    updateSelectedNote={updateSelectedNote}
                  />
                }
                </div>
            </div>
            
        </div>
    )
}