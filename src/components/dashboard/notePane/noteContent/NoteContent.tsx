import {useState, useEffect} from 'react';

import Tag from '../Tag';
import AddTag from './AddTag';
export default function NoteContent(props){

    const [noteTitle, setNoteTitle] = useState("");
    const [noteContent, setNoteContent] = useState("");
    const [noteTags, setNoteTags] = useState([]);
    const [noteLastEditDate, setNoteLastEditDate] = useState("");

    useEffect(() => {
        setNoteTitle(props.note?.title);
        setNoteContent(props.note?.content);
        setNoteTags(props.note?.tags);
        setNoteLastEditDate(props.note?.lastEditDate);
    }, [props.note]);

    return(
        <div className="noteContent">

            <div className="noteContentHeader">
                <input 
                    type="text"
                    className="noteTitleInput"
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                />
                <div className="detailsCont">
                    <div className="detailsTitleCont">
                        <img className='detailsIcon' src="../src/assets/icon-tag.svg" alt="Note tags"/>
                        <p>Tags</p>
                    </div>                   
                    <div className='tagContainer'>
                        {noteTags?.length > 0 ?
                           noteTags?.map((tag, index) => (
                                <Tag 
                                    key={index}
                                    tag={tag}
                                />
                            ))
                        :
                        null
                        }
                        <AddTag />
                    </div>
                </div>

                <div className="detailsCont">
                    <div className="detailsTitleCont">
                        <img className='detailsIcon' src="../src/assets/icon-clock.svg" alt="Note tags"/>
                        <p>Last edited</p>
                    </div>                   
                    <p>{noteLastEditDate}</p>
                </div>

                
            </div>



            <div className="horizontalRule"></div>
            <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
            />
        </div>


      
    )
}