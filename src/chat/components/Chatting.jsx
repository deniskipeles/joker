

import axios from 'axios';
import React, {useContext, useRef, useState, useEffect} from 'react'
import { useParams } from "react-router-dom"
import {makeStyles} from "@material-ui/core/styles"
import SecondUser from './Chatting/SecondUser'
import FirstUser from './Chatting/FirstUser'

import ChatContext from "../context/ChatContext"

const customStyles = makeStyles(() => ({
    root: {
        margin: 10,
        marginTop: 77,
        marginBottom: 80
    },
    chatSectionDay: {
        backgroundColor: 'blue',
        borderRadius: "20px",
        padding: 8,
        width: 70,
        color: 'white',
        fontSize: 13
    }
}))

function reverseArr(input) {
    var ret = new Array;
    for(var i = input.length-1; i >= 0; i--) {
        ret.push(input[i]);
    }
    return ret;
}



function Chatting() {

    let context = useContext(ChatContext)
    let messages = context.chatUser.messages;
    const bottomRef = useRef(null);
    messages=(messages != undefined && messages!=null) ? [...messages] : []
    let messageList = messages.reverse()
    
    useEffect(()=>{
      var unread=(context.chatUser.messages.filter(obj=>obj.unread==true)).length
      if(unread>0){
        let id=context.chatUser.id
        axios.post('/chat/one-to-one-message/read/message/',{chatmate:id})
          .then(res=>{
            if (res.data=='ok') {
              //alert('success')
            }
          })
          .catch(err=>{
            console.log(err);
          })
      }
    }, [context.chatUser])
    
    useEffect(() => {
      bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages]);
    
    const styles = customStyles()
    return (
        <div className={styles.root}>
            <div align="center"> <p className={styles.chatSectionDay}> <b>MESSAGES</b> </p> </div>
            <div>
            {
                messageList.map((msg, k) => {
                    if(msg.sender === 'me'){
                        return <FirstUser key={k} message={msg.message} />
                    } else {
                        return <SecondUser key={k} image={context.chatUser.userImage} message={msg.message} />
                    }
                })
            }
            </div>
            <div ref={bottomRef} />
        </div>
    )
}

export default Chatting





