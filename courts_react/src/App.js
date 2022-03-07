import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import Login from './components/Login/Login'
import ViewCasesScreen from './components/View Cases/ViewCases'
import ViewCourts from './components/Browse/ViewCourts';
import ViewLists from './components/View Lists/ViewLists';
import Browse from './components/Browse/Browse';
import Header from './components/ Header/Header';
import HomeScreen from './components/Home/Home';
import UploadCases from './components/Admin/uploadEditCase';
import Test from './components/Test/test';
import CreateList from './components/Admin/createList';
import EditCasesScreen from './components/Admin/EditCases';

import firebase from './firebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


import React, { useEffect, useState } from 'react';


function App() {


  // const [loggedIn, setLoggedIn] = useState(loggedIn)



  return (
    <div className="App">

      

      
      <Router>

            <Header/>
     
            <div className="container">

            <Routes>
              <Route path='/'  element={<HomeScreen />} />
              <Route path='/login' element={<Login/>}/>
              <Route path='/editCases' element={<EditCasesScreen listID={"1646611200000 Supreme Court Supreme Court"}/>}/>
              <Route path='/viewCourts' element={<ViewCourts/>}/>
              <Route path='/browse' element={<Browse/>}/>

              {/* <Route path='/booking/:id' element={<BookingScreen/>}/> */}
              <Route path='/test' element={<Test/>}/>
              <Route path='/upload' element={<UploadCases/>}/>
              <Route path='/addList' element={<CreateList/>}/>
              <Route path='/viewLists/:court' element={<ViewLists/>}/>
    
            </Routes>
            
            </div>
            
        </Router>

        
    </div>
  );
}

export default App
