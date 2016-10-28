import {
  RECEIVE_FRIENDS,
  RECEIVE_MESSAGES,
  RECEIVE_SINGLE_MESSAGE,
  SET_RECEIVER_ID,
} from '../actions/chat'

const defaultState = {
  friends: [],
  messages: [],
  receiverId: null,
};

export default function filters(state = defaultState, action) {
  switch(action.type) {
    case RECEIVE_FRIENDS:
      return Object.assign({}, state, { friends: [...action.data]});
    case RECEIVE_MESSAGES:
      return Object.assign({}, state, { messages: [...action.data] });
    case RECEIVE_SINGLE_MESSAGE:
      if (state.receiverId == action.data.receiverId || state.receiverId == action.data.senderId) {
        return Object.assign({}, state, { messages: [...state.messages, action.data ]});
      }
      return state;
    case SET_RECEIVER_ID: 
      return Object.assign({}, state, { receiverId: action.data });
    default:
      return state;
  }
}