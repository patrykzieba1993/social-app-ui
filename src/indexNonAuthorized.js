import configureStore from './non-authorized/store/configureStore';
import App from './non-authorized/containers/App';
import { routes } from './non-authorized/config/routes';
import injectTapEventPlugin from 'react-tap-event-plugin';
import init from './utils/initLoader';

injectTapEventPlugin();

init({
  configureStore,
  App,
  routes,
  mainPath: '/login',
  container: 'non-authorized',
});