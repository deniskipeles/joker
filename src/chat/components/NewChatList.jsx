import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import ChatContext from "../context/ChatContext"

import { makeStyles, createStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom"

import Button from '@material-ui/core/Button';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider"
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/SendRounded"

const customStyles = makeStyles((theme) => createStyles({
  card: {
    borderRadius: '0px',
    // padding: 0
  },
  userImage: {
    width: '60px',
    height: '60px'
  },
  container: {
      marginTop: 77,
      marginBottom: 80,
      display: 'flex',
      flexWrap: 'wrap',
      width: 300,
      margin: `${theme.spacing(0)} auto`
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1
    }
}));

function NewChatList() {

  const [fetch,setFetch] = useState(true)
  const [loading, setLoading] = React.useState(false);
  const context = useContext(ChatContext)
  let chats = context.users
  
  useEffect(()=>{
    if(fetch) {
      axios.get('/')
      .then(res=>{
        context.setUsers(res.data);
        setFetch(false);
      })
      .catch(err=>{
        console.log(err);
      })
    }
  }, [fetch])
  const history = useHistory()

  const enterChat = user => {
    axios.post('/chat/one-to-one/', {
      receiver:user.id
    })
      .then(res=>{
        //alert(JSON.stringify(res.data));
        context.setChatUser(res.data)
        history.push('/chat')
      })
      .catch(err=>{
        //alert('_____'+JSON.stringify(err.response));
        console.log(err);
      })
  }
  
  function handleLoadMore() {
    setLoading(true)
    axios.get(`/?skip=${context.users.length}`)
      .then(res=>{
        context.setLoadMoreUsers(res.data);
        setLoading(false);
      })
      .catch(err=>{
        console.log(err);
        setLoading(false)
        //context.setPost([]);
      })
  }

  const styles = customStyles();
  return (
    <div className="userMessage">
      {
        chats.map((chat, k) => (
          <div key={k}>
            <Card onClick={()=>enterChat(chat)} className={styles.card} elevation={0}>
              <CardHeader
                avatar={<Avatar src={chat.userImage} className={styles.userImage} />}
                action={
                  <div align="right" style={{marginRight: 2}}>
                    <IconButton style={{paddingTop: "25px"}}>
                        <SendIcon/>
                    </IconButton>
                  </div>
                }
                title={
                  <span>
                    <b> {chat.userName} </b>
                  </span>
                }
              />
            </Card>
            <Divider />
          </div>
        ))
      }
      
      {<div>
      <div className={styles.container}>
      {loading ? 'loading...' : 
      <Button
        variant="contained"
        size="large"
        color="secondary"
        className={styles.loginBtn}
        onClick={handleLoadMore}
        >
        Load More
      </Button>}
      </div>
      </div>}
      {/*
      <div>
      <div className={styles.container}>
      <Button
        variant="contained"
        size="large"
        color="secondary"
        className={styles.loginBtn}
        onClick={fetchInsults}
        >
        Refresh
      </Button>
      </div>
      </div>
        */
      }
      <div className={styles.container}>
      </div>
    </div>
  );
}

export default NewChatList;
