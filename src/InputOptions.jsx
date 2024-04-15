import React, { useRef, useState } from 'react'
import "./InputOption.css"
import {storage} from "./firebase.js";
import {ref, uploadBytesResumable,getDownloadURL } from 'firebase/storage';
import { db } from './firebase.js'
import {collection, addDoc, onSnapshot, serverTimestamp} from "firebase/firestore"
import {Close } from '@mui/icons-material';
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice';
import CreateIcon from "@mui/icons-material/Create"

export default function InputOptions({title, Icon, color, form}) {

  const user = useSelector(selectUser)
  
  const [input, setInput] = useState("");
  const [textInput, setTextInput] = useState("");

  const handlePost =(e)=>{
    e.preventDefault();
    upload([
      {file:img, label:"postImg"}
    ])
    disable();
  }

  const sendPost = async (url) => {

    await addDoc(collection(db, "posts"),{
      name: user.displayName,
      description: user.email,
      message: textInput,
      messagePhoto:url,
      photoUrl:user.photoURL||"",
      timestamp: serverTimestamp(),
    });

    setInput("");
  };

  const inputRef = useRef(null);
  const [active, setActive] = useState(false);
  const [img, setImg] = useState("");

  const upload = (items)=>{
    items.forEach(item=>{
      const fileName = new Date().getTime() + user.displayName + item.file.name;
      const storageRef = ref(storage,`/items/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, item.file);
      uploadTask.on("state_changed",(snapshot)=>{
        const progress= (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        console.log("Upload is "+ progress+ " % done.")
      }, (err)=>{
        console.log(err)
      },
      ()=>{
        getDownloadURL(storageRef).then((url)=>{
          sendPost(url);
        })
      }
      );
    })
  }

  const handleUpload =(e)=>{
    e.preventDefault();
    upload([
      {file:img, label:"postImg"}
    ])
  }

  const handleClick =()=>{
    inputRef.current.click();
  }

  const disable = ()=>{
    setActive(false)
  }

  const handleChange =(e)=>{
    const file = e.target.files[0];
    setActive(true);
    setImg(e.target.files[0]);
  }
  return (
    <div>
      {form ? (
        <div className='inputOption' onClick={handleClick}>
          <Icon style={{ color: color }}/>
          <h4>{title}</h4>
          <form>
            <input type='file' ref={inputRef} onChange={handleChange}/>
          </form>
        </div>
      ) : (
        <div className='inputOption'>
          <Icon style={{ color: color }} />
          <h4>{title}</h4>
        </div>
      )}
      {active ?
        <div className='inputBack'>
          <div className='photo'>
            <p className='closeIcon' onClick={disable}>
            <Close/>
            </p>   
            <img src={URL.createObjectURL(img)}/>
            <div className="options__input">
                <CreateIcon/>
                <form>
                    <input value={textInput} onChange={(e) => setTextInput(e.target.value)}type="text" />
                    <p><button className='postButton' onClick={handlePost}>Post</button></p>
                </form>
            </div>
          </div>
        </div> : <div></div>
      }
    </div>
  )
}