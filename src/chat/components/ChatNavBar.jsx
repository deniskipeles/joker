import React, {useContext} from 'react'

import {useHistory} from "react-router-dom"
import moment from 'moment'
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper"
import IconButton from "@material-ui/core/IconButton"

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import VideoIcon from "@material-ui/icons/VideoCallOutlined"
import CallIcon from '@material-ui/icons/CallOutlined'
import InfoIcon from "@material-ui/icons/InfoOutlined"
import ChatContext from '../context/ChatContext';

const customStyles = makeStyles(() => ({
    root: {
        top: 0,
        position: 'fixed',
        width: '100vw !important',
        zIndex: 999
    },
    paper: {
        borderRadius: "0px",
        display: 'flex'
    },
    userBar: {
        display: 'inline-block',
        flexGrow: 1
    },
    userName: {
        fontSize: '16px',
        marginBottom: 0,
        marginTop: 14
    },
    userLastSeen: {
        fontSize: '13px',
        color: 'grey',
        marginBottom: 14,
        marginTop: 0
    },
    backButton: {
        display: 'inline-block',
        // marginTop: '-20px'
    }
}))

function ChatNavBar() {

    const context = useContext(ChatContext)

    const history = useHistory()
    
    function videoChat() {
      alert("video call coming soon")
    }
    function callChat() {
      alert("insults calls coming soon")
    }
    function infoFunction() {
      history.push('/privacy')
    }

    const styles = customStyles()
    return (
        <div className={styles.root}>
           <Paper className={styles.paper}>
                <IconButton className={styles.backButton} onClick={() => history.goBack()}>
                    <ChevronLeftIcon/>
                </IconButton>
                <span className={styles.userBar}>
                    <p className={styles.userName}> <b> {context.user.userName} </b> </p>
                    <p className={styles.userLastSeen}>Last seen {moment(context.chatUser.lastSeen).fromNow()}</p>
                </span>
                <IconButton onClick={videoChat}>
                    <VideoIcon/>
                </IconButton>
                <IconButton onClick={callChat}>
                    <CallIcon/>
                </IconButton>
                <IconButton onClick={infoFunction}>
                    <InfoIcon/>
                </IconButton>
           </Paper> 
        </div>
    )
}

export default ChatNavBar;
