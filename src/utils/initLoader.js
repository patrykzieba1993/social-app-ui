import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import useRouterHistory from 'react-router/lib/useRouterHistory';
// import createHashHistory from 'history/lib/createHashHistory';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

let initialized = false;

const init = (config) => {
  if (initialized) {
    return console.log('Already initialized');
  }

  initialized = true;

  const store = config.configureStore();

  // const hashHistory = useRouterHistory(createHashHistory)({ queryKey: false });
  // const history = syncHistoryWithStore(hashHistory, store);

  const history = syncHistoryWithStore(browserHistory, store);

  const render = () => {
    const wrapperNode = document.createElement('div');
    wrapperNode.id = config.container;
    document.body.insertBefore(wrapperNode, document.body.firstChild);

    const routesList = config.routes
      .map(({ path, component }) => <Route key={path} path={path} component={component} />);

    ReactDOM.render(
      (
        <Provider store={store}>
          <Router history={history}>
            <Route path={config.mainPath} component={config.App}>
              {routesList}
            </Route>
          </Router>
        </Provider>
      ),
      document.getElementById(config.container)
    );
  }

  render();
};

export default init;