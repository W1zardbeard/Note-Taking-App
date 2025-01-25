export default function NavTag(props) {

    return (
        <div className="navTagCont navItem">
            <div 
                onClick = {() => {
                    if(props.clickHandler){
                        props.clickHandler(props.id);
                    }
                    
                }}
                className=" navTag"
            >
                <div className="iconAndTitle">
                    <img src={props.icon} alt="logo" />
                    <h4>{props.title}</h4>
                </div>
            
            </div>
            <div className="tagDelete"  
                onClick = {() => {
                    if(props.confirmDeleteTag){
                        props.confirmDeleteTag(props.id);
                    }
                    
                }}
                >
                <img src="../src/assets/icon-delete.svg" alt="Delete" />
            </div>
        </div>
    )
}