import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Sentiment from './Sentiment';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Hidden from '@material-ui/core/Hidden';

function IssueCard(props){
    const { classes, issue } = props;
    const createdAt = new Date(issue.createdAt);
    return (
        <div style={{width: "100%"}}>

            <ExpansionPanel style={{margin: '20px', borderLeft: `5px solid ${getSentimentBackgroundColor(issue.sentiment)}`}}>

                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>

                    <div style={{display: "flex", width: "100%",justifyContent: 'space-between', alignItems: 'center'}}>
                        <div style={{display: "flex", alignItems: 'center'}}>
                            <Hidden smDown>
                                <img
                                    className={classes.avatar}
                                    style={{ maxHeight: 75, marginRight: '25px'}}
                                    src={issue.author.avatarUrl}
                                />
                            </Hidden>
                            <Hidden mdUp>
                                <img
                                    className={classes.avatar}
                                    style={{ maxHeight: 40, marginRight: '10px'}}
                                    src={issue.author.avatarUrl}
                                />
                            </Hidden>
                            <div style={{dispay: 'flex', flexDirection: 'column'}}>
                                <Hidden smDown>
                                    <Typography variant="headline" >
                                        {removeLongWords(issue.title)}
                                    </Typography>
                                </Hidden>
                                <Hidden mdUp>
                                    <Typography variant="body2" >
                                        {removeLongWords(issue.title, 10)}
                                    </Typography>
                                </Hidden>
                                <Hidden smDown>
                                    <Typography variant="subheading" color="textSecondary">
                                        {`/${issue.author.url.split('/').pop()} | ${createdAt.toDateString()}`}
                                    </Typography>
                                </Hidden>
                                <Hidden mdUp>
                                    <Typography variant="caption" color="textSecondary">
                                        {`/${issue.author.url.split('/').pop()} | ${createdAt.toDateString()}`}
                                    </Typography>
                                </Hidden>
                            </div>
                        </div>
                        <Sentiment sentiment={issue.sentiment} />
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                <Typography  variant="subheading" >
                    <div dangerouslySetInnerHTML={{__html:  removeLongWords(removePreTags(issue.bodyHTML)) }} style={{display: 'flex', flexDirection: 'column'}}>

                    </div>
                </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>            
        </div>
    );
}

function getSentimentBackgroundColor(sentiment){
    if(sentiment.neg > sentiment.neutral && sentiment.neg > sentiment.pos){
        return "#ef9a9a";
    } else if (sentiment.pos > sentiment.neutral && sentiment.pos > sentiment.neutral){
        return "#80cbc4 "
    } else {
        return "#90caf9";
    }
}

function removeLongWords(text, length=20){
    return text.split(' ').map(word => {
        if(word.length > length){
            return word.substring(0, length) + " " + removeLongWords(word.substring(length), length);
        }    
        return word;
    }).join(" ");

}

function removePreTags(html){
 
    return html.replace(/<pre>/g, '<p>').replace(/<\/pre>/g, '</p>');
}

 //    <li>{issue.title}</li>
//    <Sentiment sentiment={issue.sentiment}/>

const styles = {
    panel: {
        margin: '25px'
    },
    panelsWrapper: {
        width: '100%',
    },
    avatar: {

        borderRadius: "50%",

    },
    panelBody: {
        display: 'flex',
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    },
    sentimentBar: {
        height: "50px", 
        width: "20px", 
        position: "relative", 
        right: "24px",
        top: "25px"

    },
    titleBox: {
        display: "flex",
        justifyContent: "flex-start",
    }
};

export default withStyles(styles)(IssueCard)



{/* <div className={classes.panelsWrapper}>

<div className={classes.panel}>

    <ExpansionPanel>

        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <div className={classes.sentimentBar} style={{backgroundColor: getSentimentBackgroundColor(issue.sentiment)}}></div>

        <div className={classes.panelBody}>
            <div className={classes.titleBox}>
                <img
                    className={classes.avatar}
                    src={issue.author.avatarUrl}
                />
                <div className={classes.panelHeader}>
                    <div>
                        <Typography variant="headline" >
                            {issue.title}
                        </Typography>
                        <Typography variant="subheading" color="textSecondary">
                            {`/${issue.author.url.split('/').pop()} | ${createdAt.toDateString()}`}
                        </Typography>
                    </div>
                </div>
            </div>
            <Sentiment sentiment={issue.sentiment} />
        </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <Typography dangerouslySetInnerHTML={{__html: issue.bodyHTML}} variant="subheading" >
            </Typography>
        </ExpansionPanelDetails>
    </ExpansionPanel>

</div>
</div> */}