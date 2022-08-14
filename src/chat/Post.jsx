import React,{useEffect,useContext} from 'react'
import axios from 'axios'
import PostNavBar from './components/PostNavBar'
import PostView from "./components/ViewPost";
import InputField from './components/post/Input';
import PostContext from "./context/ChatContext"

function Post() {
  const context = useContext(PostContext);
  
    return (
        <div>
            <PostNavBar post={context.onePost} />
            <PostView post={context.onePost}/>
            <InputField/>
        </div>
    )
}

export default Post
