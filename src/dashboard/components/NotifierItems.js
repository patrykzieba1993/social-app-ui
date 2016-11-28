import React, {Component, PropTypes} from 'react';
import Notifier from './Notifier';

import NotificationsIcon from 'material-ui/svg-icons/social/notifications-active';
import CakeIcon from 'material-ui/svg-icons/social/cake';
import MoodIcon from 'material-ui/svg-icons/social/mood-bad';

class NotifierItems extends Component {
  state = {
    open: false,
  }

  handleTouchTap = (event) => {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { 
      notifications,
      location,
      data,
      fetchPostsAndCommentsNotifications,
      fetchMessagesNotifications,
      fetchFriendshipsNotifications,
      inactivatePostsAndCommentsNotifications,
      inactivateMessagesNotifications,
      inactivateFriendshipsNotifications,
      sendAccept,
      sendReject,
    } = this.props;
    
    return (
      <div style={{marginRight: '100px'}}>
        <Notifier 
          notification={ notifications.postsNotifications + notifications.commentsNotifications } 
          fetcher={fetchPostsAndCommentsNotifications}
          inactivate={inactivatePostsAndCommentsNotifications}
          icon={<NotificationsIcon />} 
          location={location}
          data={data.postsAndCommentsNotificationsData}
        />
        <Notifier 
          notification={ notifications.messagesNotifications } 
          fetcher={fetchMessagesNotifications}
          inactivate={inactivateMessagesNotifications}
          icon={<CakeIcon />}
          location={location}
          data={data.messagesNotificationsData}
        />
        <Notifier 
          notification={ notifications.friendshipsNotifications} 
          fetcher={fetchFriendshipsNotifications}
          inactivate={inactivateFriendshipsNotifications}
          icon={<MoodIcon />}
          location={location}
          data={data.friendshipsNotificationsData}
          sendAccept={sendAccept}
          sendReject={sendReject}
        />
      </div>
    );
  }
}

NotifierItems.propTypes = {
  location: PropTypes.object,
  notifications: PropTypes.object,
  data: PropTypes.object,
  fetchPostsAndCommentsNotifications: PropTypes.func,
  fetchMessagesNotifications: PropTypes.func,
  fetchFriendshipsNotifications: PropTypes.func,
  inactivatePostsAndCommentsNotifications: PropTypes.func,
  inactivateMessagesNotifications: PropTypes.func,
  inactivateFriendshipsNotifications: PropTypes.func,
  sendAccept: PropTypes.func,
  sendReject: PropTypes.func,
}

export default NotifierItems;