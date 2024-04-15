import React, {forwardRef, useState} from 'react'
import "./Post.css"
import { Avatar } from '@mui/material'
import InputOptions from "./InputOptions"
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined"
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined"
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined"
import SendOutlinedIcon from "@mui/icons-material/SendOutlined"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const Post = forwardRef(({name, desc, message,messagePhoto, photoUrl, img}, ref) =>{

  const firebaseStoragePattern = /^https:\/\/firebasestorage\.googleapis\.com/;
  const [like, setLike] = useState(false);

  const handleLike = ()=>{
    setLike(!like);
    console.log(like)
  }

  return (
    <div ref={ref} className='post'>
      <div className="post__header">
        <Avatar src={photoUrl}>{name[0]}</Avatar>
        <div className="post__info">
            <h2>{name}</h2>
            <p>{desc}</p>
        </div>
      </div>
      <div className="post__body">
        <p>{message}</p>
        {messagePhoto&&<img src={messagePhoto}/>}
      </div>
      {img&&
      <div className='post__image'>
        <img src={img}/>
      </div>}
      <div className="post__buttons">
        <div onClick={handleLike}>{like?<InputOptions Icon={ThumbUpIcon} title="Like" color="gray"/>:<InputOptions Icon={ThumbUpAltOutlinedIcon} title="Like" color="gray"/>}</div>
        <InputOptions Icon={ChatOutlinedIcon} title="Comment" color="gray" />
        <InputOptions Icon={ShareOutlinedIcon} title="Share" color="gray" />
        <div className='disable'><InputOptions Icon={SendOutlinedIcon} title="Send" color="gray" /></div>
        </div>
    </div>
  )
})

export default Post
