import {useState, useEffect} from 'react';

import Tag from '../Tag';
import AddTag from './AddTag';
import SaveBar from './SaveBar';
export default function NoteContent(props){

    const [noteId, setNoteId] = useState(props.selectedNote || "");
    const [noteTitle, setNoteTitle] = useState(props.note?.noteTitle || "");  
    const [noteContent, setNoteContent] = useState(props.note?.noteContent || "");
    const [noteTags, setNoteTags] = useState([]);
    const [noteLastEditDate, setNoteLastEditDate] = useState("");

    useEffect(() => {
        setNoteId(props.selectedNote);
        setNoteTitle(props.note?.noteTitle || "");
        setNoteContent(props.note?.noteContent || "");
        setNoteTags(props.note?.noteTags);
        setNoteLastEditDate(props.note?.noteLastEditDate);
     
    }, [props.selectedNote]);

    function updateTitle(title: string){
        setNoteTitle(title);
        props.updateSelectedNoteTitle(noteId, title);
    }

    return(
        <div className="noteContent">

            <div className="noteContentHeader">
                <input 
                    type="text"
                    className="noteTitleInput"
                    placeholder='Enter title here'
                    value={noteTitle}
                    onChange={(e) => updateTitle(e.target.value)}
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

            <SaveBar />


        </div>


      
    )
}