import Tag from './Tag';

export default function NoteListItem(props:any){

    function setSelected(){
        console.log("Selected note: ", props.note);
        props.setSelected(props.note.noteId);
    }
    return(
        <div 
            onClick={() => setSelected()}
            className="noteListItem">
                <h3 className="noteTitle">{props.note?.noteTitle}</h3>
                <div className='tagContainer'>
                    {props.note?.noteTags.length > 0 ?
                        props.note?.noteTags.map((tag, index) => (
                            <Tag 
                                key={index}
                                tag={tag}
                            />
                        ))
                    :
                    <Tag 
                        tag="No tags"
                    />
                    }
                    
                </div>
                <p className='pSmall date'>{props.note?.noteLastEditDate}</p>
        </div>
    )
}