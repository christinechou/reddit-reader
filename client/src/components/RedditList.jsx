import React, { Component } from 'react';
import { Pager, Item, Label } from 'react-bootstrap';
import RedditListEntry from './RedditListEntry.jsx';


export default class RedditList extends Component {
  constructor(props) {
    super(props)
  }


  changePage(e) {
    
    if (e.target.innerText === 'Next Page →') {
      this.props.nextPage();
    } else {
      this.props.previousPage();
    }
  }

  render() {

    let partial;
    let subreddits;
    let previous;

    // If front page data hasn't come in yet, show loading spinner
    if (!this.props.data.redditData) {
      partial = <div className="loader">Loading...</div>
    }

    // Once data has been updated, load front page content
    if (this.props.data.redditData) {
      
      // user redditData keeps reloading with every input change. look into.

      // Otherwise, load default data      
      partial = this.props.data.redditData.map( data => (
        <RedditListEntry  key={data.data.id}
                          image={data.data.thumbnail}
                          title={data.data.title}
                          url={data.data.url}
                          subreddit={data.data.subreddit}
                          author={data.data.author}
                          score={data.data.score}
                          ups={data.data.ups} 
                          comments={data.data.num_comments} 
                          permalink={data.data.permalink} 
        />
      ));

      previous = (this.props.data.page !== 1) ?
        (<Pager.Item className="pageFlip" previous onClick={this.changePage.bind(this)}>
          &larr; Previous Page
        </Pager.Item>) : null;

    }
    
    return (
      <div>
        <div className="media-container">
         {subreddits}
        </div>
         {partial}
         <Pager> 
           {previous}
           <Pager.Item className="pageFlip" next onClick={this.changePage.bind(this)}>Next Page &rarr;</Pager.Item> 
         </Pager>

      </div>
    )
  }
}