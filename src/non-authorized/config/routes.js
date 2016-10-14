import TestComponent from '../components/TestComponent';
import AnotherTestComponent from '../components/AnotherTestComponent';
import RegisterContainer from '../containers/RegisterContainer';

export const routes = [
  { name: 'test', path: '/login/test', component: TestComponent },
  { name: 'anotherTest', path: '/login/anotherTest', component: AnotherTestComponent },
  { name: 'register', path: '/login/register', component: RegisterContainer },
];
