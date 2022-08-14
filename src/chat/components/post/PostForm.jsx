import React, {
  useContext, useState
} from "react";
import axios from "axios";

import ChatContext from "../../context/ChatContext";

import IconButton from "@material-ui/core/IconButton"
import PhotoCamera from "@material-ui/icons/PhotoCamera"
import { useReducer, useEffect } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom"

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

//state type

const initialState = {
  insult: '',
  image: '',
  isButtonDisabled: true,
  helperText: '',
  isError: false
};


const reducer = (state, action)=> {
  switch (action.type) {
    case 'setPost': 
      return {
        ...state,
        insult: action.payload
      };
    case 'setImage': 
      return {
        ...state,
        image: action.payload
      };
    case 'setIsButtonDisabled': 
      return {
        ...state,
        isButtonDisabled: action.payload
      };
    case 'loginSuccess': 
      return {
        ...state,
        helperText: action.payload,
        isError: false
      };
    case 'loginFailed': 
      return {
        ...state,
        helperText: action.payload,
        isError: true
      };
    case 'setIsError': 
      return {
        ...state,
        isError: action.payload
      };
  }
}


function PostForm() {
  const classes = useStyles();
  const context = useContext(ChatContext)
  let history = useHistory()
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.insult.trim()) {
     dispatch({
       type: 'setIsButtonDisabled',
       payload: false
     });
    } else {
      dispatch({
        type: 'setIsButtonDisabled',
        payload: true
      });
    }
  }, [state.insult]);

  const handlePost = () => {
    const formData = new FormData();
    selectedImage ? formData.append('image',selectedImage) : null
    formData.append('insult',state.insult)
    axios.post('/insult/post/',formData)
      .then(res=>{
        dispatch({
          type: 'loginSuccess',
          payload: 'Added Successfully'
        });
        context.viewPost(res.data);
        history.push('/post');
      })
      .catch(err=>{
        dispatch({
          type: 'loginFailed',
          payload: 'Post not Added'
        });
      });
  };
  
  

  const handleKeyPress = (event) => {
    if (event.keyCode === 13 || event.which === 13) {
      state.isButtonDisabled || handlePost();
    }
  };

  const handlePostChange = (event) => {
      dispatch({
        type: 'setPost',
        payload: event.target.value
      });
    };

  const handleImageChange =  (event) => {
      dispatch({
        type: 'setImage',
        payload: event.target.value
      });
    }
    
    
  const [selectedImage, setSelectedImage] = useState();

  // This function will be triggered when the file field change
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setSelectedImage();
  };
  
  
  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="POST PAGE" />
        <CardContent>
          <div>
            <TextField
              error={state.isError}
              fullWidth
              multiline
              minRows={5}
              id="insult"
              type="text"
              label="insult"
              placeholder="insult"
              margin="normal"
              onChange={handlePostChange}
              onKeyPress={handleKeyPress}
            />
            {/*<TextField
              error={state.isError}
              fullWidth
              id="image"
              type="file"
              label="image"
              placeholder="image"
              margin="normal"
              helperText={state.helperText}
              onChange={handleImageChange}
              onKeyPress={handleKeyPress}
            />*/}
            <IconButton color="primary" aria-label="upload picture" component="label">
              <input hidden accept="image/*" onChange={imageChange} type="file" />
              <PhotoCamera />
            </IconButton>
    
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
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.loginBtn}
            onClick={handlePost}
            disabled={state.isButtonDisabled}>
            POST INSULT
          </Button>
          
        </CardActions>
      </Card>
    </form>
  );
}



export default PostForm;




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

