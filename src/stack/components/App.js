import React, { Component, PropTypes } from 'react';

class App extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
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

export default App;
