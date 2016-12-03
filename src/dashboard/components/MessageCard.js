import React, { Component, PropTypes } from 'react'
import Card from 'material-ui/Card';

class MessageCard extends Component {
  render() {
    const { messages, location } = this.props;
    
    const items = messages.map(message => {
      let align = message.senderId == location.id ? 'right': 'left';  
      return (
        <div style={{textAlign: align, width: '100%'}}>{message.content}</div>
      );
    });
    return (
      <Card style={{minHeight: '300px'}}>
        { items }
      </Card>
    );
  }
}

MessageCard.PropTypes = {
  location: PropTypes.object,
  messages: PropTypes.array,
}

export default MessageCard;