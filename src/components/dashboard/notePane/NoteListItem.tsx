import Tag from './Tag';

export default function NoteListItem(props:any){

    function setSelected(){
        console.log("Selected note: ", props.note);
        props.setSelected(props.note.noteId);
    }

    // const lastEditDate = props.note?.lasteditdate.substr(0, 10);

    return(
        <div 
            onClick={() => setSelected()}
            className="noteListItem">
                <h3 className="noteTitle">{props.note?.title}</h3>
                <div className='tagContainer'>
                    {props.note?.tags.length > 0 ?
                        props.note?.tags.map((tag, index) => (
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
                {/* <p className='pSmall date'>{lastEditDate}</p> */}
        </div>
    )
}