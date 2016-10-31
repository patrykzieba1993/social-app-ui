import React, { Component, PropTypes } from 'react';

import AppBar from 'material-ui/AppBar';
import SocialBarItems from './SocialBarItems';

class SocialBar extends Component {
  constructor() {
    super();
  }
  
  render() {
    return (
      <div>
        <AppBar
          title={<span>Social App</span>}
          iconElementRight={<SocialBarItems/>}
          style={{marginBottom: '10px'}}
          titleStyle={{width: '100px'}}
        />
      </div>
    );
  }
}

SocialBar.propTypes = {
}

export default SocialBar;