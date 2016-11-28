import React, { Component, PropTypes } from 'react'

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class MessageForm extends Component {
  constructor(){
    super();
    this.handleSend = this.handleSend.bind(this);
    this.changeMessageState = this.changeMessageState.bind(this);
  }
  
  state = {
    message: null,
  };

  changeMessageState(e) {
    this.setState({
      message: e.target.value,
    });
  }
  
  handleSend() {
    const { send } = this.props;
    send(this.state.message);
  }
  
  render() {
    return (
      <div>
        <TextField
          style = {{width: '100%'}}
          hintText="Napisz wiadomość..."
          multiLine={true}
          rows={1}
          rowsMax={5}
          onChange={this.changeMessageState}
          autoFocus
        />
        <br />
        <RaisedButton
          style={{float: 'right'}}
          label="Wyślij"
          primary={true}
          onTouchTap={this.handleSend}
        />
      </div>
    );
  }
}

MessageForm.PropTypes = {
  send: PropTypes.func.isRequired,
}

export default MessageForm;