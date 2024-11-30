import Logo from "../Logo";
import {useState} from "react";
import CTA from "../CTA";
import LoginWithGoogle from "./LoginWithGoogle";

export default function LoginCard() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleChange(event){
        const{name, value} = event.target;

        switch (name){
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
        }
    }

    function handleLogin(){
        console.log(email, password);
    }

    
    return(
        <div className="floatingCard">
            <Logo />
            <div>
                <h1>Welcome to Note</h1>
                <p>Please log in to continue</p>
            </div>

            <div className="inputGroup">
                <div className="inputField">
                    <label htmlFor="email">Email address</label>
                    <input
                        onChange={handleChange}
                       
                        name="email" 
                        type="email" 
                        placeholder="eg. simon@email.com"
                        value={email}
                    />
                </div>

                <div className="inputField">
                    <label htmlFor="email">Password</label>
                    <input
                        onChange={handleChange}
                      
                        name="password" 
                        type="password" 
                        placeholder="Your password"
                        value={password}
                    />
                </div>

                <CTA
                    text="Log in"
                    style="primary"
                    clickHandler={handleLogin}
                    type="submit"
                    fullWidth={true}    
                />
            </div>
            
            <div className="inputGroup">
            <p>Or log in with:</p>
                <LoginWithGoogle />
            </div>

            <div className="horizontalRule"></div>

            <p>No account yet? <a href="google.com">Sign up</a></p>
        </div>
    )
}