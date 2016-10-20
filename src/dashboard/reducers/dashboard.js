import {RECEIVE_POST} from '../actions/dashboard';

const defaultState = {
  posts: [],
};

export default function filters(state = defaultState, action) {
  switch (action.type) {
    case RECEIVE_POST:
      return Object.assign({}, state, { posts: [...state.posts, action.data]});
    default:
      return state;
  }
}