import axios from "axios";
import {useState} from "react";

import Logo from "../Logo";
import CTA from "../CTA";
import LoginWithGoogle from "./LoginWithGoogle";
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function LoginCard() {

    //set up navigate
    const navigate = useNavigate();

    //set up state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //handle change
    function handleChange(event){
        //destructure the event
        const{name, value} = event.target;
 
        //switch statement to determine which input field is being updated
        switch (name){
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
        }
    }

    //handle login
    function handleLogin(event: any){
        //prevent default form submission
        event.preventDefault();
        //make a post request to the server
        axios.post("/api/login", {
            email: email,
            password: password
        }).then((response) => {
            //log the response
            console.log(response.data);
            //navigate to the dashboard
            navigate("/dashboard");
        }).catch((error) => {
            //display an error message
            toast.error(error.response.data, {
                autoClose: 2000,
                position: "top-center",
            });
        })


    }

    
    return(
        <div className="floatingCard">
            <Logo />
            <div>
                <h1>Welcome to Note</h1>
                <p>Please log in to continue</p>
            </div>

            <div className="inputGroup">
                <form name="loginForm" onSubmit={handleLogin}>
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
                        type="submit"
                        fullWidth={true}    
                    />
                </form>
            </div>
            
            <div className="inputGroup">
            <p>Or log in with:</p>
                <LoginWithGoogle />
            </div>

            <div className="horizontalRule"></div>

            <p>No account yet? <a href="/signup">Sign up</a></p>
        </div>
    )
}