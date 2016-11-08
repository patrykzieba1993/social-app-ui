import React, { Component, PropTypes } from 'react';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import SocialBar from './SocialBar';

class App extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    const { initSocket, location, setLoggedUserData } = this.props;
    initSocket(location.id);
    setLoggedUserData({ id: location.id });
  }
  
  getChildContext() {
    const {location} = this.props;
    return {
      muiTheme: getMuiTheme(baseTheme),
      location,
      loggedUserData: {id: location.id}, // load id from localstorage
    }
  }
  
  render() {
    return (
      <div>
        <SocialBar />
          {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.object,
  initSocket: PropTypes.func.isRequired,
  setLoggedUserData: PropTypes.func.isRequired,
};

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
  location: PropTypes.object,
  loggedUserData: PropTypes.object,
};

export default App;
