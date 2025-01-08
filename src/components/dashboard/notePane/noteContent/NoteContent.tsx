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

    // Update note on load
    useEffect(() => {
        setNoteId(props.selectedNote);
        setNoteTitle(props.note?.title || "");
        setNoteContent(props.note?.content || "");
        setNoteTags(props.note?.tags);
        setNoteLastEditDate(props.note?.lasteditdate || "");
    }, [props.note]);


    //update note tags
    useEffect(() => {
        setNoteTags(props.note?.tags);
    }, [props.note?.tags]);

    // Update note title
    function updateTitle(title: string){
        setNoteTitle(title);
        props.updateSelectedNoteTitle(noteId, title);
<<<<<<< HEAD
       
        
=======
        setNoteLastEditDate(new Date().toISOString().slice(0, 10));
        props.updateSelectedNoteLastEditDate(noteId, noteLastEditDate);
>>>>>>> bd6a459b8a906031dbb522f597993480a1cf9fc9
    }

    // Update note content
    function updateContent(content: string){
        setNoteContent(content);
        props.updateSelectedNoteContent(noteId, content);
<<<<<<< HEAD
      
     
=======
        setNoteLastEditDate(new Date().toISOString().slice(0, 10));
        props.updateSelectedNoteLastEditDate(noteId, noteLastEditDate);
       
>>>>>>> bd6a459b8a906031dbb522f597993480a1cf9fc9
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