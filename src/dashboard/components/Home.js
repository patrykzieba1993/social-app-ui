import React, { Component, PropTypes } from 'react'

import PostForm from './PostForm';
import PostCard from './PostCard';

class Home extends Component {
  componentWillMount() {
    const { fetchPostsWithComments, location } = this.props;
    fetchPostsWithComments(location.id);
  }
  
  render() {
    const { postsWithComments, sendComment, sendPost, params } = this.props;
    const postCards = postsWithComments.map(item => <PostCard postWithComments={item} sendComment={sendComment} params={params} />);
    
    return (
      <div>
        <PostForm params={params} sendPost={sendPost} />
        {postCards}
      </div>
    );
  }
}

Home.PropTypes = {
  sendPost: PropTypes.func.isRequired,
  sendComment: PropTypes.func.isRequired,
  fetchPostsWithComments: PropTypes.func.isRequired,
  postsWithComments: PropTypes.array,
  location: PropTypes.object,
}

export default Home;