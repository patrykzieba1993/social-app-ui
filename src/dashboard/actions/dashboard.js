import SocketService from '../../services/socketsService';
import apiServices from '../../services/apiService';

export const INIT_SOCKET = 'INIT_SOCKET';
export const RECEIVE_POST = 'RECEIVE_POST';
export const FETCH_POSTS = 'FETCH_POSTS';

const socketService = new SocketService();

export function initSocket() {
  return(dispatch, getState) => {
    socketService.init();
    socketService.onPost(msg => dispatch(receiveMessage(msg)));
  }
}

export function receiveMessage(msg) {
  return {
    type: RECEIVE_POST,
    data: msg,
  }
}

export function fetchPosts(id) {
  return(dispatch, getState) => {
    apiServices.fetchPosts(id)
      .then((posts) => {
        console.log(posts);
      })
  }
}

export function sendPost(post, id) {
  return(dispatch, getState) => {
    socketService.sendPost(post, id);
  }
}