import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Doughnut} from 'react-chartjs-2';
import Hidden from '@material-ui/core/Hidden';

function Sentiment(props){
    const { classes, sentiment } = props;

    const data = {
        datasets: [{
            data: Object.keys(sentiment).map(key => Math.round(parseFloat(sentiment[key])*100)),
            backgroundColor: ["#ef9a9a", "#90caf9", "#80cbc4"]
        }],
        labels: ["% Negative", "% Neutral", "% Positive"],

        
    };
    const options  = {
        legend: {
            display: false,
        }
    }

    return (
       <div>
           <Hidden smDown>
                <Doughnut data={data} options={options} width={150}/>
           </Hidden>
           <Hidden mdUp>
                <Doughnut data={data} options={options} width={75} height={75}/>
           </Hidden>
       </div>
    );
}

const styles = {

  };

export default withStyles(styles)(Sentiment)