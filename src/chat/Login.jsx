import React, {
  useContext
} from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import Stories from "./components/Stories";
import Bottombar from "./components/Bottombar";
import ChatContext from "./context/ChatContext";


import {
  Button,
  TextField,
  Grid,
  Paper,
  AppBar,
  Typography,
  Toolbar,
  Link,
} from "@material-ui/core";
//import {BRAND_NAME} from '../constants'
export  class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identity: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({
      identity: event.state.identity,
      password: event.state.password
    });
  }
  handleSubmit(event) {
    event.preventDefault()
    const formData=new FormData();
    formData.append('identity',this.state.identity);
    formData.append('password', this.state.password);
    
    axios.post("/user/login",this.state)
      .then(res=>{
        alert(JSON.stringify(res.console.log(result.response.data)));
        localStorage.setItem('token',res.data.token)
        this.props.history.push("/");
      })
      .catch(err=>{
        alert(JSON.stringify(err.console.log(result.response.data)))
        alert('Incorrect Credntials!');
      })
  }
  render() {
    return (
      <div>
        <Grid container spacing={0} justify="center" direction="row">
          <Grid item>
            <Grid
              container
              direction="column"
              justify="center"
              spacing={2}
              className="login-form"
              >
              <Paper
                variant="elevation"
                elevation={2}
                className="login-background"
                >
                <Grid item>
                  <Typography component="h1" variant="h5">
Sign in
                  </Typography>
                </Grid>
                <Grid item>
                  <form onSubmit={this.handleSubmit}>
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <TextField
                          type="text"
                          placeholder="Email"
                          fullWidth
                          name="identity"
                          variant="outlined"
                          value={this.state.identity}
                          onChange={(event) => this.setState({[event.target.name]: event.target.value,})}
                          required
                          autoFocus
                          />
                      </Grid>
                      <Grid item>
                        <TextField
                          type="password"
                          placeholder="Password"
                          fullWidth
                          name="password"
                          variant="outlined"
                          value={this.state.password}
                          onChange={(event) => this.setState({[event.target.name]: event.target.value,})}
                          required
                          />
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          className="button-block"
                          >
Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
Forgot Password?
                  </Link>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

/*
.login-form
{
justify-content: center;
min-height: 90vh;
}
.button-block{
width: 100%;
}
.login-background
{
justify-content: center;
min-height: 30vh;
padding: 50px;
}
*/






function Index() {

  const context = useContext(ChatContext)
  return (
    <div>
      <Navbar />
      <div style={ { marginBottom: 80 }}>
      <Login />
    </div>

      <Bottombar />
    </div>
  );
}

export default Index;