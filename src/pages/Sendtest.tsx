import React, { useState } from "react";
import axios from "axios";
import CTA from "../components/CTA";


export default function Sendtest() {


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

    function handleSignUp(event:any){
        event.preventDefault();
        axios.post("/api/test", {
            email: email,
            password: password
            
        }).then((response) => {
            
            console.log(response);
        }).catch((error) => {
            toast.error(err.response.data, {
                autoClose: 2000,
                position: "top-center",
            });
        })


    }
    return (
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
    )
}