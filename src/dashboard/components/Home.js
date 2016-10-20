import React, { Component, PropTypes } from 'react'

import PostForm from './PostForm';
import PostCard from './PostCard';

class Home extends Component {
  render() {
    const { posts } = this.props;
    const postCards = posts.map(item => <PostCard post={item} />);
    
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
}

export default Home;