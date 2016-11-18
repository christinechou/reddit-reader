import crypto from 'crypto';
import Snoocore from 'snoocore';
import client_id from '../config/reddit.js'


const reddit = new Snoocore({
  userAgent: '/u/username redditreaderclient',
  oauth: { 
    type: 'implicit', // required when using implicit OAuth
    mobile: true, // defaults to false.
    key: process.env.client_id, // Only requires the key! No secret needed.
    redirectUri: 'http://127.0.0.1:3000/',
    scope: [ 'mysubreddits', 'read', 'identity' ] 
  }
});

const authRedirect = () => {

  const state = crypto.randomBytes(32).toString('hex');
  sessionStorage.state = state;
  
  const authUrl = reddit.getAuthUrl(state);
  window.location.href = authUrl;
}


const getQueryVariable = (url) => {
  
   const query = url.substring(1);
   const vars = query.split("&");
   let obj = {}
   for (let i=0;i<vars.length;i++) {
     let pair = vars[i].split("=");
     obj[pair[0]] = pair[1];
   }
   return obj;
}


const updateUserToken = (url) => {

  // Parse url for parameters
  let paramObj = getQueryVariable(url);
  let RETURNED_STATE = paramObj.state;

  // Check that state passed in with request matches state from the response
  if (sessionStorage.state !== paramObj.state) {
    console.log('User cannot be authenticated.')
    return null;
  }
  // Otherwise, update access token:
  sessionStorage.accessToken = paramObj.access_token;

}


module.exports = {
  reddit: reddit, 
  authRedirect: authRedirect,
  updateUserToken: updateUserToken,
  getQueryVariable: getQueryVariable
}