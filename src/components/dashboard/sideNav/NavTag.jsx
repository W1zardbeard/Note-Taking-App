export default function NavTag(props) {

    return (
        <div 
            onClick = {() => {
                if(props.clickHandler){
                    props.clickHandler();
                }
                
            }}
            className="navItem navTag"
        >
            <div className="iconAndTitle">
                <img src={props.icon} alt="logo" />
                <h4>{props.title}</h4>
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