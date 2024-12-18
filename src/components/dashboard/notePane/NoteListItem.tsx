import Tag from './Tag';

export default function NoteListItem(props:any){
    return(
        <div className="noteListItem">
            <h3 className="noteTitle">{props.note.noteTitle}</h3>
            <div className='tagContainer'>
                {props.note.noteTags?.length > 0 ?
                    props.note.noteTags.map((tag, index) => (
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
            <p className='pSmall date'>{props.note.noteLastEditDate}</p>
        </div>
    )
}