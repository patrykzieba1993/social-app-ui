import RegisterContainer from '../containers/RegisterContainer';
import LoginFailureComponent from '../components/LoginFailure';

export const routes = [
  { name: 'register', path: '/login/register', component: RegisterContainer },
  { name: 'loginFaulure', path: '/login/loginFailure', component: LoginFailureComponent },
];
