import React, {Component, PropTypes} from 'react';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

import NotifiersContainer from '../containers/NotifiersContainer';
import UserSearchContainer from '../containers/UserSearchContainer';
import UserAnchor from '../components/UserAnchor';
import Logout from '../components/Logout';

class SocialBarItems extends Component {
  render() {
    const { location } = this.context;
    return (
      <Toolbar style={{ background: 'rgb(0, 188, 212)', display: 'block', padding: '0px'}}>
        <ToolbarGroup>
          <UserSearchContainer location={location} />
          <UserAnchor loggedUserData={this.props.loggedUserData}/>
          <Link to={`/dashboard/chat/${this.context.loggedUserData.id}`} >
            <RaisedButton
              style={{marginTop: '6px', marginRight: '0px'}}
              label="Wiadomości"
              secondary={true}
            />
          </Link>
          <NotifiersContainer location={location} />
          <Logout />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}


SocialBarItems.contextTypes = {
  location: PropTypes.object,
  loggedUserData: PropTypes.object,
}

export default SocialBarItems;