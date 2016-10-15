import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import ui from './ui';
import authorization from './authorization';

const rootReducer = combineReducers({
  authorization,
  ui,
  routing: routerReducer,
});

export default rootReducer;
