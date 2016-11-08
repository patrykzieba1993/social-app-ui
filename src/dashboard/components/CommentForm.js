import React, { Component, PropTypes } from 'react';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

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
    const { sendComment, loggedUserData, id, friendProfile } = this.props;
    
    sendComment(this.state.comment, loggedUserData.id, id, friendProfile);
  }
  
  handleTextChange(e) {
    this.setState({
      comment: e.target.value,
    });
  }
  
  render() {
    return (
      <div>
        <TextField 
          floatingLabelText="Komentarz ..."
          onChange={this.handleTextChange}
        />
        <FlatButton
          label="Dodaj komentarz"
          onTouchTap={this.handleSend}
        />
      </div>
    );
  }
}


CommentForm.propTypes = {
  friendProfile: PropTypes.bool,
  sendComment: PropTypes.func.isRequired,
  loggedUserData: PropTypes.object,
  id: PropTypes.number,
};

export default CommentForm;