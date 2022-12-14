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
import Link from '@material-ui/core/Link';
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
  identity: '',
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
        identity: action.payload
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


function Login() {
  const classes = useStyles();
  const context = useContext(ChatContext)
  let history = useHistory()
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.identity.trim() && state.password.trim()) {
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
  }, [state.identity, state.password]);

  const handleLogin = () => {
    axios.post('/user/login/',state)
      .then(res=>{
        dispatch({
          type: 'loginSuccess',
          payload: 'Login Successfully'
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
          payload: 'Incorrect identity or password'
        });
      });
  };
  
  function register() {
    history.push('/register');
  }

  const handleKeyPress = (event) => {
    if (event.keyCode === 13 || event.which === 13) {
      state.isButtonDisabled || handleLogin();
    }
  };

  const handleUsernameChange =
    (event) => {
      dispatch({
        type: 'setUsername',
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
            <TextField
              error={state.isError}
              fullWidth
              id="identity"
              type="text"
              label="Username or Email"
              placeholder="Username/Email"
              margin="normal"
              onChange={handleUsernameChange}
              onKeyPress={handleKeyPress}
            />
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
            Login
          </Button>
        </CardActions>
        
        <h3></h3>
        <center>
          <Link onClick={register}>register here</Link>
        </center>
        <div className={classes.container}>
        </div>
      </Card>
    </form>
  );
}

//export default Login;







function Index() {

  
  return (
    <div>
      <Navbar />
      <Login />
      <Bottombar />
    </div>
  );
}

export default Index;