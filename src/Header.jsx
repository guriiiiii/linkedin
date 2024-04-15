import React from 'react'
import "./Header.css";
import SearchIcon from '@mui/icons-material/Search';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import HeaderOptions from './HeaderOptions';
import { useDispatch } from 'react-redux';
import { auth } from './firebase';
import { signOut } from 'firebase/auth';
import { logout } from './features/userSlice';

function Header() {

  const dispatch = useDispatch();

  const logoutOfApp=()=>{
    dispatch(logout);
    signOut(auth);
  }

  return (
    <div className='header'>
      <div className="header__left">
        <img src='https://cdn-icons-png.flaticon.com/256/174/174857.png'/>
        <div className="header__search">
          <SearchIcon/>
          <input type='text' placeholder='Search'/>
        </div>
      </div>
      <div className="header__right">
        <HeaderOptions Icon={HomeIcon} title ="Home"/>
        <HeaderOptions Icon={SupervisorAccountIcon} title ="My Network"/>
        <HeaderOptions Icon={BusinessCenterIcon} title ="Jobs"/>
        <HeaderOptions Icon={ChatIcon} title ="Messaging"/>
        <HeaderOptions Icon={NotificationsIcon} title ="Notifications"/>
        <div className="topRight"><HeaderOptions avatar={true} title="me" onClick={logoutOfApp}/></div>
      </div>
    </div>
  )
}

export default Header
