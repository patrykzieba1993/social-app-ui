import socketService from '../../services/socketsService';
import apiServices from '../../services/apiService';

export const INIT_SOCKET = 'INIT_SOCKET';
export const FETCH_POSTS = 'FETCH_POSTS';
export const RECEIVE_POSTS_WITH_COMMENTS = 'RECEIVE_POSTS_WITH_COMMENTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const RECEIVE_POST_NOTIFICATION = 'RECEIVE_POST_NOTIFICATION';
export const RECEIVE_COMMENT_NOTIFICATION = 'RECEIVE_COMMENT_NOTIFICATION';
export const RECEIVE_MESSAGE_NOTIFICATION = 'RECEIVE_MESSAGE_NOTIFICATION';

export function initSocket(userId) {
  return(dispatch, getState) => {
    socketService.sendClientInfo(userId);
    socketService.onPost(post => dispatch(receivePost(post)));
    socketService.onComment(comment => dispatch(receiveComment(comment)));
    socketService.onPostNotification(postNotification => dispatch(receivePostNotification()));
    socketService.onCommentNotification(commentNotification => dispatch(receiveCommentNotification()));
    socketService.onMessageNotification(messageNotification => dispatch(receiveMessageNotification()));
  }
}

export function receivePost(post) {
  return {
    type: RECEIVE_POST,
    data: post,
  };
}

export function receiveComment(comment) {
  return {
    type: RECEIVE_COMMENT,
    data: comment,
  };
}

export function receivePostNotification() {
  return {
    type: RECEIVE_POST_NOTIFICATION,
  };
}

export function receiveCommentNotification() {
  return {
    type: RECEIVE_COMMENT_NOTIFICATION,
  };
}

export function receiveMessageNotification() {
  return {
    type: RECEIVE_MESSAGE_NOTIFICATION,
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

export function sendComment(comment, userId, postId) {
  return (dispatch, getState) => {
    socketService.sendComment(comment, userId, postId);
  };
}

export function sendPost(post, id) {
  return(dispatch, getState) => {
    socketService.sendPost(post, id);
  };
}