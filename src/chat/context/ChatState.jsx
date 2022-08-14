import React, { useReducer } from 'react'
import moment from 'moment'
import axios from 'axios'

import ChatContext from "./ChatContext"
import ChatReducer from "./ChatReducer"


//import user images
import Img1 from "../assets/avatar.png"
import Img2 from "../assets/avatar1.jpeg"
import Img3 from "../assets/avatar2.png"
import Img4 from "../assets/avatar2.jpeg"
import Ajr from "../assets/ajr.jpg"
import socket from "../utils/socket"

import {
    SEND_MESSAGE,
    INCOMING_MESSAGE,
    SET_SEARCH_BAR,
    SET_MESSENGER_SEARCH,
    SET_USER,
    ADD_TO_BOOKMARK,
    SET_CHATS,
    SET_CHAT_MESSAGES,
    SET_CHAT_USER,
    SET_POST,
    SET_MY_POST,
    SET_VIEW_POST,
    SET_USER_ACCOUNT,
    SET_TOP_POST,
    SET_USERS,
    SET_REFRESH,
    SET_FETCH_POST,
    SET_FETCH_MY_POST
} from './types'



function retArray(argument) {
  const array=[]
  for (const [key, value] of Object.entries(argument)) {
    array.push(value);
  }
  return array;
}

