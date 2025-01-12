import CTA from '../../CTA';
import { useEffect, useState } from 'react';

export default function NoteControls(props){

    const [isArchived, setIsArchived] = useState();

    useEffect(() => {
        setIsArchived(props.note?.isarchived);
    }, [props.note]);

    console.log(props.note?.isarchived);

    return(
        <div className="noteControls">

            {isArchived ? 
            <CTA
            text="Unarchive note"
            style="noteControl"
            type="submit"
            fullWidth={false}
            clickHandler={props.unarchiveNote}  
            icon="../src/assets/icon-archive.svg"  
            />
            
            : 
            
            <CTA
                text="Archive note"
                style="noteControl"
                type="submit"
                fullWidth={false}
                clickHandler={props.archiveNote}  
                icon="../src/assets/icon-archive.svg"  
            />
            
            }
            
            

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