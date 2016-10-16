import React, { Component, PropTypes } from 'react';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class App extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
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
  saySth: PropTypes.func.isRequired
};

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

export default App;
