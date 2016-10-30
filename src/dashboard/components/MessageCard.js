import React, { Component, PropTypes } from 'react'

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
      <div>
        { items }
      </div>
    );
  }
}

MessageCard.PropTypes = {
  location: PropTypes.object,
  messages: PropTypes.array,
}

export default MessageCard;