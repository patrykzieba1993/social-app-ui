import HomeContainer from '../containers/HomeContainer';
import ChatContainer from '../containers/ChatContainer';
import PageContainer from '../containers/PageContainer';

export const routes = [
  { name: 'home', path: '/dashboard/home/:id', component: HomeContainer },
  { name: 'chat', path: '/dashboard/chat/:id', component: ChatContainer },
  { name: 'page', path: '/dashboard/page/:id', component: PageContainer },
];
