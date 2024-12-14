import Tag from './Tag';

export default function NoteListItem(props:any){
    return(
        <div className="noteListItem">
            <h3 className="noteTitle">{props.note.title}</h3>
            <div className='tagContainer'>
                {props.note.tags?.length > 0 ?
                    props.note.tags.map((tag, index) => (
                        <Tag 
                            key={index}
                            tag={tag}
                        />
                    ))
                :
                null
                }
                
            </div>
            <p className='pSmall date'>{props.note.date}</p>
        </div>
    )
}