import CTA from "../../CTA";
import NoteListItem from "./NoteListItem";

export default function NoteList(props){

    
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
                    <p>You don’t have any notes yet. Start a new note to capture your thoughts and ideas.</p>
                </div>    
                }
                
             
            </div>
        </div> 
    )
}