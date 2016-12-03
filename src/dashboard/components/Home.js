import React, { Component, PropTypes } from 'react'

import PostForm from './PostForm';
import PostCard from './PostCard';

class Home extends Component {
  constructor() {
    super();
  }
  
  componentWillMount() {
    const { fetchPostsWithComments } = this.props;
    fetchPostsWithComments(this.props.params.id);
  }

  getChildContext() {
    const {params} = this.props;
    return {
      location,
      loggedUserData: {id: params.id}, // load id from localstorage
    }
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

Home.childContextTypes = {
  location: PropTypes.object,
  loggedUserData: PropTypes.object,
}

export default Home;