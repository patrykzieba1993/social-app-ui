import React, {Component, PropTypes} from 'react';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';

import NotifiersContainer from '../containers/NotifiersContainer';
import UserSearchContainer from '../containers/UserSearchContainer';

class SocialBarItems extends Component {
  render() {
    const { location } = this.context;
    return (
      <Toolbar style={{ background: 'rgb(0, 188, 212)'}}>
        <ToolbarGroup>
          <UserSearchContainer location={location} />
          <NotifiersContainer location={location} />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

SocialBarItems.contextTypes = {
  location: PropTypes.object,
}

export default SocialBarItems;