import React, {Component, PropTypes} from 'react';
import FlatButton from 'material-ui/FlatButton';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Link } from 'react-router';

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
    return (
      <div>
        <div>
          <Link to="/login/register">
            <FlatButton label="Rejestracja" primary={true}/>
          </Link>
        </div>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  showRegisterDialog: PropTypes.func.isRequired
};

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

export default App;
