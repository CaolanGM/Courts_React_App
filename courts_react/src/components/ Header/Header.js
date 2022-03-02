import React, { useEffect, useState } from 'react';
import  './Header.css'

export default function Header(setAuth) {


    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState("Caolan")


    const login = () =>  {
        setLoggedIn(true)
        setAuth(true)
    }

    const logout = () =>  {
        setLoggedIn(false)
        setAuth(false)

    }



    return (
        <div className="header">

            <div className="logoSection">
                <img className="logoIV" src="assets/logo.png" />
                <span>Court Project</span>
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
