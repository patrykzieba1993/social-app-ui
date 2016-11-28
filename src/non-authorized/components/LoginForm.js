import React, {Component, PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class LoginForm extends Component {
  state = {
    loginError: '',
    passwordError: '',
  }

  handleLogin() {

  }

  render() {
    return (
      <div>
        <Paper key="LoginForm" zDepth='1' style={{width: '50%', margin: '0 auto', paddingBottom: '15px', marginBottom: '10px'}}>
          <form method="post" action="/login/authenticate">
            <TextField
              name="login"
              floatingLabelText="Login"
              errorText={this.state.loginError}
              ref={(c) => this.login = c}
              autoFocus
            />
            <br/>
            <TextField
              name="password"
              floatingLabelText="Hasło"
              type="password"
              errorText={this.state.passwordError}
              ref={(c) => this.password = c}
            />
            <br/>
            <br/>
            <RaisedButton
              label="Zaloguj"
              type="submit"
              primary={true}
            />
          </form>
        </Paper>
      </div>
    );
  }
}

export default LoginForm;