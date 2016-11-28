import {
  SET_LOGGED_USER_DATA,
  RECEIVE_POSTS_WITH_COMMENTS,
  RECEIVE_POST,
  RECEIVE_COMMENT,
  RECEIVE_PROFILE_COMMENT,
  RECEIVE_POST_NOTIFICATION,
  RECEIVE_COMMENT_NOTIFICATION,
  RECEIVE_MESSAGE_NOTIFICATION,
  RECEIVE_INVITATION_NOTIFICATION,
  RECEIVE_POSTS_AND_COMMENTS_NOTIFICATIONS_WITH_DATA,
  RECEIVE_MESSAGES_NOTIFICATIONS_WITH_DATA,
  RECEIVE_FRIENDSHIPS_NOTIFICATIONS_WITH_DATA,
  POSTS_AND_COMMENETS_NOTIFICATIONS_INACTIVATED,
  MESSAGES_NOTIFICATIONS_INACTIVATED,
  FRIENDSHIPS_NOTIFICATIONS_INACTIVATED,
  RECEIVE_SEARCH_RESULT,
  RECEIVE_USER_PAGE_DATA,
  UPDATE_POSTS_WITH_COMMENTS,
  RESET_USER_PAGE_DATA,
  REDUCE_FRIENDSHIPS_NOTIFICATIONS,
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
  searchResult: [],
  loggedUserData: {},
  userPageData: { id: -1, userData: [{ firstName: null, lastName: null, login: null,}], postsWithComments: [], friends: [] },
};

export default function filters(state = defaultState, action) {
  switch (action.type) {
    case SET_LOGGED_USER_DATA: 
      return Object.assign({}, state, { loggedUserData: action.data });
    case RECEIVE_POSTS_WITH_COMMENTS:
      return Object.assign({}, state, { postsWithComments: [...state.postsWithComments, ...action.data]});
    case RECEIVE_POST:
      console.log(action.data);
      return Object.assign({}, state, { postsWithComments: [{
        author: action.data.author,
        comments: action.data.comments,
        content: action.data.content,
        id: action.data.id,
        login: action.data.userData[0].login,
        firstName: action.data.userData[0].firstName,
        lastName: action.data.userData[0].lastName,
      }, ...state.postsWithComments]});
    case RECEIVE_COMMENT:
      const foundPost = state.postsWithComments.find(post => post.id === action.data.postId);
      foundPost.comments = [...foundPost.comments, action.data];
      return Object.assign({}, state, { postsWithComments: [...state.postsWithComments] });
    case RECEIVE_PROFILE_COMMENT:
      const foundProfilePost = state.userPageData.postsWithComments.find(post => post.id === action.data.postId);
      foundProfilePost.comments = [...foundProfilePost.comments, action.data];
      return Object.assign({}, state, { userPageData: {  // Object assign not working
        id: state.userPageData.id,
        userData: state.userPageData.userData,
        postsWithComments: [...state.userPageData.postsWithComments],
        friends: [...state.userPageData.friends],
      }});
    case RECEIVE_POST_NOTIFICATION:
      return Object.assign({}, state, { postsNotifications: ++state.postsNotifications });
    case RECEIVE_COMMENT_NOTIFICATION:
      return Object.assign({}, state, { commentsNotifications: ++state.commentsNotifications});
    case RECEIVE_MESSAGE_NOTIFICATION:
      return Object.assign({}, state, { messagesNotifications: ++state.messagesNotifications });
    case RECEIVE_INVITATION_NOTIFICATION:
      return Object.assign({}, state, { friendshipsNotifications: ++state.friendshipsNotifications});
    case RECEIVE_POSTS_AND_COMMENTS_NOTIFICATIONS_WITH_DATA:
      return Object.assign({}, state, { postsAndCommentsNotificationsData: action.data, commentsNotifications: 0, postsNotifications: 0})
    case RECEIVE_MESSAGES_NOTIFICATIONS_WITH_DATA:
      return Object.assign({}, state, { messagesNotificationsData: action.data, messagesNotifications: 0})
    case RECEIVE_FRIENDSHIPS_NOTIFICATIONS_WITH_DATA:
      return Object.assign({}, state, { friendshipsNotificationsData: action.data, friendshipsNotifications: 0})
    case  POSTS_AND_COMMENETS_NOTIFICATIONS_INACTIVATED:
      return Object.assign({}, state, { postsAndCommentsNotificationsData: [], commentsNotifications: 0, postsNotifications: 0});
    case MESSAGES_NOTIFICATIONS_INACTIVATED:
      return Object.assign({}, state, { messagesNotificationsData: [], messagesNotifications: 0});
    case FRIENDSHIPS_NOTIFICATIONS_INACTIVATED: 
      return Object.assign({}, state, { friendshipsNotificationsData: [], friendshipsNotifications: 0});
    case RECEIVE_SEARCH_RESULT:
      return Object.assign({}, state, { searchResult: [...action.data]});
    case RECEIVE_USER_PAGE_DATA:
      return Object.assign({}, state, { userPageData: Object.assign({}, {id: action.data.userData[0].id }, action.data)});
    case UPDATE_POSTS_WITH_COMMENTS:
      return Object.assign({}, state, { postsWithComments: action.data });
    case RESET_USER_PAGE_DATA:
      return Object.assign({}, state, { userPageData: Object.assign({}, defaultState.userPageData )});
    case REDUCE_FRIENDSHIPS_NOTIFICATIONS:
      state.friendshipsNotificationsData.splice(state.friendshipsNotificationsData.find(n => n.id === action.data.id), 1);
      return Object.assign({}, state, { friendshipsNotificationsData: [...state.friendshipsNotificationsData]});
    default:
      return state;
  }
}