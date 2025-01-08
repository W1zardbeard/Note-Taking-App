import CTA from '../../CTA';

export default function NoteControls(props){
    return(
        <div className="noteControls">
            
            <CTA
                text="Archive note"
                style="noteControl"
                type="submit"
                fullWidth={false}
                clickHandler={props.archiveNote}  
                icon="../src/assets/icon-archive.svg"  
            />

            <CTA
                text="Delete note"
                style="noteControl"
                type="submit"
                fullWidth={false}
                clickHandler={props.saveNote}  
                icon="../src/assets/icon-delete.svg"  
            />

            
        </div>
    )
}