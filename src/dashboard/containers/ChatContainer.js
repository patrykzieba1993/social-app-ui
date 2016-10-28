import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Chat from '../components/Chat';

import { fetchFriends, fetchMessages, sendMessage, setReceiverId, initChat} from '../actions/chat';

function mapStateToProps(state, ownProps) {
  return {
    location: ownProps.params,
    receiverId: state.chat.receiverId,
    friends: state.chat.friends,
    messages: state.chat.messages,
  };
};

function mapDispatchToProps(dispatch) {
  const actions = {
    initChat,
    fetchFriends,
    fetchMessages,
    sendMessage,
    setReceiverId,
  };
  return bindActionCreators(actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);