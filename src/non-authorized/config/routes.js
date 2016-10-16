import TestComponent from '../components/TestComponent';
import AnotherTestComponent from '../components/AnotherTestComponent';
import RegisterContainer from '../containers/RegisterContainer';
import LoginFailureComponent from '../components/LoginFailure';

export const routes = [
  { name: 'test', path: '/login/test', component: TestComponent },
  { name: 'anotherTest', path: '/login/anotherTest', component: AnotherTestComponent },
  { name: 'register', path: '/login/register', component: RegisterContainer },
  { name: 'loginFaulure', path: '/login/loginFailure', component: LoginFailureComponent }
];
