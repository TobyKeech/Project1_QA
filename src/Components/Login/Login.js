import React, { useState } from 'react';
import { SERVER_URL } from '../Login/constants.js';
import Home from '../Home/Home.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useNavigate } from 'react-router';
import { withRouter } from 'react-router-dom';

const Login = () => {
    let navigate = useNavigate();
    const [user, setUser] = useState({ username: '', password: '' })
    const [isAuthenticated, setAuth] = useState(false);

    const handleChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value })
    }

    //console.log(user);
    const login = () => {
        axios
            .post(SERVER_URL + 'api/token/login', user)
            .then((res) => {
                if (res.data.authorizationToken) {

                    console.log("Token data: " + res.data.authorizationToken)
                    const jwtToken = res.data.authorizationToken;
                    if (jwtToken) {
                        sessionStorage.setItem("jwt", jwtToken);
                        setAuth(true);
                       /**  if (res.AccessToken)
                        {
                            localStorage.setItem("jwt", res.AccessToken);
                            sessionStorage.setItem("jwt", jwtToken);
                        }*/
                        
                    }
                    else {
                        toast.warn('Check your username and password 1', {
                            //position: toast.POSITION.BOTTOM_LEFT
                        })
                    }
                }
            })
            .catch((error) => {
                console.log(error.message)
                toast.warn('Check your username and password', {
                    //position: toast.POSITION.BOTTOM_LEFT
                })
            })
    }

    if (isAuthenticated === true) {
        //navigate('/');
        //return (<Home/>)
        window.history.back();
        //history.back();
    }
    else {
        return (
                        <>
                        <label for="Username" >Username: </label><br/>
            <input type={"text"} name="username"label="Username" onChange={handleChange} /><br/>
            <label for="Username" >Password: </label><br/>
 <input type="password" name="password"
            label="Password" onChange={handleChange} /><br/><br/>
 <button type="button" variant="outlined" style={{ backgroundColor: "rgb(255, 192, 203)" }}onClick={login}>
     Login
 </button>
 <ToastContainer autoClose={5000} />
 </>

        );
    }
}

export default Login;