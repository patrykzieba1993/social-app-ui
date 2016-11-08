import React, {Component, PropTypes} from 'react';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';

import NotifiersContainer from '../containers/NotifiersContainer';
import UserSearchContainer from '../containers/UserSearchContainer';

class SocialBarItems extends Component {
  render() {
    const { location } = this.context;
    return (
      <Toolbar style={{ background: 'rgb(0, 188, 212)'}}>
        <ToolbarGroup>
          <Link to={`/dashboard/chat/${this.context.loggedUserData.id}`} >
            <RaisedButton
              style={{marginTop: '6px', marginRight: '25px'}}
              label="Wiadomości"
              secondary={true}
            />
          </Link>
          <UserSearchContainer location={location} />
          <NotifiersContainer location={location} />
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