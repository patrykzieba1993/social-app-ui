import React, {Component, PropTypes} from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

class Register extends Component {
  constructor() {
    super();
  }

  state = {
    firstNameError: '',
    lastNameError: '',
    loginError: '',
    passwordError: '',
    confirmPasswordError: '',
    emailError: '',
  }
  
  handleClose = () => {
    const { router } = this.context;
    router.push('/login');
  };

  handleSend = () => {
    console.log('sending...');
  }
  
  render() {
    const actions = [
      <FlatButton
        label="Powrót"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Wyślij"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSend}
      />,
    ];

    return (
      <div>
        <Dialog
          title='Rejestracja'
          actions={actions}
          modal={false}
          open={true}
          autoScrollBodyContent={true}
          onRequestClose={this.handleClose}
        >
          <form>
            <TextField
              floatingLabelText="Imie"
              errorText={this.state.firstNameError}
            />
            <br/>
            <TextField
              floatingLabelText="Nazwisko"
              errorText={this.state.lastNameError}
            />
            <br/>
            <TextField
              floatingLabelText="Adres e-mail"
              errorText={this.state.emailError}
            />
            <br/>
            <TextField
              floatingLabelText="Login"
              errorText={this.state.loginError}
            />
            <br/>
            <TextField
              floatingLabelText="Hasło"
              type="password"
              errorText={this.state.passwordError}
            />
            <br/>
            <TextField
              floatingLabelText="Potwierdź hasło"
              type="password"
              errorText={this.state.confirmPasswordError}
            />
            <br/>
            <br/>
            <DatePicker
              hintText="Data urodzenia"
              mode="landscape"
            />
            <br/>
            <RadioButtonGroup defaultSelected="male">
              <RadioButton
                value="male"
                label="Mężczyzna"
              />
              <RadioButton
                value="female"
                label="Kobieta"
              />
            </RadioButtonGroup>
          </form>
        </Dialog>
      </div>
    )
  }
}

Register.contextTypes = {
  router: PropTypes.object,
};

Register.propTypes = {
  registerDialogVisible: PropTypes.bool.isRequired,
};

export default Register;