import React from 'react';

const User = React.createClass({
  componentDidMount() {
    this.setState({
      // route components are rendered with useful information, like URL params
      user: 'testing user'
    })
  },

  render() {
    return (
      <div>
        User works 
        {/*<h2>{this.state.user.name}</h2>*/}
        {/* etc. */}
      </div>
    )
  }
})

export default User;