import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';

class UserAnchor extends Component {
  
  render() {
    const { firstName, lastName, id, login } = this.props.loggedUserData;
    return (
      <Link to={`/dashboard/page/${id}`}>
        <FlatButton
          icon={<Avatar src={`../../${login}.jpg`} size={36} />}
          label={`${firstName} ${lastName}`}
          style={{color: '#ffffff', marginTop: '6px', marginRight: '0px'}} />
      </Link>  
    )
  }
}

UserAnchor.propTypes = {
  loggedUserData: PropTypes.object,
};

export default UserAnchor;