export default function CTA(props){

    switch(props.style){
        case "primary":
            return(
                <button 
                    className={props.fullWidth ? "btnPrimary fullWidth" : "btnPrimary"}
                    type={props.type}
                    disabled={props.disabled}
                    onClick = {() => {
                        if(props.clickHandler){
                            props.clickHandler();
                        }
                        
                    }}
                >
                    {props.text}
                </button>
            )
            break;
        case "secondary":
            return(
                <button 
                    className={props.fullWidth ? "btnSecondary fullWidth" : "btnSecondary"} 
                    type={props.type}
                    disabled={props.disabled}
                    onClick = {() => {
                        if(props.clickHandler){
                            props.clickHandler();
                        }
                    }}
                >
                    {props.text}
                </button>
            )
            break;
        case "borderBtn":
            return(
                <button 
                    className={props.fullWidth ? "borderBtn fullWidth" : "borderBtn"} 
                    type={props.type}
                    disabled={props.disabled}
                    onClick = {() => {
                        if(props.clickHandler){
                            props.clickHandler();
                        }
                    }}
                >
                    {props.text}
                </button>
            )
            break;
    }
    
}