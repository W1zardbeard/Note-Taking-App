export default function NavItem(props) {
    return (
        <div 
            onClick = {() => {
                if(props.clickHandler){
                    props.clickHandler();
                }
                
            }}
            className="navItem"
        >
            <img src={props.icon} alt="logo" />
            <h4>{props.title}</h4>
        </div>
    )
}