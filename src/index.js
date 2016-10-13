import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import useRouterHistory from 'react-router/lib/useRouterHistory';
import createHashHistory from 'history/lib/createHashHistory';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './store/configureStore';

import App from './containers/App';
import TestComponent from './components/TestComponent';
import { routes } from './config/routes';

let initialized = false;

const init = (cfg) => {
  if (initialized) {
    return console.log('Already initialized');
  }
  
  initialized = true;
  
  const store = configureStore();
  
  const hashHistory = useRouterHistory(createHashHistory)({ queryKey: false });
  const history = syncHistoryWithStore(hashHistory, store);
  
  const render = () => {
    const wrapperNode = document.createElement('div');
    wrapperNode.id = 'social-root';
    document.body.insertBefore(wrapperNode, document.body.firstChild);
    
    const routesList = routes
      .map(({ path, component }) => <Route key={path} path={path} component={component} />);
  
    ReactDOM.render(
      (
        <Provider store={store}>
          <Router history={history}>
            <Route path="/" component={App}>
              {routesList}
            </Route>
          </Router>
        </Provider>
      ),
      document.getElementById('social-root')
    );
  }
  
  render();
};

init();