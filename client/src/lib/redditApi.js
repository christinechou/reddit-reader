import Auth from './authUser.js'

// Fetch data for guest (unauthenticated user)
const defaultFrontPage = (cb) => {

  const callContextOptions = { bypassAuth: true };
  Auth.reddit('/hot').get({ limit: 15 }, callContextOptions)
  .then(data => {
    cb(data);
  })
  .catch(err => {
    console.log('error in retrieving data',err)
  })
};

// Fetch data for authenticated user
const fetchData = (route, cb, params) => {

  const redditApi = {
    user: '/api/v1/me',
    modhash: '/api/me',
    userSubreddits: '/subreddits/mine',
    top: '/r/subreddit/top',
    hot: '/hot',
    query: '/api/subreddits_by_topic',
    query2: '/subreddits/search',
    sub: '/api/subscribe'
  }

  // If user already granted access, use saved access token
  let ACCESS_TOKEN = sessionStorage.accessToken;
  
  Auth.reddit.auth(ACCESS_TOKEN).then(() => {
    return Auth.reddit(redditApi[route]).get(params);
  }).then(data => {
    console.log('Data retrieval successful for ',redditApi[route],':',data);
    cb(data); // Log the response
  }, err => { 
    cb(err)
    console.log('Error in retrieving data',err) 
  });
}


const subscribeSub = (action, cb, params) => {

  let ACCESS_TOKEN = sessionStorage.accessToken;
  let choice = action === 'subscribe' ? 'sub' : 'unsub';

  console.log('running subscribe sub with action:', action, 'params:',params)

  Auth.reddit.auth(ACCESS_TOKEN).then(() => {
    return Auth.reddit('/api/subscribe').post(params)
    .then(data => {
      cb(data)
    })
    .catch(err => {
      console.error('Error in (un)subscribing to subreddit:',err)
    });
  })

}


module.exports = {
  fetchData: fetchData,
  defaultFrontPage: defaultFrontPage,
  subscribeSub: subscribeSub
}