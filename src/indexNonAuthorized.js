import configureStore from './non-authorized/store/configureStore';
import App from './non-authorized/containers/App';
import { routes } from './non-authorized/config/routes';

import init from './utils/initLoader';

init({
  configureStore,
  App,
  routes,
  mainPath: '/login',
  container: 'non-authorized--root',
});