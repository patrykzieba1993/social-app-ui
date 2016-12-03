import React, { Component, PropTypes } from 'react';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

class CommentForm extends Component {
  constructor() {
    super();
    this.handleSend = this.handleSend.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }
  
  state = {
    comment: null,
  };
  
  handleSend() {
    const { sendComment, id, friendProfile } = this.props;
    
    sendComment(this.state.comment, this.context.loggedUserData.id, id, friendProfile);
  }
  
  handleTextChange(e) {
    this.setState({
      comment: e.target.value,
    });
  }
  
  render() {
    return (
      <Paper style={{ padding: '0 5px 20px 5px', marginTop: '20px', borderColor: 'red'}} zDepth="1">
        <TextField 
          floatingLabelText="Komentarz ..."
          onChange={this.handleTextChange}
          style={{width: '70%', marginRight: '5%'}}
        />
        <RaisedButton
          primary={true}
          buttonStyle={{height: '30px', lineHeight: '30px'}}
          style={{height: '30px'}}
          labelStyle={{fontSize: '12px'}}
          label="Dodaj komentarz"
          onTouchTap={this.handleSend}
        />
      </Paper>
    );
  }
}


CommentForm.propTypes = {
  friendProfile: PropTypes.bool,
  sendComment: PropTypes.func.isRequired,
  loggedUserData: PropTypes.object,
  id: PropTypes.number,
};

CommentForm.contextTypes = {
  loggedUserData: PropTypes.object,
};

export default CommentForm;