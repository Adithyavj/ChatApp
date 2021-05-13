import "./App.css";
import React, { useRef, useState } from "react";
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
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
  const SignInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return <button onClick={SignInWithGoogle}>Sign in with Google</button>;
}

function SignOut() {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
  );
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });
    setFormValue("");

    dummy.current.scrollIntoView({ behaviour: "smooth" });
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        <div ref={dummy}></div>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        ></input>
        <button type="submit" disabled={!formValue}>
          🕊️
        </button>
      </form>
    </>
  );
}

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  const messageClass = uid === auth.currentUser.uid ? "send" : "recieved";

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} />
      <p>{text}</p>
    </div>
  );
}

export default App;
