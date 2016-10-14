import configureStore from './stack/store/configureStore';
import App from './stack/containers/App';
import { routes } from './stack/config/routes';

import init from './utils/initLoader';

init({
  configureStore,
  App,
  routes,
  mainPath: '/',
  container: 'social-root',
});