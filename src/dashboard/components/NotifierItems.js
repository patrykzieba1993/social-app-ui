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
    const { notifications } = this.props;
    
    return (
      <div style={{marginRight: '100px'}}>
        <Notifier notification={ notifications.postsNotifications + notifications.commentsNotifications } icon={<NotificationsIcon />} />
        <Notifier notification={ notifications.messagesNotifications } icon={<CakeIcon />} />
        <Notifier notification={ notifications.friendshipsNotifications} icon={<MoodIcon />} />
      </div>
    );
  }
}

NotificationsIcon.propTypes = {
  notifications: PropTypes.object,
}

export default NotifierItems;