import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Home from '../components/Home';


import { sendPost, sendComment, fetchPostsWithComments } from '../actions/dashboard';

function mapStateToProps(state, ownProps) {
  return {
    postsWithComments: state.dashboard.postsWithComments,
    loggedUserData: state.dashboard.loggedUserData,
  };
};

function mapDispatchToProps(dispatch) {
  const actions = {
    fetchPostsWithComments,
    sendPost,
    sendComment,
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);