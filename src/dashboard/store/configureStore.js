import { compose, createStore, applyMiddleware } from 'redux';
import browserHistory from 'react-router/lib/browserHistory';
import { routerMiddleware } from 'react-router-redux';

import thunk from 'redux-thunk';

import reducer from '../reducers/index';

const reduxRouterMiddleware = routerMiddleware(browserHistory);

export default function configureStore() {
  const finalCreateStore = compose(
    applyMiddleware(
      reduxRouterMiddleware,
      thunk,
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore);

  const store = finalCreateStore(reducer);
  if (__DEV__ && module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
