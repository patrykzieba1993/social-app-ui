import React, {Component, PropTypes} from 'react'
import Paper from 'material-ui/Paper';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class PostForm extends Component {
  constructor() {
    super();
    this.handleSend = this.handleSend.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
  }
  state = {
    text: null,
  }
  
  handleSend() {
    const { sendPost } = this.props;
    console.log(this.context);
    sendPost(this.state.text, this.context.loggedUserData.id);
  }
  handleTextChange(e) {
    this.setState({
      text: e.target.value
    });
  }
  
  render() {
    return (
      <div>
        <Paper zDepth='1' style={{width: '50%', margin: '0 auto', paddingBottom: '8px'}}>
          <TextField
            key="Post input"
            floatingLabelText="Napisz coś ..."
            multiLine={true}
            rows={2}
            rowsMax={4}
            style={{width: '90%', margin: '0 5% 0 5%'}}
            onChange={this.handleTextChange}
            autoFocus
          />
          <div style={{textAlign: 'right', marginRight: '5%'}}>
            <RaisedButton
              label="Dodaj post"
              primary={true}
              onTouchTap={this.handleSend}
            />
          </div>
        </Paper>
      </div>
    );
  }
}

PostForm.PropTypes = {
  sendPost: PropTypes.func.isRequired,
  loggedUserData: PropTypes.object,
}

PostForm.contextTypes = {
  loggedUserData: PropTypes.object,
};

export default PostForm;