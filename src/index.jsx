import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import axios from 'axios';
//import * as serviceWorker from './serviceWorker';

//const url = "http://localhost:8000";
const url = "https://insult-challenge.herokuapp.com";
axios.defaults.baseURL = url;
axios.defaults.headers.get['Accept'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';


let getToken;
let token;
try {
  getToken=localStorage.getItem('token');
} catch (e) {
  //console.log(e);
  getToken=null;
}
if (getToken !== null && getToken !== undefined) {
  token=`Bearer ${getToken}`;
}else{
  token=getToken;
}
axios.defaults.headers.common['Authorization'] = token;
//fetchUserAccount();


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


//serviceWorker.unregister();
