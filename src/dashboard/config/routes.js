import TestComponent from '../components/TestComponent';
import AnotherTestComponent from '../components/AnotherTestComponent';
import HomeContainer from '../containers/HomeContainer';

export const routes = [
  { name: 'test', path: '/dashboard/test', component: TestComponent },
  { name: 'anotherTest', path: '/dashboard/anotherTest', component: AnotherTestComponent },
  { name: 'home', path: '/dashboard/home/:id', component: HomeContainer },
];
