// import all chat pages
import "./chat/assets/app.css"
import React from 'react'
import Index from "./chat/index"
import Messenger from "./chat/Messenger"
import Chat from "./chat/Chat"

import { Switch, Route } from "react-router-dom"

import ChatState from './chat/context/ChatState'
import NewChat from "./chat/NewChat"
import Bookmark from "./chat/Bookmark"
import Profile from "./chat/Profile"
import Login from "./chat/Login"
import Signup from "./chat/Signup"
import Post from "./chat/Post"
import CreatePost from "./chat/components/CreatePost"
import MyPost from "./chat/MyPost"

function App() {

  return <div className="App">
    <ChatState>
      <Switch>
        {/* set all chat design routes */}
        <Route exact path="/">
          <Index />
        </Route>
        <Route path="/chats">
          <Messenger />
        </Route>
        <Route path="/chat">
          <Chat />
        </Route>
        <Route path="/new-chat">
          <NewChat />
        </Route>
        <Route path="/bookmark">
          <Bookmark />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Signup />
        </Route>
        <Route path="/my-post">
          <MyPost />
        </Route>
        <Route path="/post">
          <Post />
        </Route>
        <Route path="/create-post">
          <CreatePost />
        </Route>
      </Switch>
    </ChatState>


  </div>;
}

export default App;
