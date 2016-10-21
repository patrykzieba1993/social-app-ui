import { RECEIVE_POSTS_WITH_COMMENTS } from '../actions/dashboard';

const defaultState = {
  postsWithComments: [],
};

export default function filters(state = defaultState, action) {
  switch (action.type) {
    case RECEIVE_POSTS_WITH_COMMENTS:
      return Object.assign({}, state, { postsWithComments: [...state.postsWithComments, ...action.data]});
    default:
      return state;
  }
}