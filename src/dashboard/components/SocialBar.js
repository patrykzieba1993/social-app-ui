import React, { Component, PropTypes } from 'react';

import AppBar from 'material-ui/AppBar';
import SocialBarItems from './SocialBarItems';
import Home from 'material-ui/svg-icons/action/home';
import { Link } from 'react-router';

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
          iconElementLeft={
          <Link to={`/dashboard/home/${this.context.loggedUserData.id}`} >
            <Home style={{marginTop: '10px', color: '#000'}} />
          </Link>}
          style={{marginBottom: '10px'}}
          titleStyle={{width: '100px'}}
        />
      </div>
    );
  }
}

SocialBar.contextTypes = {
  loggedUserData: PropTypes.object,
}

SocialBar.propTypes = {
}

export default SocialBar;