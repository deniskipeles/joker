import React,{useEffect} from 'react'
import axios from 'axios'
import ChatNavBar from './components/ChatNavBar'
import Chatting from './components/Chatting'
import InputField from './components/Chatting/InputField';
import ChatContext from "./context/ChatContext"

function Chat() {
  
    return (
        <div>
            <ChatNavBar/>
            <Chatting/>
            <InputField/>
        </div>
    )
}

export default Chat
