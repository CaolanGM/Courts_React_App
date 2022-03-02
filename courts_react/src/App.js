import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import Login from './components/Login/Login'
import ViewCasesScreen from './components/View Cases/ViewCases'
import ViewCourts from './components/Browse/ViewCourts';
import Browse from './components/Browse/Browse';
import Header from './components/ Header/Header';
import React, { useEffect, useState } from 'react';


function App() {


  const [loggedIn, setLoggedIn] = useState(false)


  const setAuth = (authenticated) => {

    console.log("Auth",authenticated)
    setLoggedIn(authenticated)

  }


  return (
    <div className="App">

      <Header setAuth={setAuth}/>

      <div className="container">
      <Router>
     
            <Routes>
              <Route path='/' exact element={
                <>
                  <h1>Home</h1>
                </>
              } />
              <Route path='/login' element={<Login/>}/>
              <Route path='/viewCases' element={<ViewCasesScreen editMode={true}/>}/>
              <Route path='/viewCourts' element={<ViewCourts/>}/>
              <Route path='/browse' element={<Browse authenticated={loggedIn}/>}/>

              {/* <Route path='/booking/:id' element={<BookingScreen/>}/> */}

    
            </Routes>
            
    
            
        </Router>

        </div>
    </div>
  );
}

export default App
