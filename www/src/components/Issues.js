import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IssueCard from './IssueCard.js';


function Issues(props){
    const { classes, issues } = props;
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            {
                issues.map(issue => <IssueCard key={issue.id} issue={issue} style={{width: "100%"}}/>)
            }
        </div>        
    );
}

const styles = {
    
};

export default withStyles(styles)(Issues)