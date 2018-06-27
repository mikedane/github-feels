const corsHeaders = {headers: {
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET',
  'Access-Control-Allow-Origin': '*'
}};

fly.http.respondWith( async (req)=> {
  const url = new URL(req.url); 
  if(url.pathname != '/api/issues'){
    let file = await fetch('file:/' + (url.pathname == '/' ? '/index.html' : url.pathname))
      .catch(e => {return new Response(e)});
    return new Response(await file.text());
  } else {
    try {
      const url = new URL(req.url);
      let issuesResponse = await getRepoIssues(url.searchParams.get('user'), url.searchParams.get('repo'));
      if(!issuesResponse.errors){
        let promises = issuesResponse.data.repository.issues.edges.map(issue => 
          getSentimentAnalysis(issue.node.title + ". " + issue.node.bodyText)
            .then(result => {
              issue.node.sentiment = result;
            })
        );
        await Promise.all(promises);
        return new Response(JSON.stringify({issues: issuesResponse.data.repository.issues.edges.map(edge => edge.node)}), corsHeaders)
      } else {
        return new Response(JSON.stringify({errors: issuesResponse.errors.map(error => error.message)}), corsHeaders)
      }
    } catch (e){
      return new Response(JSON.stringify({errors: [e]}), corsHeaders)
    }
  }
})

async function getRepoIssues(username, repo){
  const accessToken = "GH_AUTH TOKEN HERE";
  const query = `
    query {
      repository(owner:"${username}", name:"${repo}") {
        issues(last:20, states:OPEN) {
          edges {
            node {
              title
              url
              bodyText
              url
              author {
                url
                avatarUrl
              }
              createdAt
              id
              bodyHTML
            } 
          }
        }
      }
    }
  `;

  let result = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json', 'User-Agent': 'mikedane'},
    body: JSON.stringify({ query: query }),
  })
  .catch(e => console.error(e));
  result =  await result.json()
  return result;
}

async function getSentimentAnalysis(text){
  let sentimentInfo = await fetch('http://text-processing.com/api/sentiment/', {
    method: 'POST',
    body: "text=" + text,
  })
  .catch(e => console.error(e));

  sentimentInfo = await sentimentInfo.json();
  return sentimentInfo.probability;
}