const ChatState = props => {
    let initialState = {
        refresh:false,
        fetchPost:0,
        fetchMyPost:0,
        user: {},
        account: {},
        onePost: {},
        chatUser: {},
        messages: [],
        chats: [],
        users: [],
        posts: [],
        myPosts: [],
        topPosts: [],
        bookmarks: [],
        searchBar: false,
        messengerSearchList: []
    }
    //localStorage.removeItem('store');
    
    const store=localStorage.getItem('store');
    const storeChat=localStorage.getItem('storeChat');
    if(store && store != undefined){
      initialState = JSON.parse(store);
    }
    if(storeChat && storeChat != undefined){
      initialState.chatUser = JSON.parse(storeChat);
    }
    

    const [state, dispatch] = useReducer(ChatReducer, initialState)
    
    const setLocalState=()=>{
      let stringifySate=JSON.stringify(state);
      localStorage.setItem('store',stringifySate);
    }
    const setLocalChatUser=(user)=>{
      let stringifySate=JSON.stringify(user);
      localStorage.setItem('storeChat',stringifySate);
    }
    
    socket.on("incoming-message",(msg)=>{
      setIncomingMessage(msg);
    })
    
    //setting the chat container or the one on one messages
    const setIncomingMessage = (text) => {
        //text.messages=retArray(text.messages);
        if(state.chatUser.id===text.id){
          dispatch({
            type: SET_CHAT_USER,
            payload: text
          })
        }
        
        let messages = [...state.messages]
        //console.log(messages);
        messages = messages.filter(chat => chat.id !== text.id);
        messages.unshift(text);
        
        
        //setUserMessages(messages);
        dispatch({
            type: INCOMING_MESSAGE,
            payload: messages
        })
        
        setUserChats(messages);
        setLocalState();
    }

    const setUser = (user) => {

        dispatch({
            type: SET_USER,
            payload: user
        })
        setLocalState();
    }
    
    const setUserAccount = (user) => {
        dispatch({
            type: SET_USER_ACCOUNT,
            payload: user
        })
        setLocalState();
    }
    
    const setRefresh = (refresh) => {
        dispatch({
            type: SET_REFRESH,
            payload: refresh
        })
        setLocalState();
    }
    
    const setFetchPost = () => {
        let fetch=state.fetchPost;
        fetch+=1;
        if(fetch>5) fetch=0;
        dispatch({
            type: SET_FETCH_POST,
            payload: fetch
        })
        setLocalState();
    }
    
    const setFetchMyPosts = () => {
        let fetch=state.fetchMyPost;
        fetch+=1;
        if(fetch>5) fetch=0;
        dispatch({
            type: SET_FETCH_MY_POST,
            payload: fetch
        })
        setLocalState();
    }
    
    const setUsers = (users) => {
        dispatch({
            type: SET_USERS,
            payload: users
        })
        setLocalState();
    }
    
    const setLoadMoreUsers = (users) => {
      users=[...state.users,...users];
      
        dispatch({
            type: SET_USERS,
            payload: users
        })
        setLocalState();
    }
    
    const setChatUser = (chat) => {
        dispatch({
            type: SET_CHAT_USER,
            payload: chat
        })
        setLocalState();
        setLocalChatUser(chat);
    }
    
    const setUserChats = (chatArray) => {
        const newMessages = chatArray.map(chat=>{
          
          if(chat.messages.length > 0){
            chat.messageExcerpt=chat.messages[0].message
            chat.time=moment(chat.messages[0].time).fromNow()
            chat.unread=(chat.messages.filter(obj=>obj.unread==true)).length
          }
          return chat;
        });
        //console.log(newMessages);

        dispatch({
            type: SET_CHATS,
            payload: newMessages
        })
        setLocalState();
    }
    
    
    const setUserMessages = (newMessages) => {
      newMessages.map(obj=>{
        let user={
          user_id:obj.id,
          room:obj.container
        }
        socket.emit("connect-to-view-online-user", user);
        socket.emit("join-room", user);
        //obj.messages=retArray(obj.messages);
        return obj;
      })
      //alert(JSON.stringify(newMessages))
        dispatch({
            type: SET_CHAT_MESSAGES,
            payload: newMessages
        })
        setLocalState();
    }
    
    const setPost = (posts) => {
      dispatch({
          type: SET_POST,
          payload: posts
      })
      setLocalState();
      posts.map(obj=>{
        let post={
          post_id:obj.insultId,
        }
        socket.emit("connect-to-view-post", post);
      })
    }
    
    const setMyPosts = (posts) => {
      dispatch({
          type: SET_MY_POST,
          payload: posts
      })
      setLocalState();
      posts.map(obj=>{
        let post={
          post_id:obj.insultId,
        }
        socket.emit("connect-to-view-post", post);
      })
    }
    
    const setLoadMorePost = (posts) => {
      
      //alert(newPosts.length)
      let newPosts = [...state.posts, ...posts]
      dispatch({
          type: SET_POST,
          payload: newPosts
      })
      setLocalState();
      posts.map(obj=>{
        let post={
          post_id:obj.insultId,
        }
        socket.emit("connect-to-view-post", post);
      });
    }
    
    const setLoadMoreMyPosts = (posts) => {
      let newPosts = [...state.myPosts, ...posts]
      dispatch({
          type: SET_MY_POST,
          payload: newPosts
      })
      setLocalState();
      posts.map(obj=>{
        let post={
          post_id:obj.insultId,
        }
        socket.emit("connect-to-view-post", post);
      });
    }
    
    const setTopPost = (posts) => {
      //alert(JSON.stringify(newMessages))
      dispatch({
          type: SET_TOP_POST,
          payload: posts
      })
      setLocalState();
      posts.map(obj=>{
        let post={
          post_id:obj.insultId,
        }
        socket.emit("connect-to-view-post", post);
      })
    }
    
    const likePost = (post) => {
      const arr = [...state.posts];
      if (state.onePost.insultId==post.insultId) {
        viewPost(post)
      }
      const newPosts = arr.map(element => {
        if (element.insultId === post.insultId) {
          return post;
        }
        return element;
      });
      
        dispatch({
            type: SET_POST,
            payload: newPosts
        })
        setLocalState();
    }
    
    const setUserFromServer = (user) => {
        dispatch({
            type: SET_USER,
            payload: user
        })
        setLocalState();
    }
    
    const sendComment = (comment) => {
        comment.user={
              _id:state.user._id,
              full_name:state.user.full_name,
              photo:state.user.photo,
        }
        if (state.onePost.insultId==comment.insult) {
            let post = {...state.onePost}
            let comments = [...post.comments_data]
            comments.unshift(comment)
            post.comments_data=comments
            post.thoughts +=1
            viewPost(post)
        }
        socket.emit("comment-a-post", comment);
        let posts=[...state.posts];
        posts = posts.map(post=>{
          if(post.insultId==comment.insult){
            //alert(comment);
            let comments = [...post.comments_data]
            comments.unshift(comment)
            post.comments_data=comments
            post.thoughts +=1
            
            return post;
          }
          return post
        })
        dispatch({
            type: SET_POST,
            payload: posts
        })
        setLocalState();
    }
    
    socket.on("incoming-comment",(msg)=>{
      incomingComment(msg);
      incomingTopTenComment(msg);
    })
    
    const incomingComment = (comment) => {
        if(state.onePost.insultId==comment.insult){
            //alert(comment);
            let post = {...state.onePost}
            let comments = [...post.comments_data]
            comments.unshift(comment)
            
            comments = comments.reduce((acc, current) => {
              const x = acc.find(item => item._id === current._id);
              if (!x) {
                return acc.concat([current]);
              } else {
                return acc;
              }
            }, []);

            post.comments_data=comments
            post.thoughts +=1
            
            viewPost(post)
          }
          
        let posts=[...state.posts];
        posts = posts.map(post=>{
          if(post.insultId==comment.insult){
            //alert(comment);
            let comments = [...post.comments_data]
            comments.unshift(comment)
            
            comments = comments.reduce((acc, current) => {
              const x = acc.find(item => item._id === current._id);
              if (!x) {
                return acc.concat([current]);
              } else {
                return acc;
              }
            }, []);

            post.comments_data=comments
            post.thoughts +=1
            
            return post;
          }
          return post
        })
        dispatch({
            type: SET_POST,
            payload: posts
        })
        setLocalState();
    }
    
    const incomingTopTenComment = (comment) => {
      if(state.onePost.insultId==comment.insult){
            //alert(comment);
            let post = {...state.onePost}
            let comments = [...post.comments_data]
            comments.unshift(comment)
            
            comments = comments.reduce((acc, current) => {
              const x = acc.find(item => item._id === current._id);
              if (!x) {
                return acc.concat([current]);
              } else {
                return acc;
              }
            }, []);

            post.comments_data=comments
            post.thoughts +=1
            
            viewPost(post)
          }
      
        let posts=[...state.topPosts];
        posts = posts.map(post=>{
          if(post.insultId==comment.insult){
            //alert(comment);
            let comments = [...post.comments_data]
            comments.unshift(comment)
            
            comments = comments.reduce((acc, current) => {
              const x = acc.find(item => item._id === current._id);
              if (!x) {
                return acc.concat([current]);
              } else {
                return acc;
              }
            }, []);
            
            post.comments_data=comments
            post.thoughts +=1
            return post;
          }
          return post
        })
        dispatch({
            type: SET_TOP_POST,
            payload: posts
        })
        setLocalState();
    }

    const updateBookMark = (post) => {
        let currentBookmarks = [...state.bookmarks]
        currentBookmarks.map(obj=>obj.insultId!=post.insultId)
        currentBookmarks.unshift(post)
        dispatch({ type: ADD_TO_BOOKMARK, payload: currentBookmarks})
        setLocalState();
    }
    const addToBookMark = (post) => {
        let currentBookmarks = [...state.bookmarks]
        currentBookmarks.push(post)
        dispatch({ type: ADD_TO_BOOKMARK, payload: currentBookmarks})
        setLocalState();
    }

    const removeFromBookmark = (post) => {
        let currentBookmarks = [...state.bookmarks]
        let inds = currentBookmarks.indexOf(post)
        currentBookmarks.splice(inds, 1)
        dispatch({ type: ADD_TO_BOOKMARK, payload: currentBookmarks})
        setLocalState();
    }
    
    const setBookmarks = (posts) => {
        dispatch({ type: ADD_TO_BOOKMARK, payload: posts})
        setLocalState();
    }
    

    const setSearchBar = () => {
        dispatch({
            type: SET_SEARCH_BAR
        })
        setLocalState();
    }

    const setMessengerSearch = (text) => {
        let currentMessengerList = [...state.chats]

        let filteredMessenger = currentMessengerList.filter(message => {
            const regex = new RegExp(`${text}`, "gi");
            return message.userName.match(regex)
        });

        dispatch({
            type: SET_MESSENGER_SEARCH,
            payload: filteredMessenger
        })
        setLocalState();
    }

    
    
    const sendMessage = (text) => {
        text.room = state.chatUser.container;
        socket.emit('sendMessage',text);
        let messages = [...state.messages]
        let chatUser = {...state.chatUser}
        messages = messages.filter(user => user.id !== text.receiver[0])
        
        text.sender='me'
        text.unread=false
        text.time=moment(text.createdAt).fromNow()
        chatUser.messages.unshift(text);
        messages.unshift(chatUser);

        dispatch({
            type: SEND_MESSAGE,
            payload: messages
        })
        setLocalState();
    }
    
    const viewPost = (post) => {

        dispatch({
            type: SET_VIEW_POST,
            payload: post
        })
        setLocalState();
    }
    
    
    
    
    
    

    return <ChatContext.Provider
        value={{
            users: state.users,
            user: state.user,
            chatUser: state.chatUser,
            messages: state.messages,
            posts: state.posts,
            myPosts: state.myPosts,
            refresh: state.refresh,
            topPosts: state.topPosts,
            onePost: state.onePost,
            chats: state.chats,
            searchBar: state.searchBar,
            bookmarks: state.bookmarks,
            messengerSearchList: state.messengerSearchList,
            fetchPost: state.fetchPost,
            fetchMyPost: state.fetchMyPost,
            setFetchPost,
            setFetchMyPosts,
            setChatUser,
            setUser,
            setUsers,
            setUserAccount,
            setPost,
            setMyPosts,
            likePost,
            setTopPost,
            viewPost,
            setLoadMoreUsers,
            setLoadMorePost,
            setLoadMoreMyPosts,
            sendComment,
            setChats:setUserChats,
            setMessages:setUserMessages,
            incomingMessage:setIncomingMessage,
            sendMessage,
            setRefresh,
            setSearchBar,
            setMessengerSearch,
            setUserFromServer,
            addToBookMark,
            setBookmarks,
            removeFromBookmark
        }}
    >
        {props.children}
    </ChatContext.Provider>

}

export default ChatState;