import React, { Component } from 'react';
import { Link } from 'react-router'
import { Button, Navbar, NavItem } from 'react-bootstrap';
import auth from '../lib/authUser.js'

export default class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUpdate() {

  }

  signOut() {
    sessionStorage.clear();
    this.props.logOut();
  }


  handleClick() {
    if (!sessionStorage.accessToken) {
      console.log('Signing in')
      auth.authRedirect();
    } else {
      console.log('User already authenticated')
    }
  }
  

  render() {
    
    let partial;
    partial = (sessionStorage.accessToken ? 
    (<Navbar.Form pullRight> 
      <Button onClick={this.signOut.bind(this)} type="submit" bsStyle="default"> 
          Sign Out
      </Button>
    </Navbar.Form>) : 
    <Navbar.Form pullRight> 
      <Button onClick={ this.handleClick.bind(this) } type="submit" bsStyle="default" block>
        Sign in
      </Button>
    </Navbar.Form>)

    return (

      <Navbar >
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/"><span className="brand-header">Reddit Reader</span></Link>
          </Navbar.Brand>
        <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          
            {partial}
          
        </Navbar.Collapse>
      </Navbar>

    );
  }
}

