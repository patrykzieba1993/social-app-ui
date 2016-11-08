import React, { Component, PropTypes } from 'react'

import PostForm from './PostForm';
import PostCard from './PostCard';

class Home extends Component {
  componentWillMount() {
    const { fetchPostsWithComments, loggedUserData } = this.props;
    fetchPostsWithComments(loggedUserData.id);
  }
  
  render() {
    const { postsWithComments, sendComment, sendPost, loggedUserData } = this.props;
    const postCards = postsWithComments.map(item => <PostCard width='50%' postWithComments={item} sendComment={sendComment} loggedUserData={loggedUserData} />);
    
    return (
      <div>
        <PostForm loggedUserData={loggedUserData} sendPost={sendPost} />
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
  loggedUserData: PropTypes.object,
}

export default Home;