import axios from "axios";
import {useState} from "react";
import { useNavigate } from 'react-router-dom';

import Logo from "../Logo";
import CTA from "../CTA";
import LoginWithGoogle from "../login/LoginWithGoogle";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function SignUpCard() {
    //set up state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //set up navigate
    const navigate = useNavigate();

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

    //handle signup
    function handleSignUp(event:any){
        //prevent default form submission
        event.preventDefault();
        //make a post request to the server
        axios.post("/api/register", {
            email: email,
            password: password
        }).then((response) => {
            //log the response
            console.log("User created successfully");
            console.log(response);
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
                <h1>Create your account</h1>
                <p>Sign up to start organizing your notes and boost your productivity.</p>
            </div>

            <div className="inputGroup">
                <form name="loginForm" onSubmit={handleSignUp}>
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
                        text="Sign up"
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

            <p>Already have an account? <a href="/">Login</a></p>
        </div>
    )
}