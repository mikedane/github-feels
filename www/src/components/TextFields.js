import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

function TextFields(props){
    const { classes, user, repo, onChangeUser, onChangeRepo, onSubmit } = props;
    return (
        <div>
            <div className={classes.paper}>
                <Typography variant="headline" component="span" className={`${classes.textFieldItem} ${classes.text}`}>
                    GitHub.com/
                </Typography>

                <TextField
                label="User"
                value={user}
                onChange={onChangeUser}
                className={`${classes.textFieldItem} ${classes.textField}`}
                />
                <Typography variant="headline" component="span" className={`${classes.textFieldItem} ${classes.text}`}>
                   /
                </Typography>
                <TextField
                label="Repo"
                className={classes.textField}
                value={repo}
                onChange={onChangeRepo}
                className={`${classes.textFieldItem} ${classes.textField}`}
                />
                <Button variant="outlined" color="#ffffff" onClick={onSubmit} >
                    Get Issues
                </Button>
            </div>
        </div>
    );
}

const styles = {
    paper: {
      padding: "10px",
      maxWidth: "800px",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "baseline",
    },
    textFieldItem: {
        margin: "10px"
    },
    textField: {
        width: "100px",
        fontSize: "30px"
    },
    text: {
        position: "relative",
        top: "7px",
    }
};

export default withStyles(styles)(TextFields)