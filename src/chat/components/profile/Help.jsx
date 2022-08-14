import React, { useContext, useEffect } from 'react';
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


//import moment from 'moment';

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
  
  useEffect(()=>{
    if (context.refresh==true) {
      window.location.reload()
    }
    context.setRefresh(false);
  },[context.refresh]);
  
  
  function AccountSetting(accnt) {
        localStorage.setItem('token',accnt.token);
        let accounts=localStorage.getItem('accounts');
        if(accounts!=null && accounts!=undefined){
          accounts=JSON.parse(accounts);
        }
        if(accounts==null || accounts==undefined){
          accounts=[];
        }
        accounts=accounts.filter(obj=>obj.user.id!=accnt.user.id)
        accounts.unshift(accnt)
        localStorage.setItem('accounts',JSON.stringify(accounts));
        
        context.setRefresh(true);
        history.push('/profile')
  }

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  
  let token=localStorage.getItem("token");
  token=(token!=undefined) ? token : null;
  let accounts=localStorage.getItem("accounts");
  accounts=(accounts!=undefined) ? JSON.parse(accounts) : [];
  

  return (
    <div className={classes.root}>
          <List style={{backgroundColor: '#a38dd8'}} >
            <ListItem button divider>
                {/*<ListItemIcon> 
                    <AddIcon/>
                </ListItemIcon>*/}
                <ListItemText className={''}> <b> This webapp was designed by Denis Kemboi {'<narydbest@gmail.com>'}</b>
                </ListItemText>
            </ListItem>
          </List>
    </div>
  );
}
