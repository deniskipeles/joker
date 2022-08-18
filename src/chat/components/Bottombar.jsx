import React, { useState, useEffect, useContext } from "react";

import { useHistory } from "react-router-dom"

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import Fab from "@material-ui/core/Fab"
import Paper from "@material-ui/core/Paper"
import { makeStyles } from "@material-ui/core/styles";

import Home from "@material-ui/icons/Home";
import Chat from "@material-ui/icons/Chat";
import Add from "@material-ui/icons/Add";
import AddCircle from "@material-ui/icons/AddCircle";
import Bookmark from "@material-ui/icons/Bookmark";
import CreateMessage from "@material-ui/icons/ChatBubbleOutlineOutlined"
import Person from "@material-ui/icons/Person"
import axios from 'axios';
import ChatContext from '../context/ChatContext'
//import socket from '../utils/socket'
//import  {io}  from "socket.io-client";

//const socket = io("http://localhost:8000")


const customStyles = makeStyles(() => ({
  root: {
    bottom: 0,
    position: "fixed",
    width: '100vw !important',
    zIndex: 999
  },
  fabDiv: {
    marginRight: '10px',
    marginBottom: "10px"
  }

}));

function Bottombar() {
  let path = window.location.pathname;
  
  const [token, setToken] = useState(null);
  const [fetch, setFetch] = useState(true);
  const context = useContext(ChatContext);
  
  let setChats = context.setChats
  let setMessages = context.setMessages
  let setUser = context.setUserFromServer;
  
  
  
  useEffect(()=>{
    axios.defaults.headers.common['Authorization'] = token;
    //socket.emit('hey','there')
    //if(fetch){
      if(path=='/profile'){
        fetchUser();
      }
      if (path=='/my-post' && context.fetchMyPost<3) {
        fetchMyPost();
      }else{
        context.setFetchMyPosts()
      }
      
      if (path=='/' && context.fetchPost<3) {
        fetchInsults();
        fetchTopPost();
      }else{
        context.setFetchPost()
      }
      if(path=='/chats'){
        fetchMessages();
      }
      if(path=='/bookmark'){
        fetchBookmark();
      }
    //} 
  }, [token]);
  
  function fetchInsults() {
    if(token){
      axios.get('/insult/post/')
        .then(res=>{
          context.setPost(res.data);
          context.setFetchPost();
        })
        .catch(err=>{
          context.setFetchPost();
        })
    }else{
      axios.get('/insult/post/anonymous/user/')
        .then(res=>{
          context.setPost(res.data);
          context.setFetchPost();
        })
        .catch(err=>{
          context.setFetchPost();
        })
    }
  }
  
  function fetchBookmark() {
    axios.get('/my/bookmarks/')
      .then(res=>{
        context.setBookmarks(res.data);
      })
      .catch(err=>{
        //context.setFetchPost();
        console.log(err);
      })
  }
  
  function fetchMyPost() {
    axios.get('/insult/post/my/posting/')
      .then(res=>{
        context.setFetchMyPosts();
        context.setMyPosts(res.data);
      })
      .catch(err=>{
        //context.setPost([]);
      })
  }
  
  function fetchTopPost() {
    axios.get('/insult/post/top/ten')
      .then(res=>{
        //alert(JSON.stringify(res.data));
        context.setTopPost(res.data);
      })
      .catch(err=>{
        //context.setPost([]);
      })
  }
  
  function fetchMessages(){
    axios.get('/chat/one-to-one/')
      .then(res=>{
          setMessages(res.data);
          setChats(res.data);
          setFetch(false);
          //alert(JSON.stringify(res));
      })
      .catch(err=>{
        //setMessages([]);
        //alert('JSON.stringify(err)');
      });
  }
  
  function fetchUser() {
    axios.get('/my/account/')
      .then(res=>{
        setUser(res.data);
        context.setUserAccount(res.data);
      })
      .catch(err=>{
        //setUser({});
      })
  }
  
  
  
  
  
  
  
  

  let history = useHistory()

  
  let message = false
  let mainPage = false

  if (path === "/chats") {
    message = true
  } else {
    message = false
  }

  path === '/' ? mainPage = true : mainPage = false
  const [value, setValue] = useState(path);

  
  
  useEffect(()=>{
    let getToken;
    try {
      getToken=localStorage.getItem('token');
    } catch (e) {
      //console.log(e);
      getToken=null;
    }
    if (getToken !== null && getToken !== undefined) {
      setToken(`Bearer ${getToken}`);
    }else{
      setToken(null);
    }
  },[])
  const styles = customStyles();

  const handleLink = (pathname) => {
    switch (pathname) {
      case 'home':
        history.push('/')
        break;
      case 'chats':
        if(token){
          history.push('/chats')
        }else{
          history.push('/login')
        }
        break;
      case 'create':
        history.push('/')
        break;
      case 'bookmark':
        if(token){
          history.push('/bookmark')
        }else{
          history.push('/login')
        }
        break;
      case 'profile':
        if(token){
          history.push('/profile')
        }else{
          history.push('/login')
        }
        break;
      case 'new-chat':
        if(token){
          history.push('/new-chat')
        }else{
          history.push('/login')
        }
        break;
      default:
        history.push('/')
    }
  }
  
  function createPost() {
    history.push('create-post')
  }

  return (
    
    <div className={styles.root}>
      {message &&
        <div align="right" className={styles.fabDiv}>
          <Fab className={styles.fab} color="primary" onClick={() => handleLink('new-chat')}>
            <CreateMessage />
          </Fab>
        </div>
      }

      {mainPage &&
        <div align="right" className={styles.fabDiv}>
          <Fab onClick={createPost} className={styles.fab} color="primary">
            <Add />
          </Fab>
        </div>
      }

      <Paper className={styles.paper}>
        <BottomNavigation className={styles.bar} showLabels value={value} onChange={(e, newValue) => {
          setValue(newValue)
        }}>
          <BottomNavigationAction value="/" label="Home" icon={<Home />} onClick={() => handleLink('home')} />
          <BottomNavigationAction value="/chats" label="Chats" icon={<Chat />} onClick={() => handleLink('chats')} />
          <BottomNavigationAction
            onClick={() => handleLink('bookmark')}
            value="/bookmark"
            label="Bookmarks"
            icon={<Bookmark />}
          />
          <BottomNavigationAction
            onClick={() => handleLink('profile')}
            value="/profile"
            label="Me"
            icon={<Person />}
          />
        </BottomNavigation>
      </Paper>

    </div>
  );
}

export default Bottombar;
