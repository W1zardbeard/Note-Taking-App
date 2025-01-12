import CTA from "../../CTA";
import NoteListItem from "./NoteListItem";
import { useEffect, useState } from "react";

export default function NoteList(props){

    const [page, setPage] = useState("");

    useEffect(() => {
        if(props.selectedPage === "All notes"){
            setPage("You don’t have any notes yet. Start a new note to capture your thoughts and ideas.");
        } else if(props.selectedPage === "Archived notes"){
            setPage("You don’t have any archived notes yet.");
        }
    }, [props.selectedPage]);

    
    return(
        <div className="noteList">
            <CTA
                text="Create new note"
                style="primary"
                type="submit"
                fullWidth={true} 
                clickHandler={props.createNewNote}   
            />

            <div className="noteListContainer">
                
               
                {props.notes?.length > 0 ?
                    props.notes.map((note, index) => (
                        <NoteListItem 
                            key={index}
                            note={note}
                            setSelected={props.setSelected}
                        />
                        
                    ))
                :
                <div className="emptyNoteList">
                    <p>{page}</p>
                </div>    
                }
                
             
            </div>
        </div> 
    )
}