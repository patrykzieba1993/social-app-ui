export const RECEIVE_FRIENDS = 'RECEIVE_FRIENDS';
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';
export const RECEIVE_SINGLE_MESSAGE = 'RECEIVE_SINGLE_MESSAGE';
export const SET_RECEIVER_ID = 'SET_RECEIVER_ID';

import socketService from '../../services/socketsService';
import apiServices from '../../services/apiService';

export function initChat() {
  return (dispatch, getState) => {
    socketService.onMessage(message => dispatch(receiveSingleMessage(message)));
  };
};

export function receiveFriends(data) {
  return {
    type: RECEIVE_FRIENDS,
    data,
  }
}

export function receiveMessages(data) {
  return {
    type: RECEIVE_MESSAGES,
    data,
  }
}

export function receiveSingleMessage(data) {
  return {
    type: RECEIVE_SINGLE_MESSAGE,
    data,
  }
}

export function setReceiverId(id) {
  return {
    type: SET_RECEIVER_ID,
    data: id,
  }
}

export function sendMessage(message, senderId, receiverId) {
  return (dispatch, getState) => {
    socketService.sendMessage(message, senderId, receiverId);
  }
}

export function fetchFriends(id) {
  return (dispatch, getState) => {
    apiServices.fetchFriends(id)
      .then((data) => dispatch(receiveFriends(data)));
  }
}

export function fetchMessages(senderId, receiverId) {
  return (dispatch, getState) => {
    apiServices.fetchMessages(senderId, receiverId)
      .then((data) => dispatch(receiveMessages(data)));
  };
}

