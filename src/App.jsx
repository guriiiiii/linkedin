import { useEffect, useState } from 'react'
import './App.css'
import React from 'react'
import Header from './Header.jsx'
import Login from './Login.jsx'
import Sidebar from './Sidebar.jsx'
import Feed from './Feed.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout, selectUser } from './features/userSlice.js'
import { auth } from './firebase.js'
import { onAuthStateChanged } from 'firebase/auth';
import Widgets from './Widgets.jsx'

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
        if (userAuth) {
            //user is logged in
            dispatch(login({
                email: userAuth.email,
                uid: userAuth.uid,
                displayName: userAuth.displayName,
                photoURL: userAuth.photoURL,
            }))
        } else {
            dispatch(logout());
        }
    });

    // Call unsubscribe when the component unmounts
    return unsubscribe;
}, []);

  return (
    <div className="app">
      <Header/>
      {!user?(<Login/>):(
        <div className="app__body">
          <Sidebar/>
          <Feed/>
          <Widgets/>
        </div>
      )}
    </div>
  )
}

export default App
