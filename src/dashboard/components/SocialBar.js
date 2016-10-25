import React, { Component, PropTypes } from 'react';

import AppBar from 'material-ui/AppBar';
import SocialBarItems from './SocialBarItems';

class SocialBar extends Component {
  constructor() {
    super();
  }
  
  render() {
    const { notifications } = this.props;
    return (
      <div>
        <AppBar
          title={<span>Social App</span>}
          iconElementRight={<SocialBarItems notifications={notifications} />}
          style={{marginBottom: '10px'}}
        />
      </div>
    );
  }
}

SocialBar.propTypes = {
  notifications: PropTypes.object,
}

export default SocialBar;