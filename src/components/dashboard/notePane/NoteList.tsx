import CTA from "../../CTA";

export default function NoteList(props){
    return(
        <div className="noteList">
            <CTA
                text="Create new note"
                style="primary"
                type="submit"
                fullWidth={true}    
            />
        </div> 
    )
}