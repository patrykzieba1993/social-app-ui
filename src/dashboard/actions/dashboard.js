import SocketService from '../../services/socketsService';
import apiServices from '../../services/apiService';

export const INIT_SOCKET = 'INIT_SOCKET';
export const RECEIVE_POSTS_WITH_COMMENTS = 'RECEIVE_POSTS_WITH_COMMENTS';
export const FETCH_POSTS = 'FETCH_POSTS';

const socketService = new SocketService();

export function initSocket() {
  return(dispatch, getState) => {
    socketService.init();
    socketService.onPost(msg => dispatch(receiveMessage(msg)));
  }
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