import React, { Component, PropTypes } from 'react';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class App extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    const { id } = this.props.location;
    const { initSocket, fetchPosts } = this.props;
    initSocket();
    fetchPosts(id);
  }
  
  getChildContext() {
    return {
      muiTheme: getMuiTheme(baseTheme)
    }
  }
  
  handleClick() {
    const { saySth } = this.props;
    saySth();
  }

  render() {
    const { location } = this.props;

    return (
      <div>
          {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  initSocket: PropTypes.func.isRequired
};

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

export default App;
