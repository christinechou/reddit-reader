import React, { Component } from 'react';
import { Form, FormGroup, Label, ControlLabel, FormControl, Button, Collapse, Well } from 'react-bootstrap';
import App from './App.jsx'
import Auth from '../lib/authUser.js'
import RedditApi from '../lib/redditApi.js'
import Subreddit from './Subreddit.jsx'
import RedditList from './RedditList.jsx'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: '',
      searchResults: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.openWell = this.openWell.bind(this)
    this.fetchSearchData = this.fetchSearchData.bind(this)
  }

  // Updates state based on user input text
  handleChange(e) {
    this.setState({
      textInput: e.target.value
    });
  }


  openWell() {
    let bool = this.state.textInput !== '' ? true : false
    this.setState({ 
      open: bool
    });
  }

  fetchSearchData(e) {
    e.preventDefault();
    let that = this;

    if (this.state.textInput !== '') {
      let q = {
        q: this.state.textInput,
        limit: 10
      }
      RedditApi.fetchData('query2', data => {
        that.setState({
          searchResults: data.data.children
        });
      }, q);
    }
  }

  render() {

    let user;
    let browseSubs;
    let subreddits;
    let searchResults;
    let partial;

    user = sessionStorage.accessToken ? this.props.data.redditUser : 'Guest'

    if (!sessionStorage.accessToken) {
      // If not signed in, display content
      browseSubs = <p className="small-text">Sign in to add or remove subreddits from your front page content</p>
      
      partial = <RedditList nextPage={this.props.nextPage.bind(this)} previousPage={this.props.previousPage.bind(this)} data={this.props.data} />
    } else {

      // If user is authenticated, load user's personal subreddit list
      if (this.props.data.isAuthenticated) {
        
        subreddits = this.props.data.userSubreddits.map(data => (
           <Label key={data.data.id} className="default-space">{data.data.url}</Label>
        ));
      }

      // If user has searched subreddits, show results 
      if (this.state.searchResults) {

        searchResults = this.state.searchResults.map(data => (
          <Subreddit  key={data.data.id} 
                      id={data.data.name}
                      name={data.data.url}
                      title={data.data.title}
                      descrip={data.data.public_description} />
        ))
      }

      // User form to search subreddits
      browseSubs = (
        <div>
          <p className="small-text"> Each new subreddit to which you subscribe will be updated/reflected on your front page! </p>
          <Form onSubmit={this.fetchSearchData} inline>
            <FormGroup controlId="formInlineName">
              <ControlLabel>Browse Subreddits </ControlLabel>
              {'  '}
              <FormControl bsSize="sm" value={this.state.textInput} onChange={this.handleChange} type="text" placeholder="Space cats" />
            </FormGroup>
            {'  '}
            <Button bsSize="xsmall" type="submit" onClick={this.openWell}>
              Search
            </Button>
            <Collapse in={this.state.open}>
              <div>
                <Well>
                  {searchResults}
                </Well>
              </div>
            </Collapse>
          </Form>
        </div>
        )


      partial = <RedditList nextPage={this.props.nextPage.bind(this)} previousPage={this.props.previousPage.bind(this)} data={this.props.data} />
    }

    return (
      <div className="container">
        <div className="title"> Welcome, {user}! </div>
        <div className="top-bottom-border">
          {/*Search results and subreddit list*/}
          {browseSubs}
          {subreddits}
        </div>
        <div>
          {/*Reddit List*/}
          {partial}
        </div>
      </div>

    );
  }
}