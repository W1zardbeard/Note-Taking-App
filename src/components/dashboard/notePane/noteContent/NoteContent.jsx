import {useState, useEffect} from 'react';

import Tag from '../Tag';
import AddTag from './AddTag';
import SaveBar from './SaveBar';




export default function NoteContent(props){

    // State
    const [noteId, setNoteId] = useState("");
    const [noteTitle, setNoteTitle] = useState("");  
    const [noteContent, setNoteContent] = useState("");
    const [noteTags, setNoteTags] = useState([]);
    const [noteLastEditDate, setNoteLastEditDate] = useState("");
    const [noteArchived, setNoteArchived] = useState();



    // Update note on load
    useEffect(() => {
        setNoteId(props.selectedNote);
        setNoteTitle(props.note?.title || "");
        setNoteTags(props.note?.tags || []);
        setNoteLastEditDate(props.note?.lasteditdate || "");
        setNoteArchived(props.note?.isarchived || null);
    }, [props.note]);


    //update note tags
    useEffect(() => {
        setNoteTags(props.note?.tags || []);
    }, [props.note?.tags]);

    // Update note title
    function updateTitle(title){
        setNoteTitle(title);
        props.updateSelectedNoteTitle(noteId, title);
       
        
    }

    // Update note content
    function updateContent(content){
        setNoteContent(content);
        props.updateSelectedNoteContent(noteId, content);
      
     
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
                            noteTags.map((tag, index) => (
                                <Tag 
                                key={index}
                                id={tag.id} 
                                name={tag.name} 
                                />
                            ))
                        :
                        null
                        }
                        <AddTag 
                            openTagModal={props.newTag}
                        />
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
                onChange={(e) => updateContent(e.target.value)}
            />

            <SaveBar 
                saveNote={props.saveNote}
            />


        </div>


      
    )
}