import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Header from './components/Header';
import TextFields from './components/TextFields';
import CircularProgress from '@material-ui/core/CircularProgress';
import Issues from './components/Issues';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: "facebook",
      repo: "react",
      githubIssues: [],
      errors: [],
      isLoading: false
    }
  }

  componentDidMount(){
    this.fetchGithubIssues();
  }

  async fetchGithubIssues(){
    this.setState({isLoading: true});
    const { user, repo } = this.state;
    let githubIssues = await fetch("http://github-feels.edgeapp.net/api/issues?user=" + user + "&repo=" + repo);
    githubIssues = await githubIssues.json();
    if(!githubIssues.errors){
      this.setState({
        githubIssues: githubIssues.issues.reverse(),
        errors: [],
        isLoading: false
      })
    } else {
      
      this.setState({
        errors: githubIssues.errors,
        isLoading: false
      })
    }
  }

  render() {
    const { githubIssues, isLoading, errors } = this.state;
    return (
      <div>
        <Header />
        <div style={{display: "flex", justifyContent: 'center', padding: '20px'}}>
          <div style={{maxWidth: "1200px", display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <TextFields 
              user={this.state.user}
              onChangeUser={(e) => this.setState({user: e.target.value})}
              repo={this.state.repo}
              onChangeRepo={(e) => this.setState({repo: e.target.value})}
              onSubmit={() => {this.fetchGithubIssues()}}
            />

            { errors.length > 0 && 
              errors.map(error => (
                <p style={{color: "red"}}>{error}</p>
              ))
            }

          { isLoading ? 
              <CircularProgress size={50} />
              :
              <Issues issues={githubIssues} style={{width: "100%"}}/>
          }
            



          </div>     
        </div>
      </div>
    );
  }
}

const styles = {

};

export default withStyles(styles)(App)



 {/* <TextFields 
            
            user={this.state.user}
            onChangeUser={(e) => this.setState({user: e.target.value})}
            repo={this.state.repo}
            onChangeRepo={(e) => this.setState({repo: e.target.value})}
            onSubmit={() => {this.fetchGithubIssues()}}
          />
          <div>
            { errors.length > 0 && 
              errors.map(error => (
                <p style={{color: "red"}}>{error}</p>
              ))
            }
          </div>

          <div style={{}}>
          { isLoading ? 
              <CircularProgress size={50} />
              :
              githubIssues.map(issue => <IssueCard key={issue.id} issue={issue} />)
          }
          </div> 

         </div>      */}