import "./App.css";
import React from "react";
import firebase from "firebase/app";
import "firebase/firestore"; //db
import "firebase/firebase-auth"; //user authentication

//using hooks
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  //your config
  apiKey: "AIzaSyCbWCAquNMWZJLtYuKeqIwozqN3TKGMKR8",
  authDomain: "chatapp-aaa6d.firebaseapp.com",
  projectId: "chatapp-aaa6d",
  storageBucket: "chatapp-aaa6d.appspot.com",
  messagingSenderId: "711177375993",
  appId: "1:711177375993:web:7bff70646c13a5d2841228",
  measurementId: "G-B8J4YKL5LV",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header className="App-header"></header>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

function SignIn(){
  return (
    <button>Sign in with Google</button>
  )

}

function ChatRoom(){

}

export default App;
