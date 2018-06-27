import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

function Header(props){
    const { classes } = props;
    return (
        <AppBar position="static" className={classes.appBar}>
            <Toolbar>
                
                <Typography variant="title" color="inherit" className={classes.flex}>
                    GitHub Feels
                </Typography>
                <Button color="inherit"><a target="_blank" className={classes.menuLink} href="https://www.fly.io">Visit Fly.io</a></Button>
                <Button color="inherit"><a target="_blank" className={classes.menuLink} href="https://gist.github.com/mikedane/c9392e4075b1366847b5ca99a8e5245b">See Code</a></Button>
            </Toolbar>
        </AppBar>
    );
}

const styles = {
    appBar: {
        backgroundColor: "#546e7a"
    },
    flex: {
      flex: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    menuLink: {
        textDecoration: "none",
        color: "inherit"
    }
  };

export default withStyles(styles)(Header)