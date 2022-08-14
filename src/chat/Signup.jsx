import React, {
  useContext
} from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import Stories from "./components/Stories";
import Bottombar from "./components/Bottombar";
import ChatContext from "./context/ChatContext";


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
      //margin: 10,
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
  username: '',
  full_name: '',
  email: '',
  password: '',
  isButtonDisabled: true,
  helperText: '',
  isError: false
};


const reducer = (state, action)=> {
  switch (action.type) {
    case 'setUsername': 
      return {
        ...state,
        username: action.payload
      };
    case 'setFullName': 
      return {
        ...state,
        full_name: action.payload
      };
    case 'setEmail': 
      return {
        ...state,
        email: action.payload
      };
    case 'setPassword': 
      return {
        ...state,
        password: action.payload
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


function Register() {
  const classes = useStyles();
  const context = useContext(ChatContext)
  let history = useHistory()
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.username.trim() && state.email.trim() && state.full_name.trim() && state.password.trim()) {
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
  }, [state.username, state.email, state.full_name, state.password]);

  const handleLogin = () => {
    axios.post('/',state)
      .then(res=>{
        console.log(res.data);
        dispatch({
          type: 'loginSuccess',
          payload: 'Register Successfully'
        });
        localStorage.setItem('token',res.data.token);
        let accounts=localStorage.getItem('accounts');
        if(accounts!=null && accounts!=undefined){
          accounts=JSON.parse(accounts);
        }
        if(accounts==null || accounts==undefined){
          accounts=[];
        }
        accounts=accounts.filter(obj=>obj.user.id!=res.data.user.id)
        accounts.unshift(res.data)
        localStorage.setItem('accounts',JSON.stringify(accounts));
        
        context.setRefresh(true);
        history.push('/');
      })
      .catch(err=>{
        dispatch({
          type: 'loginFailed',
          payload: 'Existing Username or Email'
        });
      });
  };

  const handleKeyPress = (event) => {
    if (event.keyCode === 13 || event.which === 13) {
      state.isButtonDisabled || handleLogin();
    }
  };

  const handleUsernameChange = (event) => {
      dispatch({
        type: 'setUsername',
        payload: event.target.value
      });
    };
    
  const handleEmailChange = (event) => {
      dispatch({
        type: 'setEmail',
        payload: event.target.value
      });
    };
    
  const handleFullNameChange = (event) => {
      dispatch({
        type: 'setFullName',
        payload: event.target.value
      });
    };

  const handlePasswordChange =
    (event) => {
      dispatch({
        type: 'setPassword',
        payload: event.target.value
      });
    }
  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="Login App" />
        <CardContent>
          <div>
            {<TextField
              error={state.isError}
              fullWidth
              id="username"
              type="text"
              label="Username"
              placeholder="Username"
              margin="normal"
              onChange={handleUsernameChange}
              onKeyPress={handleKeyPress}
            />}
            {<TextField
              error={state.isError}
              fullWidth
              id="email"
              type="email"
              label="Email"
              placeholder="Email"
              margin="normal"
              onChange={handleEmailChange}
              onKeyPress={handleKeyPress}
            />}
            {<TextField
              error={state.isError}
              fullWidth
              id="full_name"
              type="text"
              label="full name"
              placeholder="full name"
              margin="normal"
              onChange={handleFullNameChange}
              onKeyPress={handleKeyPress}
            />}
            <TextField
              error={state.isError}
              fullWidth
              id="password"
              type="password"
              label="Password"
              placeholder="Password"
              margin="normal"
              helperText={state.helperText}
              onChange={handlePasswordChange}
              onKeyPress={handleKeyPress}
            />
          </div>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            className={classes.loginBtn}
            onClick={handleLogin}
            disabled={state.isButtonDisabled}>
            Register
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}

//export default Login;







function Index() {

  
  return (
    <div>
      <Navbar />
      <Register />
      <Bottombar />
    </div>
  );
}

export default Index;