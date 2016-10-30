import {
  RECEIVE_POSTS_WITH_COMMENTS,
  RECEIVE_POST,
  RECEIVE_COMMENT,
  RECEIVE_POST_NOTIFICATION,
  RECEIVE_COMMENT_NOTIFICATION,
  RECEIVE_MESSAGE_NOTIFICATION,
  RECEIVE_POSTS_AND_COMMENTS_NOTIFICATIONS_WITH_DATA,
  RECEIVE_MESSAGES_NOTIFICATIONS_WITH_DATA,
  RECEIVE_FRIENDSHIPS_NOTIFICATIONS_WITH_DATA,
  POSTS_AND_COMMENETS_NOTIFICATIONS_INACTIVATED,
  MESSAGES_NOTIFICATIONS_INACTIVATED,
  FRIENDSHIPS_NOTIFICATIONS_INACTIVATED,
} from '../actions/dashboard';

const defaultState = {
  postsWithComments: [],
  postsAndCommentsNotificationsData: [],
  messagesNotificationsData: [],
  friendshipsNotificationsData: [],
  postsNotifications: 0,
  commentsNotifications: 0,
  messagesNotifications: 0,
  friendshipsNotifications: 0,
};

export default function filters(state = defaultState, action) {
  switch (action.type) {
    case RECEIVE_POSTS_WITH_COMMENTS:
      return Object.assign({}, state, { postsWithComments: [...state.postsWithComments, ...action.data]});
    case RECEIVE_POST:
      return Object.assign({}, state, { postsWithComments: [action.data, ...state.postsWithComments]});
    case RECEIVE_COMMENT:
      const foundPost = state.postsWithComments.find(post => post.id === action.data.postId);
      foundPost.comments = [...foundPost.comments, action.data];
      return Object.assign({}, state, { postsWithComments: [...state.postsWithComments]});
    case RECEIVE_POST_NOTIFICATION:
      return Object.assign({}, state, { postsNotifications: ++state.postsNotifications });
    case RECEIVE_COMMENT_NOTIFICATION:
      return Object.assign({}, state, { commentsNotifications: ++state.commentsNotifications});
    case RECEIVE_MESSAGE_NOTIFICATION:
      return Object.assign({}, state, { messagesNotifications: ++state.messagesNotifications });
    case RECEIVE_POSTS_AND_COMMENTS_NOTIFICATIONS_WITH_DATA:
      return Object.assign({}, state, { postsAndCommentsNotificationsData: action.data, commentsNotifications: 0, postsNotifications: 0})
    case RECEIVE_MESSAGES_NOTIFICATIONS_WITH_DATA:
      return Object.assign({}, state, { messagesNotificationsData: action.data, messagesNotifications: 0})
    case RECEIVE_FRIENDSHIPS_NOTIFICATIONS_WITH_DATA:
      return Object.assign({}, state, { friendshipsNotifications: action.data, friendshipsNotifications: 0})
    case  POSTS_AND_COMMENETS_NOTIFICATIONS_INACTIVATED:
      return Object.assign({}, state, { postsAndCommentsNotificationsData: [], commentsNotifications: 0, postsNotifications: 0});
    case MESSAGES_NOTIFICATIONS_INACTIVATED:
      return Object.assign({}, state, { messagesNotificationsData: [], messagesNotifications: 0});
    case FRIENDSHIPS_NOTIFICATIONS_INACTIVATED: 
      return Object.assign({}, state, { friendshipsNotificationsData: [], friendshipsNotifications: 0})
    default:
      return state;
  }
}