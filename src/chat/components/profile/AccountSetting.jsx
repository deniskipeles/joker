import React, { useContext, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/Input"
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom"
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import AddIcon from "@material-ui/icons/AddCircle";
//import Login from "@material-ui/icons/Login";
import ChatContext from '../../context/ChatContext'
import IconButton from "@material-ui/core/IconButton"
import PhotoCamera from "@material-ui/icons/PhotoCamera"


import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  viewedUserImages1: {
    display: 'inline-block',
    border: '2px solid rgb(233, 228, 228)',
    //marginLeft: '-20px'
  }
}));

export default function ControlledAccordions(props) {
  const classes = useStyles();
  const history = useHistory();
  const context = useContext(ChatContext)
  
  const [expanded, setExpanded] = React.useState(false);
  const [password, setPassword] = React.useState('');
  
  useEffect(()=>{
    if (context.refresh==true) {
      window.location.reload()
    }
    context.setRefresh(false);
  },[context.refresh]);
  
  function loginFunction(argument) {
      //context.setRefresh(true)
      history.push('/login')
  }
  
  function accountSetting(accnt) {
        let accounts=localStorage.getItem('accounts');
        if(accounts!=null && accounts!=undefined){
          accounts=JSON.parse(accounts);
        }
        if(accounts==null || accounts==undefined){
          accounts=[];
        }
        accounts=accounts.map(obj=>{
          if (obj.user._id==accnt._id) {
            obj.user.photo=accnt.photo
            return obj;
          }
          return obj;
        })
        
        localStorage.setItem('accounts',JSON.stringify(accounts));
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  
  const [selectedImage, setSelectedImage] = useState();
  const handlePost = () => {
    const formData = new FormData();
    formData.append('photo',selectedImage)
    if(selectedImage){
      axios.put('/',formData)
      .then(res=>{
        /*dispatch({
          type: 'loginSuccess',
          payload: 'Added Successfully'
        });*/
        accountSetting(res.data)
        context.setUserFromServer(res.data);
        removeSelectedImage();
        history.push('/profile');
      })
      .catch(err=>{
        console.log(err);
        /*dispatch({
          type: 'loginFailed',
          payload: 'Post not Added'
        });*/
      });
    }else{
        /*dispatch({
          type: 'loginFailed',
          payload: 'Post not Added'
        });
        */
        alert('select an image')
    }
  };
  
  const handlePasswordChangePost = () => {
    const formData = new FormData();
    formData.append('password',password)
    //formData.append('insult',state.insult)
    if(password.length>0){
      axios.put('/',formData)
      .then(res=>{
        /*dispatch({
          type: 'loginSuccess',
          payload: 'Added Successfully'
        });*/
        context.setUserFromServer(res.data);
        setPassword('');
        history.push('/profile');
      })
      .catch(err=>{
        console.log(err);
        /*dispatch({
          type: 'loginFailed',
          payload: 'Post not Added'
        });*/
      });
    }else{
        /*dispatch({
          type: 'loginFailed',
          payload: 'Post not Added'
        });
        */
        alert('please set password')
    }
  };
  

  // This function will be triggered when the file field change
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
  
  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setSelectedImage();
  };
  

  return (
    <div className={classes.root}>
          <List style={{backgroundColor: '#a38dd8'}} >
            <ListItem button divider>
              <ListItemIcon>
                <IconButton color="primary" aria-label="upload picture" component="label">
                <input hidden accept="image/*" onChange={imageChange} type="file" />
                  <PhotoCamera />
                </IconButton>
              </ListItemIcon>
              <ListItemText>
                UPLOAD PROFILE  
              </ListItemText>
            {selectedImage && (
              <div style={styles.preview}>
                <img
                  src={URL.createObjectURL(selectedImage)}
                  style={styles.image}
                  alt="Thumb"
                />
                <button onClick={removeSelectedImage} style={styles.delete}>
                  Remove This Image
                </button>
              </div>
            )}
            {selectedImage ? <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={handlePost}
            disabled={selectedImage ? false : true}>
            upload
          </Button>: null}
            </ListItem>
          </List>
          <List style={{backgroundColor: '#a38dd8'}} >
            <ListItem button divider>
              <ListItemIcon>
                PASSWORD
              </ListItemIcon>
              <ListItemText>
                <TextField
                placeholder="change password"
                onChange={passwordChange}
                value={password}
                />
              </ListItemText>
            {password.length > 0 ? <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={handlePasswordChangePost}
            disabled={password.length > 0 ? false : true}>
            change
          </Button>: null}
            </ListItem>
          </List>
    </div>
  );
}




const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  preview: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
  },
  image: { maxWidth: "100%", maxHeight: 320 },
  delete: {
    cursor: "pointer",
    padding: 15,
    background: "red",
    color: "white",
    border: "none",
  },
};