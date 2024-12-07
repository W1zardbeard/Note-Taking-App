import LoginCard from "../components/login/LoginCard"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    return (
        <div className="loginPage">
            <LoginCard />
            <ToastContainer />
        </div>
    )
    }