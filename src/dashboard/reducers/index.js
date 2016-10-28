import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import dashboard from './dashboard';
import chat from './chat';

const rootReducer = combineReducers({
  dashboard,
  chat,
  routing: routerReducer,
});

export default rootReducer;
