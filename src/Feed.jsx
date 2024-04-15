import React, { useState, useEffect } from 'react'
import "./Feed.css"
import CreateIcon from "@mui/icons-material/Create"
import ImageIcon from "@mui/icons-material/Image"
import SubscriptionsIcon from "@mui/icons-material/Subscriptions"
import EventNoteIcon from "@mui/icons-material/EventNote"
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay"
import InputOptions from './InputOptions.jsx'
import Post from './Post.jsx'
import { db } from './firebase.js'
import {collection,query, getDoc, addDoc, onSnapshot, serverTimestamp, orderBy} from "firebase/firestore"
import FlipMove from 'react-flip-move'
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice.js'

function Feed() {

  const user = useSelector(selectUser)
  
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async()=>{
      try{
        const getPosts = onSnapshot(
          query(collection(db, "posts"), orderBy("timestamp", "desc")),
          (snapshot) => {
              setPosts(
                  snapshot.docs.map((doc) => ({
                      id: doc.id,
                      data: doc.data(),
                  }))
              );
          }
      );      
      }catch(err){
        console.log(err)
      }
    }
    getPosts();
  }, []);

  const sendPost = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "posts"),{
      name: user.displayName,
      description: user.email,
      message: input,
      photoUrl:user.photoURL||"",
      timestamp: serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className='feed'>
      <div className="feed__inputContainer">
        <div className="feed__input">
            <CreateIcon/>
            <form>
                <input value={input} onChange={(e) => setInput(e.target.value)}type="text" />
                <button type='submit' onClick={sendPost}>Send</button>
            </form>
        </div>
        <div className="feed__inputOptions">
            <InputOptions Icon ={ImageIcon} title = "Photo" color="#70B5F9" form={true}/>
            <InputOptions title="Video" Icon={SubscriptionsIcon} color="#E7A33E" form={false} />
            <InputOptions title="Event" Icon={EventNoteIcon} color="#C0CBCD" form={false} />
            <div className='disable'><InputOptions
                title="Write article"
                Icon={CalendarViewDayIcon}
                color="#7FC15E"
                form={false}
            /></div>
        </div>
      </div>   
      <FlipMove>
      {posts.map(({ id, data: { name, description, message, messagePhoto,photoUrl } }) => (
          <Post
            key={id}
            name={name}
            desc={description}
            message={message}
            photoUrl={photoUrl}
            messagePhoto={messagePhoto}
          />))}
      </FlipMove>
    </div>
  )
}

export default Feed
