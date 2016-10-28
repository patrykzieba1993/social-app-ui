import HomeContainer from '../containers/HomeContainer';
import ChatContainer from '../containers/ChatContainer';

export const routes = [
  { name: 'home', path: '/dashboard/home/:id', component: HomeContainer },
  { name: 'chat', path: '/dashboard/chat/:id', component: ChatContainer },
];
