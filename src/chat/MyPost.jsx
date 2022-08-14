import React, {useContext,useEffect} from "react";
//import LoadingButton from '@material-ui/lab/LoadingButton';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import Stories from "./components/Stories";
import Bottombar from "./components/Bottombar";
import ChatContext from "./context/ChatContext";
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Backdrop from './utils/backdrop';


const useStyles = makeStyles((theme) =>
  createStyles({
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
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff'
    },
    card: {
      marginTop: theme.spacing(10)
    }
  })
);


function Index() {
  
  const [open, setOpen] = React.useState(false);
  const classes=useStyles()
  const context = useContext(ChatContext)
  useEffect(()=>{
    if (context.refresh==true) {
      fetchInsults();
      window.location.reload()
    }
      context.setRefresh(false);
  },[context.refresh]);
  
  function handleLoadMore() {
    setOpen(true)
    axios.get(`/insult/post/my/posting/?skip=${context.myPosts.length}`)
      .then(res=>{
        context.setLoadMoreMyPosts(res.data);
        setOpen(false);
      })
      .catch(err=>{
        console.log(err);
        setOpen(false)
      })
  }
  
  
  function fetchInsults() {
    axios.get('/insult/post/my/posting/')
      .then(res=>{
        context.setFetchMyPosts();
        context.setMyPosts(res.data);
      })
      .catch(err=>{
        console.log(err);
      })
  }
  
  
  return (
    <div>
      <Navbar />
      {/*<Stories />*/}
      <div style={{marginBottom: 80}}>
      {context.myPosts.map((eachPost, k) => (
        <Post key={k} post={eachPost} />
      ))}
      </div>
      
      {<div>
      <div className={classes.container}>
      <Backdrop open={open}/>
      <Button
        variant="contained"
        size="large"
        color="secondary"
        className={classes.loginBtn}
        onClick={handleLoadMore}
        >
        Load More
      </Button>
      </div>
      </div>}
      {<div>
      <div className={classes.container}>
      <Button
        variant="contained"
        size="large"
        color="secondary"
        className={classes.loginBtn}
        onClick={fetchInsults}
        >
        Refresh
      </Button>
      </div>
      </div>}
      <div className={classes.container}>
      </div>
      <Bottombar/>
    </div>
  );
}

export default Index;
