import HomeContainer from '../containers/HomeContainer';
import MessagesContainer from '../containers/MessagesContainer';

export const routes = [
  { name: 'home', path: '/dashboard/home/:id', component: HomeContainer },
  { name: 'messages', path: '/dashboard/messages', component: MessagesContainer },
];
