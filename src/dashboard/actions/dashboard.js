import socketService from '../../services/socketsService';
import apiServices from '../../services/apiService';

export const INIT_SOCKET = 'INIT_SOCKET';
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POSTS_AND_COMMENTS_NOTIFICATIONS = 'FETCH_POSTS_AND_COMMENTS_NOTIFICATIONS';
export const FETCH_MESSAGES_NOTIFICATIONS = 'FETCH_MESSAGES_NOTIFICATIONS';
export const FETCH_FRIENDSHIPS_NOTIFICATIONS = 'FETCH_FRIENDSHIPS_NOTIFICATIONS';
export const RECEIVE_POSTS_WITH_COMMENTS = 'RECEIVE_POSTS_WITH_COMMENTS';
export const RECEIVE_POST = 'RECEIVE_POST';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const RECEIVE_POST_NOTIFICATION = 'RECEIVE_POST_NOTIFICATION';
export const RECEIVE_COMMENT_NOTIFICATION = 'RECEIVE_COMMENT_NOTIFICATION';
export const RECEIVE_MESSAGE_NOTIFICATION = 'RECEIVE_MESSAGE_NOTIFICATION';
export const RECEIVE_POSTS_AND_COMMENTS_NOTIFICATIONS_WITH_DATA = 'RECEIVE_POSTS_AND_COMMENTS_NOTIFICATIONS_WITH_DATA';
export const RECEIVE_MESSAGES_NOTIFICATIONS_WITH_DATA = 'RECEIVE_MESSAGES_NOTIFICATIONS_WITH_DATA';
export const RECEIVE_FRIENDSHIPS_NOTIFICATIONS_WITH_DATA = 'RECEIVE_FRIENDSHIPS_NOTIFICATIONS_WITH_DATA';
export const RECEIVE_SEARCH_RESULT = 'RECEIVE_SEARCH_RESULT';
export const POSTS_AND_COMMENETS_NOTIFICATIONS_INACTIVATED = 'POSTS_AND_COMMENETS_NOTIFICATIONS_INACTIVATED';
export const MESSAGES_NOTIFICATIONS_INACTIVATED = 'MESSAGES_NOTIFICATIONS_INACTIVATED';
export const FRIENDSHIPS_NOTIFICATIONS_INACTIVATED = 'FRIENDSHIPS_NOTIFICATIONS_INACTIVATED';

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

export function receivePostsAndCommentsNotificationsWithData(data) {
  return {
    type: RECEIVE_POSTS_AND_COMMENTS_NOTIFICATIONS_WITH_DATA,
    data,
  }
}

export function receiveMessageNotification() {
  return {
    type: RECEIVE_MESSAGE_NOTIFICATION,
  }
}

export function receiveMessagesNotificationsWithData(data) {
  return {
    type: RECEIVE_MESSAGES_NOTIFICATIONS_WITH_DATA,
    data,
  }
}

export function receiveFriendshipsNotificationsWithData(data) {
  return {
    type: RECEIVE_FRIENDSHIPS_NOTIFICATIONS_WITH_DATA,
    data,
  }
}

export function postsAndCommentsNotificationInactivated() {
  return  {
    type: POSTS_AND_COMMENETS_NOTIFICATIONS_INACTIVATED
  }
}

export function messagesNotificationInactivated() {
  return {
    type: MESSAGES_NOTIFICATIONS_INACTIVATED
  }
}

export function friendshipsNotificationInactivated() {
  return {
    type: FRIENDSHIPS_NOTIFICATIONS_INACTIVATED
  }
}

export function receivePostsWithComments(data) {
  return {
    type: RECEIVE_POSTS_WITH_COMMENTS,
    data,
  }
}

export function receiveSearchResult(data) {
  return {
    type: RECEIVE_SEARCH_RESULT,
    data,
  };
}

export function fetchPostsWithComments(id) {
  return(dispatch, getState) => {
    apiServices.fetchPostsWithComments(id)
      .then((data) => {
        dispatch(receivePostsWithComments(data));
      })
  }
}

export function fetchPostsAndCommentsNotifications(id) {
  return (dispatch, getState) => {
    apiServices.fetchPostsAndCommentsNotifications(id)
      .then((data) => {
        dispatch(receivePostsAndCommentsNotificationsWithData(data));
      });
  };
}

export function fetchMessagesNotifications(id) {
  return (dispatch, getState) => {
    apiServices.fetchMessagesNotifications(id)
      .then((data) => {
        dispatch(receiveMessagesNotificationsWithData(data));
      });
  };
}

export function fetchFriendshipsNotifications(id) {
  return (dispatch, getState) => {
    apiServices.fetchFriendshipsNotifications(id)
      .then((data) => {
        dispatch(receiveFriendshipsNotificationsWithData(data));
      });
  };
}

export function inactivatePostsAndCommentsNotifications(id) {
  return (dispatch, getState) => {
    apiServices.inactivatePostsAndCommentsNotifications(id)
      .then(() => dispatch(postsAndCommentsNotificationInactivated()));
  };
}

export function inactivateMessagesNotifications(id) {
  return (dispatch, getState) => {
    apiServices.inactivateMessagesNotifications(id)
      .then(() => dispatch(messagesNotificationInactivated()));
  };
}

export function inactivateFriendshipsNotifications(id) {
  return (dispatch, getState) => {
    apiServices.inactivateFriendshipsNotifications(id)
      .then(() => dispatch(friendshipsNotificationInactivated()));
  };
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

export function sendUserSearchQuery(content, id) {
  return (dispatch, getState) => {
    apiServices.sendUserSearchQuery(content, id)
      .then(data => dispatch(receiveSearchResult(data)));
  };
}
