import React, {Component, PropTypes} from 'react'
import Paper from 'material-ui/Paper';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import io from 'socket.io-client';

class PostForm extends Component {
  constructor() {
    super();
    this.handleSend = this.handleSend.bind(this);
  }
  
  handleSend() {
    const socket = io.connect('localhost:3001');
    socket.emit('post', { text: 'lololo', id: this.props.params.id });
  }
  
  render() {
    return (
      <div>
        <Paper zDepth='1' style={{width: '50%', margin: '0 auto', paddingBottom: '8px'}}>
          <TextField
            floatingLabelText="Napisz coś ..."
            multiLine={true}
            rows={2}
            rowsMax={4}
            style={{width: '90%', margin: '0 5% 0 5%'}}
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


export default PostForm;