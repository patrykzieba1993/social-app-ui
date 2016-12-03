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
          title={
            <Link to={`/dashboard/home/${this.context.loggedUserData.id}`} style={{textDecoration: 'none', color: '#ffffff'}}>
              <span>Social App</span>
            </Link>
          }
          iconElementLeft={<span></span>}
          iconElementRight={<SocialBarItems loggedUserData={this.props.loggedUserData} />}
          iconStyleRight={{marginLeft: '0', width: '100%'}}
          style={{marginBottom: '10px'}}
          titleStyle={{width: '150px', flex: 'none'}}
        />
      </div>
    );
  }
}

SocialBar.contextTypes = {
  loggedUserData: PropTypes.object,
}

SocialBar.propTypes = {
  loggedUserData: PropTypes.object,
}

export default SocialBar;