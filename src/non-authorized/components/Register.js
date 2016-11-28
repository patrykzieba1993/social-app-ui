import React, {Component, PropTypes} from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

class Register extends Component {
  constructor() {
    super();
    this.handleSend = this.handleSend.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  state = {
    firstNameError: '',
    lastNameError: '',
    loginError: '',
    passwordError: '',
    confirmPasswordError: '',
    emailError: '',
    avatar: null,
  }

  componentDidUpdate() {
    if (this.props.registerState) {
      this.handleClose();
    }
  }
  
  componentWillMount() {
    const { resetRegister } = this.props;
    resetRegister();
  }

  handleFile(e) {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = (upload) => {
      this.setState({
        avatar: {
          data_uri: upload.target.result,
          filename: file.name,
          filetype: file.type,
        }
      });
    }

    reader.readAsDataURL(file);
  }

  handleClose() {
    const { router } = this.context;
    router.push('/login');
  };

  handleSend() {
    const personalData = {
      firstName: this.firstName.input.value,
      lastName: this.lastName.input.value,
      login: this.login.input.value,
      password: this.password.input.value,
      confirmPassword: this.confirmPassword.input.value,
      email: this.email.input.value,
      birthDate: this.date.state.date,
      sex: this.sex.state.selected,
      avatar: this.state.avatar.data_uri,
    };
    
    this.register(personalData);
  }

  register(personalData) {
    const { register } = this.props;
    register(personalData);
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
              ref= {(c) => this.firstName = c}
            />
            <br/>
            <TextField
              floatingLabelText="Nazwisko"
              errorText={this.state.lastNameError}
              ref= {(c) => this.lastName = c}
            />
            <br/>
            <TextField
              floatingLabelText="Adres e-mail"
              errorText={this.state.emailError}
              ref= {(c) => this.email = c}
            />
            <br/>
            <TextField
              floatingLabelText="Login"
              errorText={this.state.loginError}
              ref= {(c) => this.login = c}
            />
            <br/>
            <TextField
              floatingLabelText="Hasło"
              type="password"
              errorText={this.state.passwordError}
              ref= {(c) => this.password = c}
            />
            <br/>
            <TextField
              floatingLabelText="Potwierdź hasło"
              type="password"
              errorText={this.state.confirmPasswordError}
              ref= {(c) => this.confirmPassword = c}
            />
            <br/>
            <br/>
            <DatePicker
              hintText="Data urodzenia"
              mode="landscape"
              ref={(c) => this.date = c}
            />
            <br/>
            <RadioButtonGroup defaultSelected="male" name="sex" ref= {(c) => this.sex = c}>
              <RadioButton
                value="male"
                label="Mężczyzna"
              />
              <RadioButton
                value="female"
                label="Kobieta"
              />
            </RadioButtonGroup>
            <br />
            <input onChange={(e) => this.handleFile(e)} type="file" name="avatar" />
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
  register: PropTypes.func.isRequired,
  resetRegister: PropTypes.func.isRequired,
  registerSuccessful: PropTypes.func.isRequired,
  registerState: PropTypes.bool,
};

export default Register;