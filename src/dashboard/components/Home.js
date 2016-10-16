import React, { Component, PropTypes } from 'react'

import PostForm from './PostForm';

class Home extends Component {
  render() {
    return (
      <div>
        <PostForm params={this.props.params} />
      </div>
    );
  }
}

export default Home;