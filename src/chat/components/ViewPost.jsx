import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles";
import axios from 'axios';
import moment from 'moment';

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Button from "@material-ui/core/Button"
import CardMedia from "@material-ui/core/CardMedia"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogAction from "@material-ui/core/DialogActions"

import MoreVertIcon from "@material-ui/icons/MoreVert"
import LikeIcon from "@material-ui/icons/ThumbUpAltOutlined"
//import ThumbUpOffAlt from "@material-ui/icons/ThumbUpOffAlt"
//import ThumbUpAlt from "@material-ui/icons/ThumbUpAlt"
import Favorite from "@material-ui/icons/Favorite"
import FavoriteBorder from "@material-ui/icons/FavoriteBorder"
import CommentIcon from "@material-ui/icons/CommentOutlined"
import ShareIcon from "@material-ui/icons/ShareOutlined"

// import Image from "../assets/avatar.png"
import Image2 from "../assets/avatar.png"
import Image3 from "../assets/avatar1.jpeg"
import Image4 from "../assets/avatar2.png"
import ChatContext from "../context/ChatContext";
import Keyword from "./key-values";
import CommentInput from "./CommentInput";
import Comments from "./post/Comments";

const customStyles = makeStyles(() => ({
  root: {
        margin: 10,
        marginTop: 77,
        marginBottom: 80
    },
  avatar: {
    width: '50px',
    height: '50px'
  },
  body: {
    marginTop: '0px',
    fontSize: '15px'
  },
  card: {
    borderRadius: '14px'
  },
  actionText: {
    fontSize: '13px',
    textTransform: 'lowercase'
  },
  actionText1: {
    fontSize: '13px',
    marginRight: 'auto',
    textTransform: 'lowercase'
  },
  viewedUserImages: {
    display: 'inline-block',
    border: '2px solid rgb(233, 228, 228)',
  },
  viewedUserImages1: {
    display: 'inline-block',
    border: '2px solid rgb(233, 228, 228)',
    marginLeft: '-20px'
  }
}));

function Post({ post }) {
  const styles = customStyles();
  const [menu, setMenu] = useState(false)
  const [dialog, setDialog] = useState({status: false, data: ''})
  const context = useContext(ChatContext)
  const bookmarkList = context.bookmarks.map(obj=>obj.insultId)
  
  function addBookmark() {
    axios.post('/add/bookmark/',{post:post.insultId})
      .then(res=>{
        context.addToBookMark(post)
      })
      .catch(err=>{
        alert("post not bookmarked")
      })
  }
  function deleteBookmark() {
    axios.post('/remove/bookmark/',{post:post.insultId})
      .then(res=>{
        context.removeFromBookmark(post)
      })
      .catch(err=>{
        alert("post not Unsaved from bookmark")
      })
  }

  const bookmark = () => {
    bookmarkList.includes(post.insultId) ? alert('Already Bookmarked') : addBookmark()
    setMenu(null)
    setDialog({status: true, data: 'Post Saved'})
  }
  
  const removeFromBookmark = () => {
    bookmarkList.includes(post.insultId) ? deleteBookmark() : alert('Not Bookmarked')
    setMenu(null)
    setDialog({status: true, data: 'Post Unsaved'})
  }
  
  /*
  const history = useHistory()
  
  const view_post = post_id => {
    context.viewPost(post_id)
    history.push(`/post`)
  }
  */

  
  const likeFunction = () => {
    axios.post('/insult/like',{insult:post.insultId})
      .then(res=>{
        context.likePost(res.data);
      })
      .catch(err=>{
        console.log(err);
      })
      //alert(post_id)
  }

  const viewedUserImages = [Image2, Image4]

  return (
    <div className={styles.root}>
      <Dialog open={dialog.status} onClose={() => setDialog({status: false, data: ''})}>
        <DialogTitle> {dialog.data} </DialogTitle>
        <DialogAction>
          <Button onClick={() => setDialog({status: false, data: ''})} size="small" variant="contained" color="primary">Close</Button>
        </DialogAction>
      </Dialog>
      <Card className={styles.card}>
        <CardHeader
          avatar={<Avatar src={post.userImage} className={styles.avatar} />}
          action={
            <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={(e) => setMenu(e.currentTarget)}>
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <span style={{ fontSize: '16px' }}>
              <b> {post.userName} </b>
            </span>
          }
          subheader={moment(post.time).fromNow()}
        />
        <Menu
          id="simple-menu"
          anchorEl={menu}
          keepMounted
          open={Boolean(menu)}
          onClose={(e) => setMenu(null)}
        >
          <MenuItem onClick={(e) => setMenu(null)}>User Profile</MenuItem>
          { bookmarkList.includes(post.insultId) ? <MenuItem onClick={removeFromBookmark}>Unsave</MenuItem> : <MenuItem onClick={bookmark}>Save</MenuItem> }
        </Menu>
        {post.bodyImg ? <CardMedia component="img" image={post.bodyImg} alt={post.userName} /> : <></>}
        <CardContent style={{ paddingTop: 15 }}>
          <p className={styles.body}>
            {post.body}
          </p>
          <div>
            {/* <Avatar className={styles.viewedUserImages} src={Image3} />
            {viewedUserImages.map(user => (
              <Avatar key={user} className={styles.viewedUserImages1} src={user} />
            ))*/}
          </div>
        </CardContent>

        <CardActions>
          <Button onClick={likeFunction} className={styles.actionText} startIcon={post.liked ? <Favorite /> : <FavoriteBorder/>}>
            {post.likes ==1 ? '1 like' :(post.likes==0 ? 'no likes' : `${post.likes} likes`)}
          </Button>
          <Button onClick={likeFunction} className={styles.actionText1} startIcon={<CommentIcon />}>
            {post.thoughts} {Keyword.comments}
          </Button>
          <Button startIcon={<ShareIcon />} />
        </CardActions>
        <Comments/>
      </Card>
    </div>
  );
}

export default Post;
