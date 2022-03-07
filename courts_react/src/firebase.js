import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import 'firebase/compat/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAmEJS7YvI4V8-LPAJT4ljrEw6n05bN7WM",
    authDomain: "courts-webapp.firebaseapp.com",
    databaseURL: "https://courts-webapp.firebaseio.com",
    projectId: "courts-webapp",
    storageBucket: "courts-webapp.appspot.com",
    messagingSenderId: "884106417776",
    appId: "1:884106417776:web:746a3e7be2ae6e12b286b5",
    measurementId: "G-ENJHPXP4G6"
  };

  firebase.initializeApp(firebaseConfig)
  
  
  export default firebase;