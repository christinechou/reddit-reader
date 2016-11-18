import React, { Component } from 'react';
import { Media, Label } from 'react-bootstrap';


export default class RedditListEntry extends Component {
  constructor(props) {
    super(props)
  }


  render() {

    let img = (this.props.image === 'default' || this.props.image === 'self') ? 'assets/defaultpic.png' : this.props.image
    let newTitle = (this.props.title.length > 180) ? (this.props.title.slice(0,180)+'...') : this.props.title;
    let perm = 'http://www.reddit.com' + this.props.permalink;

    return (
      <div>
        <Media bsClass="media-container">
         <Media.Left>
            <img width={100} height={100} src={img} alt="Image"/>
          </Media.Left>
          <Media.Body>
            <Media.Heading><a href={this.props.url}>{newTitle}</a></Media.Heading>
            <p> {this.props.score} points. <span className="bold"><a href={perm}>{this.props.comments} comments.</a> </span> Posted by {this.props.author} from  <Label bsStyle="default">/r/{this.props.subreddit}</Label></p>
          </Media.Body>
        </Media>
        
      </div>
    )
  }
}