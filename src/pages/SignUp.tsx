import SignUpCard from "../components/signUp/SignUpCard"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp(props){
    return(
        <div className="loginPage">
        <SignUpCard />
        <ToastContainer />
    </div>
    )
}