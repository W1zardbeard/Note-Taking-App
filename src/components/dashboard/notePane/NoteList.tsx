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
            />

            <div className="noteListContainer">
                {props.notes?.length > 0 ?
                    props.notes.map((note, index) => (
                        <NoteListItem 
                            key={index}
                            note={note}
                        />
                    ))
                :
                <p>No notes available</p>
                }
                
             
            </div>
        </div> 
    )
}