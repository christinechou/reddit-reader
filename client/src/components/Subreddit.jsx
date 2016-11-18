import React, { Component } from 'react';
import { Button, Collapse, Well, Modal } from 'react-bootstrap';
import RedditApi from '../lib/redditApi.js'



export default class Subreddit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmBox: false,
      selectedSub: null
    }
    this.confirm = this.confirm.bind(this)
    this.subscribe = this.subscribe.bind(this)
  }

  confirm(e) {
    this.setState({
      confirmBox: true,
      selectedSub: e.target.id
    });
  }

  subscribe() {
    
    this.setState({
      confirmBox: false
    })
    let params = {
      action: 'sub',
      // skip_initial_defaults: true,
      sr: this.state.selectedSub
    }

    RedditApi.subscribeSub('sub', confirm => {
      console.log('Subscribed?',confirm)
    }, params)
  }



  render() {
    
      let close = () => this.setState({
        confirmBox:false
      })

    return (
      <div>

        <div className="modal-container">
          <a id={this.props.id} onClick={this.confirm}>
            {this.props.name} 
          </a> {this.props.title}
          <p> {this.props.descrip} </p>

          <Modal 
            show={this.state.confirmBox} 
            onHide={close}
            container={this}
            aria-labelledby="contained-modal-title" >

            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title"> Contained Modal </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to subscribe to this subreddit?
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={close}> Close</Button>
              <Button bsStyle="primary" onClick={this.subscribe}> Subscribe</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}