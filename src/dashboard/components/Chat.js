import React, { Component, PropTypes } from 'react'
import Paper from 'material-ui/Paper';

import MessageCard from './MessageCard';
import MessageForm from './MessageForm';
import FriendsCard from './FriendsCard';

class Chat extends Component {
  constructor() {
    super();
    this.prepareAndSendMessage = this.prepareAndSendMessage.bind(this);
    this.setReceiverId = this.setReceiverId.bind(this);
    this.getMessages = this.getMessages.bind(this);
  }
  
  componentWillMount() {
    const { fetchFriends, location, initChat } = this.props;
    initChat();
    fetchFriends(location.id);
  }
  
  prepareAndSendMessage(message) {
    const { location, receiverId, sendMessage } = this.props;
    sendMessage(message, location.id, receiverId);
  }
  
  setReceiverId(receiverId) {
    const { setReceiverId } = this.props;
    setReceiverId(receiverId);
    this.getMessages(receiverId);
  }
  
  getMessages(receiverId) {
    const { location, fetchMessages } = this.props;
    fetchMessages(location.id, receiverId);
  }
  
  render() {
    const { friends, messages, location } = this.props;
    
    return (
      <div>
        <Paper zDepth='1' style={{width: '70%', margin: '0 auto', paddingBottom: '8px'}}>
          <div style={{overflow: 'auto'}}>
            <div style={{float: 'left', width: '70%'}}>
              <MessageCard messages={ messages } location={ location } />
              <MessageForm send={ this.prepareAndSendMessage } />
            </div>
            <div style={{float: 'left', width: '30%'}}>
              <FriendsCard friends={ friends } set={ this.setReceiverId } />
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

Chat.PropTypes = {
  location: PropTypes.object,
  receiverId: PropTypes.number,
  friends: PropTypes.array,
  messages: PropTypes.array,
  fetchFriends: PropTypes.func.isRequired,
  fetchMessages: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  setReceiverId: PropTypes.func.isRequired,
  initChat: PropTypes.func.isRequired,
}

export default Chat;