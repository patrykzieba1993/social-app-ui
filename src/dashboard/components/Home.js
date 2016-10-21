import React, { Component, PropTypes } from 'react'

import PostForm from './PostForm';
import PostCard from './PostCard';

class Home extends Component {
  render() {
    const { postsWithComments } = this.props;
    const postCards = postsWithComments.map(item => <PostCard postWithComments={item} />);
    
    return (
      <div>
        <PostForm params={this.props.params} sendPost={this.props.sendPost} />
        {postCards}
      </div>
    );
  }
}

Home.PropTypes = {
  sendPost: PropTypes.func.isRequired,
  postsWithComments: PropTypes.array,
}

export default Home;