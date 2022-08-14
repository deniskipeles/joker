import React,{useEffect,useContext} from 'react'

import axios from 'axios'
import CreatePostNavBar from './post/CreatePostNavBar'
import PostForm from "./post/PostForm";

import PostContext from "../context/ChatContext"

function CreatePost() {
  const context = useContext(PostContext);
  
    return (
        <div>
            <CreatePostNavBar/>
            <PostForm />
        </div>
    )
}

export default CreatePost
