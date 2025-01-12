import CTA from './CTA';
import { useState, useEffect } from 'react';

export default function DeleteModal(props){

  

    function closeModal(){
        console.log("close modal");
        props.deleteNote(false);
        props.setIsOpenDeleteModal(false);
    }

    function deleteNote(){
        props.deleteNote(true);
        props.setIsOpenTagModal(false);
    }

    

    return(
        <div className="modal">
            <div className="modalBackground">
                <div className="modalContainer">
                    <div className="modalHeader">
                        <h2>Delete note</h2>
                        <p>Are you sure you want to delete this note?</p>
                    </div>
                 
                    <div className="modalFooter">
                        <CTA
                               text="Cancel"
                               style="secondary"
                               fullWidth={false}
                               clickHandler={closeModal}
                        />
                        <CTA
                               text="Delete"
                               style="warning"
                               fullWidth={false}
                               clickHandler={deleteNote}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}