import React, { Component, PropTypes } from 'react';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import SocialBar from './SocialBar';

class App extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    const { initSocket, location } = this.props;
    initSocket(location.id);
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
  location: PropTypes.object,
  initSocket: PropTypes.func.isRequired,
  postsNotifications: PropTypes.number,
  commentsNotifications: PropTypes.number,
  messagesNotifications: PropTypes.number,
  friendshipsNotifications: PropTypes.number,
};

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

export default App;
