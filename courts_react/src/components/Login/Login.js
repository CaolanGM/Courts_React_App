import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Login.css'
import firebase from '../../firebase'
import { useNavigate } from "react-router-dom";



export default function Login() {




    const auth = firebase.auth()


    const [emailText,setEmailText] = useState('')
    const [passwordText,setPasswordText] = useState('')
    const navigate = useNavigate();

    const login = (e) => 
    {
        e.preventDefault()
        setEmailText('')
        setPasswordText('')
        


        auth.signInWithEmailAndPassword(emailText, passwordText)
        .then(() => {
                    
            console.log("LOGGED IN")
            localStorage.setItem("Authenticated", true);
            
            let authID = auth.currentUser.uid
            console.log("AuthID",authID)

            localStorage.setItem("authID", authID);
            navigate("../", { replace: true });
        })
        .catch((err) => {
            console.log('Login',err)
        })
    }

      

    return (
        <div className='container'>
        <div className="loginContainer">

            
            <form onSubmit={login}>
                <label for="uname"><b>Username</b></label>
                <input type="text" placeholder="Enter Username" name="uname" required value={emailText} onChange={(e) => setEmailText(e.target.value)}/>
                <label for="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" required value={passwordText} onChange={(e) => setPasswordText(e.target.value)}/>
                    
                <button className='submitButton' type="submit">Login</button>
            </form>
            
            
        </div>
        </div>
    )
}
