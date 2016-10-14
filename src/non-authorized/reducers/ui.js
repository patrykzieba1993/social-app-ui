import {
  SHOW_REGISTER_DIALOG
} from '../actions/ui';

const defaultState = {
  registerDialogVisible: false,
};

export default function filters(state = defaultState, action) {
  switch (action.type) {
    case SHOW_REGISTER_DIALOG:
      return Object.assign({}, state, { registerDialogVisible: true });
    default:
      return state;
  }
}