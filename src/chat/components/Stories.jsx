import React, {useContext} from "react";
import { useHistory } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
// import Add from "@material-ui/icons/Add";
import Paper from "@material-ui/core/Paper";

import Image from "../assets/avatar1.jpeg"
import Image2 from "../assets/avatar.png"
import Image3 from "../assets/avatar2.jpeg"
import Image4 from "../assets/avatar2.png"
import Values from "./key-values"
import ChatContext from "../context/ChatContext";


const customStyles = makeStyles(() => ({
  root: {
    padding: "13px",
  },
  storiesHeader: {
    fontSize: "13px",
    color: "blue",
  },
  storiesDiv: {
    overflowX: "auto",
    overflowY: "hidden",
    whiteSpace: "nowrap",
  },
  storyAvatar: {
    display: "inline-block",
    marginRight: "12px",
    width: '47px',
    height: '47px',
    border: '2px solid #8181e2'
  },
}));

function Stories() {
  const history = useHistory()
  const styles = customStyles();
  const context = useContext(ChatContext)

  const stories = context.topPosts;
  function avatarClick(post) {
    context.viewPost(post);
    history.push(`/post`)
  }

  return (
    <Paper>
      <div className={styles.root}>
        <h1 className={styles.storiesHeader}> {Values.short_stories} </h1>
        <div className={styles.storiesDiv}>
          {stories.map((story, k) => (
            <Avatar onClick={()=>avatarClick(story)} variant="circular" src={story.bodyImg} className={styles.storyAvatar} key={k} align="center">
        
            </Avatar>
          ))}
        </div>
      </div>
    </Paper>
  );
}

export default Stories;
