import React, {Component, PropTypes} from 'react';
import NotifierItems from './NotifierItems';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

class SocialBarItems extends Component {
  render() {
    const { notifications } = this.props;
    return (
      <Toolbar style={{ background: 'rgb(0, 188, 212)'}}>
        <ToolbarGroup>
          <NotifierItems notifications={notifications} />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

SocialBarItems.propTypes = {
  notifications: PropTypes.object,
}

export default SocialBarItems;