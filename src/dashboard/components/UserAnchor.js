import React, { Component, PropTypes } from 'react';

class UserAnchor extends Component {
  
  render() {
    return (
      <div>
        imie, nazwisko....
      </div>
    )
  }
}

UserAnchor.propTypes = {
  loggedUserData: PropTypes.object,
};

export default UserAnchor;