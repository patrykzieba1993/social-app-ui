import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import UserPage from '../components/UserPage';

import {
  fetchUserPageData,
  sendComment,
  updatePostsWithComments,
  resetUserPageData,
  sendInvitation,
} from '../actions/dashboard';

function mapPropsToState(state, ownProps) {
  return {
    location: ownProps.params,
    loggedUserData: state.dashboard.loggedUserData,
    userPageData: state.dashboard.userPageData,
  }
}

function mapDispatchToProps(dispatch) {
  const actions = {
    resetUserPageData,
    fetchUserPageData,
    sendComment,
    updatePostsWithComments,
    sendInvitation,
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapPropsToState, mapDispatchToProps)(UserPage);