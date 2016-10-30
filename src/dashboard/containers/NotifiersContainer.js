import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import NotifierItems from '../components/NotifierItems';

import {
  fetchPostsAndCommentsNotifications,
  fetchMessagesNotifications,
  fetchFriendshipsNotifications,
  inactivatePostsAndCommentsNotifications,
  inactivateMessagesNotifications,
  inactivateFriendshipsNotifications,
} from '../actions/dashboard';

function mapPropsToState(state, ownProps) {
  return {
    location: ownProps.location,
    notifications: {
      postsNotifications: state.dashboard.postsNotifications,
      commentsNotifications: state.dashboard.commentsNotifications,
      messagesNotifications: state.dashboard.messagesNotifications,
      friendshipsNotifications: state.dashboard.friendshipsNotifications,
    },
    data: {
      postsAndCommentsNotificationsData: state.dashboard.postsAndCommentsNotificationsData,
      messagesNotificationsData: state.dashboard.messagesNotificationsData,
      friendshipsNotificationsData: state.dashboard.friendshipsNotificationsData,
    }
  };
}

function mapDispatchToProps(dispatch) {
  const actions = {
    fetchPostsAndCommentsNotifications,
    fetchMessagesNotifications,
    fetchFriendshipsNotifications,
    inactivatePostsAndCommentsNotifications,
    inactivateMessagesNotifications,
    inactivateFriendshipsNotifications,
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapPropsToState, mapDispatchToProps)(NotifierItems);