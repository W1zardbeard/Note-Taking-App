import CTA from './CTA';
import { useState, useEffect } from 'react';

export default function TagModal(props){

    const [tag , setTag] = useState("");
    const [noteId, setNoteId] = useState();
    // Update note on load
    useEffect(() => {
        setNoteId(props.selectedNote);
    }, [props.selectedNote]);

    function updateTag(tag){
        setTag(tag);
    }

    function closeModal(){
        console.log("close modal");
        props.setIsOpenTagModal(false);
    }

    function addTag(){
        props.addNewTag(noteId, tag);
        props.setIsOpenTagModal(false);
    }

        // // Update note title
        // function updateTitle(title: string){
        //     setNoteTitle(title);
        //     props.updateSelectedNoteTitle(noteId, title);
        // }

    return(
        <div className="modal">
            <div className="modalBackground">
                <div className="modalContainer">
                    <div className="modalHeader">
                        <h2>Add tag</h2>
                        <p>Type in your new tag or select a previously created one</p>
                    </div>
                    <div className="modalBody">
                        <div className="inputField">
                            <input
                                
                                name="tag" 
                                type="text" 
                                placeholder="eg. work"
                                value={tag}
                                onChange={(e) => updateTag(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="modalFooter">
                        <CTA
                               text="Cancel"
                               style="secondary"
                               fullWidth={false}
                               clickHandler={closeModal}
                        />
                        <CTA
                               text="Add tag"
                               style="primary"
                               fullWidth={false}
                               clickHandler={addTag}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}