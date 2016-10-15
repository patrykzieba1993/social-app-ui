import {
  REGISTER_FAILURE,
  REGISTER_SUCCESSFUL,
  REGISTER_RESET,
} from '../actions/authorization';

const defaultState = {
  registerState: undefined,
};

export default function filters(state = defaultState, action) {
  switch (action.type) {
    case REGISTER_SUCCESSFUL:
      return Object.assign({}, state, { registerState: true });
    case REGISTER_RESET: 
      return Object.assign({}, state, { registerState: undefined });
    default:
      return state;
  }
}