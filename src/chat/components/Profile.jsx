import React, {useContext, useState, useEffect} from 'react'
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles"
import { useHistory } from "react-router-dom"

import Paper from "@material-ui/core/Paper"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Avatar from "@material-ui/core/Avatar"

// import icons
import UsernameIcon from "@material-ui/icons/VerifiedUser"
import PrivacyIcon from "@material-ui/icons/Security"
import PhotoIcon from "@material-ui/icons/Image"
import NotificationIcon from "@material-ui/icons/Notifications"
import ContactIcon from "@material-ui/icons/Person"
import SettingsIcon from "@material-ui/icons/Settings"
//import HelpIcon from "@material-ui/icons/Help"
import HelpIcon from "@material-ui/icons/InfoOutlined"
import LegalIcon from "@material-ui/icons/FileCopy"
import VideaIcon from "@material-ui/icons/VideoCall"
import MessageIcon from "@material-ui/icons/Message"
import SwitchIcon from "@material-ui/icons/SwitchCamera"
import ReportIcon from "@material-ui/icons/Report"
//import LogoutIcon from "@material-ui/icons/Logout"
import LogoutIcon from "@material-ui/icons/ExitToApp"
import SigninIcon from "@material-ui/icons/LockOpen";
import Verified from "@material-ui/icons/VerifiedUser"

import Image from "../assets/avatar1.jpeg"
import SwitchAccount from "./profile/SwitchAccount"
import AccountSetting from "./profile/AccountSetting"
import Help from "./profile/Help"
import Keyword from "./key-values"
import ChatContext from '../context/ChatContext'

const customStyles = makeStyles(() => ({
    root: {
        marginTop: 55,
        padding: 10,
        marginBottom: 70
    },
    paper: {
        padding: 10
    },
    userImage: {
        width: "100px",
        height: "100px"
    },
    listHeader: {
        color: 'grey',
        marginBottom: '0px',
        fontSize: 15
    },
    icon: {
        padding: 7,
        borderRadius: "50%",
        color: 'white',
        fontSize: 20
    },
    title: {
        fontSize: "10px !important"
    }
}))

