import React, { Component, PropTypes } from 'react';


class UserPage extends Component {
  constructor() {
    super();
  }

  render() {
    console.log(this.props.location);
    return (
      <div>
        user page...
      </div>
    );
  }
}

UserPage.propTypes = {
  location: PropTypes.object,
}

export default UserPage;