import React, { Component, PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';

class Logout extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <a href="/login" >
        <FlatButton
          label="Wyloguj"
          onTouchTap={ this.handleClick }
          style={{marginTop: '6px', color: '#ffffff'}}
        />
      </a>
    );
  }
}

Logout.propTypes = {

};

Logout.contextTypes = {
  router: PropTypes.object,
};
export default Logout;