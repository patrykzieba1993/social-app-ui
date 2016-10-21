import SocketService from '../../services/socketsService';
import apiServices from '../../services/apiService';

export const INIT_SOCKET = 'INIT_SOCKET';
export const RECEIVE_POSTS_WITH_COMMENTS = 'RECEIVE_POSTS_WITH_COMMENTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const FETCH_POSTS = 'FETCH_POSTS';

const socketService = new SocketService();

export function initSocket() {
  return(dispatch, getState) => {
    socketService.init();
    socketService.onPost(post => dispatch(receivePost(post)));
  }
}

export function receivePost(post) {
  return {
    type: RECEIVE_POST,
    data: post,
  };
}

export function receivePostsWithComments(data) {
  return {
    type: RECEIVE_POSTS_WITH_COMMENTS,
    data,
  }
}

export function fetchPostsWithComments(id) {
  return(dispatch, getState) => {
    apiServices.fetchPostsWithComments(id)
      .then((data) => {
        dispatch(receivePostsWithComments(data));
      })
  }
}

export function sendPost(post, id) {
  return(dispatch, getState) => {
    socketService.sendPost(post, id);
  }
}