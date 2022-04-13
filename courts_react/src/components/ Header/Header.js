import React, { useEffect, useState } from 'react';
import  './Header.css'
import firebase from '../../firebase'
import { useNavigate } from "react-router-dom";


export default function Header() {



    const [loggedIn, setLoggedIn] = useState(localStorage.getItem("authID") !== null)
    const [user, setUser] = useState("Admin")
    const navigate = useNavigate();

    const auth = firebase.auth()


    const login = () =>  {
        
        navigate("../login", { replace: true });
    }

    const logout = () =>  {

        auth.signOut()
        setLoggedIn(false)
        localStorage.removeItem("authID");
        navigate("../", { replace: true });
    }


    const storageListener = (e) =>
    {
        console.log("Storage Changed",e)
    }

    const onAuthStateChanged = (user) => {
        console.log("User",user)
        setLoggedIn(user !== null)
      }

    const goHome = () =>{
        navigate("../", { replace: true });
    }

    useEffect(async () => {

        auth.onAuthStateChanged(onAuthStateChanged)
        window.addEventListener('storage', storageListener);
 
    }, []);


    return (
        <div className="header">

            <div className="logoSection" onClick={goHome}>
                <img className="logoIV" src="assets/logo.png" />
                <span>Real-Time Legal Diary</span>
            </div>
           <div className ="linkSection"></div>
           <div className ="authSection">
              { loggedIn && <div className="loggedIn">
                <img className="logoIV" src="assets/logo.png" />
                <div>{user}</div>
                <div className="loginBtn" onClick={logout}>Log Out</div>
              </div> }

              { !loggedIn && <div>
                <div className="loginBtn" onClick={login}>Log In</div>
              </div> }
           </div>
            
        </div>
    )
}
