import React, {Component, PropTypes} from 'react';
import FlatButton from 'material-ui/FlatButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Link } from 'react-router';

import LoginForm from './LoginForm';

class App extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme(baseTheme)
    }
  }

  handleClick() {
    const {showRegisterDialog} = this.props;
    showRegisterDialog();
  }
  
  render() {
    const { registerState } = this.props;
    
    return (
      <div>
        <div style={{textAlign: 'center', marginTop: '25px'}}>
          <LoginForm />
          <Link to="/login/register">
            <FlatButton label="Rejestracja" primary={true}/>
          </Link>
          <span style={{display: registerState ? 'block' : 'none'}}>Pomyslna rejestracja</span>
        </div>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  registerState: PropTypes.bool,
};

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

export default App;
