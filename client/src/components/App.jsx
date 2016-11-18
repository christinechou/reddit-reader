import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import NavBar from './NavBar.jsx';
import Home from './Home.jsx';
import Auth from '../lib/authUser.js';
import RedditApi from '../lib/redditApi.js';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userSubreddits: null,
      redditData: null, //front page
      isAuthenticated: false,
      redditUser: null,
      page:1
    }
    this.logOut = this.logOut.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.fetchDefaultFrontPage = this.fetchDefaultFrontPage.bind(this)
  }

  fetchDefaultFrontPage() {
    let that = this;
    RedditApi.defaultFrontPage(data => {
      that.setState({
        redditData: data.data.children
      })
    })
  }

  handleClick() {
    console.log('App.jsx.  Not sure if this function is needed.')
  }

  logOut() {
    this.setState({
      isAuthenticated: false,
      redditUser: null
    });
  }

  nextPage() {
    console.log('Next page in app is working and re-setting page#')
    let next = this.state.page+1;
    this.setState({
      page: next
    });
  }

  previousPage() {
    let prev = this.state.page-1
    this.setState({
      page: prev
    });
  }

  componentWillMount() {

    // "Listener" for #address with token info, update token - updates user data based on access token
    if (!sessionStorage.accessToken && sessionStorage.state) {
      console.log('No session token but existing state. intended to be caught on a redirect. User token updated.');
      Auth.updateUserToken(window.location.hash);
      browserHistory.push('/');
    }
  }

  componentDidMount() {
    
    let that = this;

    // If no access token, return default data
    if (!sessionStorage.accessToken) {
      this.fetchDefaultFrontPage();
      return null;
    }

    // Otherwise, if data has been loaded, exit
      if (this.state.redditUser) {
        console.log('EXIT.  Not sure if this function is useful.')
        return null;
      } 

      // Otherwise, check if access token has expired.  
      RedditApi.fetchData('user', data => {
        if (data.message) {
        //If expired, clear cache and return default front page content
          if (data.message.indexOf('Access token has expired') > -1) {
            sessionStorage.clear();
            this.fetchDefaultFrontPage();
            return null;
          }
        }
        // Otherwise, fetch Reddit user data and set state to authenticated
        that.setState({
          redditUser: data.name,
          isAuthenticated: true
        });
      });

      // Fetch user subreddits
      RedditApi.fetchData('userSubreddits', data => {
        that.setState({
          userSubreddits: data.data.children
        });
      });

      // Fetch user front page
      RedditApi.fetchData('hot', data => {
        that.setState({
          redditData: data.data.children,
          page: 1
        });
      }, { limit: 15 });

  }
 

  render() {
    
    return (
      <div > 
          <NavBar logOut={this.logOut.bind(this)} />
          <Home nextPage={this.nextPage.bind(this)} previousPage={this.previousPage.bind(this)} data={this.state} />
          
      </div>
    );
  }
}
