import {
  RECEIVE_POSTS_WITH_COMMENTS,
  RECEIVE_POST,
} from '../actions/dashboard';

const defaultState = {
  postsWithComments: [],
};

export default function filters(state = defaultState, action) {
  switch (action.type) {
    case RECEIVE_POSTS_WITH_COMMENTS:
      return Object.assign({}, state, { postsWithComments: [...state.postsWithComments, ...action.data]});
    case RECEIVE_POST:
      return Object.assign({}, state, { postsWithComments: [action.data, ...state.postsWithComments]});
    default:
      return state;
  }
}