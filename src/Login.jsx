import React, { useState } from 'react'
import "./Login.css"
import { auth } from './firebase'
import { useDispatch } from 'react-redux'
import { login } from './features/userSlice'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';

function Login() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [profilePic, setProfilePic] = useState("")
    const dispatch = useDispatch();

    const register =()=>{
        if(!name){
            return alert("Please enter a full name!")
        }

        createUserWithEmailAndPassword(auth,email,password).then((userAuth)=>{
            const user = userAuth.user
            return updateProfile(user,{
                displayName:name,
                photoURL: profilePic,
            }).then(()=> user)
        }).then((user)=>{
            dispatch(login({
                email:user.email,
                uid:user.uid,
                displayName:name,
                photoURL:profilePic,
            }))
        }).catch((err)=> alert(err));
    }

    const loginToApp =(e)=>{
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password).then(userAuth=>{
            dispatch(login({
                email:userAuth.user.email,
                uid:userAuth.user.uid,
                displayName:userAuth.user.name,
                photoURL:userAuth.user.photoURL,
            }))
        }).catch(err=> alert(err))
    }

  return (
    <div className='login'>
      <img
        src="https://news.hitb.org/sites/default/files/styles/large/public/field/image/500px-LinkedIn_Logo.svg__1.png"
        alt="Linkedin main logo"
      />

      <form>
        <input
          placeholder="Full name (required for register)"
          type="text"
          value={name}
          onChange={e=>setName(e.target.value)}
        />

        <input
          placeholder="Profile pic URL (optional)"
          type="text"
          value={profilePic}
          onChange={e=>setProfilePic(e.target.value)}
        />

        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={e=>setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e=>setPassword(e.target.value)}
        />

        <button type="submit" onClick={loginToApp}>
          Sign In
        </button>
      </form>

      <p>
        Not a member?{" "}
        <span className="login__register" onClick={register}>
          Register Now
        </span>
      </p>
    </div>
  )
}

export default Login
