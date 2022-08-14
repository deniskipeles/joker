
import React, {useContext} from 'react'
import {makeStyles} from "@material-ui/core/styles"
import SecondUser from '../Chatting/SecondUser'
import FirstUser from '../Chatting/FirstUser'

import ChatContext from "../../context/ChatContext"

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
    let messages = context.onePost.comments_data;
    let user = context.user;
    //console.log(user);
    messages=(messages != undefined && messages!=null) ? [...messages] : []
    let messageList = messages

    
    const styles = customStyles()
    return (
        <div className={styles.root}>
            <div align="center"> <p className={styles.chatSectionDay}> <b>COMMENTS</b> </p> </div>
            {
                messageList.map((msg, k) => {
                    if(msg.user._id === user._id){
                        return <FirstUser key={msg._id} message={msg.comment} />
                    } else {
                        return <SecondUser key={msg._id} image={msg.user.photo} message={msg.comment} />
                    }
                })
            }
        </div>
    )
}

export default Chatting
