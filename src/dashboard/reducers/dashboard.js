import {
  RECEIVE_POSTS_WITH_COMMENTS,
  RECEIVE_POST,
  RECEIVE_COMMENT,
  RECEIVE_POST_NOTIFICATION,
  RECEIVE_COMMENT_NOTIFICATION,
  RECEIVE_MESSAGE_NOTIFICATION,
} from '../actions/dashboard';

const defaultState = {
  postsWithComments: [],
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
      return Object.assign({}, state, { messagesNotifications: ++state.messagesNotifications })
    default:
      return state;
  }
}