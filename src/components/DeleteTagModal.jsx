import CTA from './CTA';
import { useState, useEffect } from 'react';

export default function DeleteTagModal(props){
  

        
          
        
            function closeModal(){
                console.log("close modal");
                props.deleteTag(false);
                props.setIsOpenDeleteTagModal(false);
            }
        
            function deleteNote(){
                props.deleteTag(true);
                props.setIsOpenDeleteTagModal(false);
            }
        
            
        
            return(
                <div className="modal">
                    <div className="modalBackground">
                        <div className="modalContainer">
                            <div className="modalHeader">
                                <h2>Delete tag</h2>
                                <p>Are you sure you want to delete this tag?<br/> This will remove it from all notes. </p>
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