function Profile() {
    const context = useContext(ChatContext)
    const history = useHistory();
    const [accounts, setAccounts] = useState(false)
    const [help, setHelp] = useState(false)
    const [settings, setSettings] = useState(false)
    const [state, setState] = useState({
      'settings':false,
      'accounts':false,
      'help':false
    })
    
    let user = context.user;
    
    const styles = customStyles()
    
    function logoutFunction(argument) {
      let token = localStorage.getItem('token')
      let accounts = localStorage.getItem('accounts')
      accounts=(accounts!=undefined) ? JSON.parse(accounts) :[];
      if(accounts.length>0){
        accounts=accounts.filter(acc=>acc.token!=token)
        accounts=JSON.stringify(accounts);
        localStorage.setItem('accounts',accounts);
        localStorage.removeItem('token')
      }
      
      context.setUserFromServer({})
      context.setRefresh(true)
      history.push('/')
    }
    
    function loginFunction() {
      history.push('/login')
    }
    function privacy() {
      history.push('/privacy')
    }
    function myPost() {
      history.push('/my-post')
    }
    function phoneContacts() {
      history.push('/chats')
    }
    function photosAndMedia() {
      history.push('/bookmark')
    }
    function activeStatus() {
      history.push('/my-post')
    }
    function notificationsAndSounds() {
      history.push('/notifications')
    }
    function addStory() {
      history.push('/create-post')
    }
    
    function setAccountsFunc(argument) {
      setAccounts(!accounts)
      setSettings(false)
      setHelp(false)
    }
    function setHelpFunc(argument) {
      setHelp(!help)
      setSettings(false)
      setAccounts(false)
    }
    function setSettingsFunc(argument) {
      setSettings(!settings)
      setAccounts(false)
      setHelp(false)
    }
    function stateFunc(change) {
      setState({
        ...state,
        change:true
      })
    }
    
    if(user._id != undefined) return (
        <div className={styles.root}>
            <Paper align="center" className={styles.paper}>
                <Avatar src={user.photo} className={styles.userImage} />
                <h3 style={{ marginBottom: 5 }}> {user.full_name} <Verified fontSize="small" htmlColor="blue" style={{ marginBottom: '-5px' }} /> </h3>
                <p style={{ margin: 3 }} >{user.email}</p>
            </Paper>
            <br/>
            <h3 className={styles.listHeader}>Profile</h3>
            <List>
                <ListItem onClick={myPost} button divider>
                    <ListItemIcon> <MessageIcon className={styles.icon} style={{backgroundColor: 'green'}}  /> </ListItemIcon>
                    <ListItemText className={styles.title}> <b> {Keyword.activeStatus}</b> </ListItemText>
                </ListItem>
            </List>
            <List>
                <ListItem button divider>
                    <ListItemIcon> <UsernameIcon className={styles.icon} style={{backgroundColor: 'red'}} /> </ListItemIcon>
                    <ListItemText className={styles.title}> <b>{user.username}</b> </ListItemText>
                </ListItem>
            </List>

            <h3 className={styles.listHeader}>Prefrences</h3>
            <List>
                <ListItem onClick={privacy} button divider>
                    <ListItemIcon> <PrivacyIcon className={styles.icon} style={{backgroundColor: 'lightblue'}} /> </ListItemIcon>
                    <ListItemText className={styles.title}> <b> {Keyword.privacy }</b> </ListItemText>
                </ListItem>
            </List>
            <List>
                <ListItem onClick={notificationsAndSounds} button divider>
                    <ListItemIcon> <NotificationIcon className={styles.icon} style={{backgroundColor: 'purple'}} /> </ListItemIcon>
                    <ListItemText className={styles.title}> <b>{Keyword.notificationsAndSounds}</b> </ListItemText>
                </ListItem>
            </List>
            <List>
                <ListItem onClick={addStory} button divider>
                    <ListItemIcon> <VideaIcon className={styles.icon} style={{backgroundColor: 'blue'}} /> </ListItemIcon>
                    <ListItemText className={styles.title}> <b>{Keyword.addStory}</b> </ListItemText>
                </ListItem>
            </List>
            <List>
                <ListItem onClick={phoneContacts} button divider>
                    <ListItemIcon> <ContactIcon className={styles.icon} style={{backgroundColor: 'grey'}} /> </ListItemIcon>
                    <ListItemText className={styles.title}> <b>{Keyword.phoneContacts}</b> </ListItemText>
                </ListItem>
            </List>
            <List>
                <ListItem onClick={photosAndMedia} button divider>
                    <ListItemIcon> <PhotoIcon className={styles.icon} style={{backgroundColor: 'cyan'}} /> </ListItemIcon>
                    <ListItemText className={styles.title}> <b>{Keyword.photosAndMedia}</b> </ListItemText>
                </ListItem>
            </List>


            <h3 className={styles.listHeader}>Account</h3>
            <List>
                <ListItem onClick={setAccountsFunc} button divider>
                    <ListItemIcon> <SwitchIcon className={styles.icon} style={{backgroundColor: 'pink'}} /> </ListItemIcon>
                    <ListItemText className={styles.title}> <b> Switch Account </b>
                    </ListItemText>
                </ListItem>
                    {accounts ? <Paper>
                    <SwitchAccount/>
                    </Paper> : null}
            </List>
            <List>
                <ListItem onClick={setSettingsFunc} button divider>
                    <ListItemIcon> <SettingsIcon className={styles.icon} style={{backgroundColor: 'black'}} /> </ListItemIcon>
                    <ListItemText className={styles.title}> <b>Account Settings</b> </ListItemText>
                </ListItem>
                {settings ? <Paper>
                    <AccountSetting />
                    </Paper> : null}
            </List>
            <List>
                <ListItem button divider>
                    <ListItemIcon> <ReportIcon className={styles.icon} style={{backgroundColor: 'red'}} /> </ListItemIcon>
                    <ListItemText className={styles.title}> <b>Report Technical Problem</b> </ListItemText>
                </ListItem>
            </List>
            <List>
                <ListItem onClick={setHelpFunc} button divider>
                    <ListItemIcon> <HelpIcon className={styles.icon} style={{backgroundColor: 'lightblue'}} /> </ListItemIcon>
                    <ListItemText className={styles.title}> <b>Info</b> </ListItemText>
                </ListItem>
                {help ? <Paper>
                    <Help />
                    </Paper> : null}
            </List>
            <List>
                <ListItem button divider>
                    <ListItemIcon> <LegalIcon className={styles.icon} style={{backgroundColor: 'orange'}} /> </ListItemIcon>
                    <ListItemText className={styles.title}> <b>Legal & Policies</b> </ListItemText>
                </ListItem>
            </List>
            {<List>
                <ListItem onClick={logoutFunction} button divider>
                    <ListItemIcon> <LogoutIcon className={styles.icon} style={{backgroundColor: '#c01ace'}} /> </ListItemIcon>
                    <ListItemText className={styles.title}> <b>Logout</b> </ListItemText>
                </ListItem>
            </List>}
        </div>
    )
    return(
      <div className={styles.root}>
        {<List>
            <ListItem onClick={loginFunction} button divider>
                <ListItemIcon> <SigninIcon className={styles.icon} style={{backgroundColor: '#c01ace'}} /> </ListItemIcon>
                <ListItemText className={styles.title}> <b>Login</b> </ListItemText>
            </ListItem>
        </List>}
      </div>
      )
}

export default Profile
