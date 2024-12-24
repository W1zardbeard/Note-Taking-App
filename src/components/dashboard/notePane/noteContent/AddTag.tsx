export default function AddTag(props){
    function openTagModal(){
            props.openTagModal(true);
    }
    return(
        <div className="addTag" onClick={openTagModal}>
            <img src="../src/assets/icon-plus.svg" alt="add"/>
            <p className="pSmall">Add tag</p>
        </div>
    )
}