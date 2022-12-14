import React, {useContext} from 'react'

import {useHistory} from "react-router-dom"

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper"
import IconButton from "@material-ui/core/IconButton"

import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import VideoIcon from "@material-ui/icons/VideoCallOutlined"
import CallIcon from '@material-ui/icons/CallOutlined'
import DeleteIcon from "@material-ui/icons/Delete"//InfoOutlined"
import ChatContext from '../context/ChatContext';
import axios from 'axios';

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

function ChatNavBar(props) {

    const context = useContext(ChatContext)

    const history = useHistory()
    
    function deletePostFunc() {
      axios.delete(`/insult/post/${props.post.insultId}`)
        .then(res=>{
          history.push('/')
        })
        .catch(err=>{
          alert('error occured while deleting your post');
        })
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
                    <p className={styles.userLastSeen}>Go Back</p>
                </span>
                {/*
                <IconButton>
                    <VideoIcon/>
                </IconButton>
                <IconButton>
                    <CallIcon/>
                </IconButton>
                */}
                {context.user._id == context.onePost.userId ?
                <IconButton onClick={deletePostFunc}>
                    <DeleteIcon/>
                </IconButton>
                : null
                }
           </Paper> 
        </div>
    )
}

export default ChatNavBar;
