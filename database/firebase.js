import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCNO-4TpKcNyMjIul_XoLw9qGft8DLc_p4",
    authDomain: "reactstarterlogin.firebaseapp.com",
    databaseURL: "https://reactstarterlogin.firebaseio.com",
    projectId: "reactstarterlogin",
    storageBucket: "reactstarterlogin.appspot.com",
    messagingSenderId: "409702991680",
    appId: "1:409702991680:web:31f6a4cfd17ad2c64d5ca5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
export default firebase;  
