import React, { useContext, useState } from 'react'
import axios from 'axios'



import { makeStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import IconButton from "@material-ui/core/IconButton"
import TextField from "@material-ui/core/Input"
import InputAdornment from "@material-ui/core/InputAdornment"

import SendIcon from "@material-ui/icons/Send"
import AddImage from "@material-ui/icons/ImageOutlined"
import ChatContext from '../../context/ChatContext'

const customStyles = makeStyles(() => ({
    root: {
        bottom: 0,
        zIndex: 999,
        position: 'fixed',
        width: '100vw !important'
    },
    button: {
        backgroudColor: 'red'
    },
    input: {
        paddingRight: 14,
        paddingTop: 3
    },
    fileInput: {
        display: 'none'
    }
}))


function InputField() {

    const context = useContext(ChatContext)

    const [message, setMessage] = useState("")
    
    const url = "http://localhost:8000";
    const handleSubmit = e => {
        e.preventDefault()
        let data = {};
        data.message = message;
        data.receiver = ["62e28e2689468b5ce7c7933a","62e4f7ba7ada4525070d1bf4"];
        data.readers = ["62e28e2689468b5ce7c7933a"];
        data.reply_to = null;
        axios.post(url+"/chat/one-to-one-message", text)
          .then(res=>{
            context.sendMessage(res)
            setMessage("")
          })
          .catch(err=>console.log(err))
    }

    const styles = customStyles()
    return (
        <div className={styles.root}>
            <Paper>
                <Grid container className="inputField">
                    <Grid item xs={2} sm={2} md={2}>
                        <div>
                            <IconButton className={styles.button}>
                                <label htmlFor="file">
                                    <AddImage fontSize="large" />
                                </label>
                                <input id="file" type="file" accept="image/*" className={styles.fileInput} />
                            </IconButton>
                        </div>
                    </Grid>
                    <Grid item xs={10} sm={10} md={10} className={styles.input}>
                        <form onSubmit={handleSubmit}>
                            <TextField required value={message} placeholder="Type a message" fullWidth variant="filled"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton type="submit">
                                            <SendIcon htmlColor="blue" />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </form>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default InputField
