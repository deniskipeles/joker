import { io } from "socket.io-client";



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

const socket = io("http://localhost:8000", {
  reconnectionDelayMax: 10000,
  auth: {
    token
  },
  query: {
    "my-key": "my-value"
  }
});

socket.on('connect', function (){
    console.log('connected: socket');
});

export default socket;