import configureStore from './dashboard/store/configureStore';
import App from './dashboard/containers/App';
import { routes } from './dashboard/config/routes';
import init from './utils/initLoader';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

init({
  configureStore,
  App,
  routes,
  mainPath: '/',
  container: 'dashboard',
});