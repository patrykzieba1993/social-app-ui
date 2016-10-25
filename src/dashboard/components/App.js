import React, { Component, PropTypes } from 'react';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import SocialBar from './SocialBar';

class App extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    const { id } = this.props.location;
    const { initSocket, fetchPostsWithComments } = this.props;
    initSocket(id);
    fetchPostsWithComments(id);
  }
  
  getChildContext() {
    return {
      muiTheme: getMuiTheme(baseTheme)
    }
  }
  
  render() {
    const { postsNotifications, commentsNotifications, friendshipsNotifications, messagesNotifications } = this.props;
    const notifications = { postsNotifications, commentsNotifications, messagesNotifications, friendshipsNotifications };
    
    return (
      <div>
        <SocialBar notifications={notifications} />
          {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  initSocket: PropTypes.func.isRequired,
  fetchPostsWithComments: PropTypes.func.isRequired,
  postsNotifications: PropTypes.number,
  commentsNotifications: PropTypes.number,
  messagesNotifications: PropTypes.number,
  friendshipsNotifications: PropTypes.number,
};

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

export default App;
