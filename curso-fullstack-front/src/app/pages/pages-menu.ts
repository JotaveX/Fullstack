import { NbMenuItem } from '@nebular/theme';
import { TaskFilter, TaskFilterEnum } from 'app/models/task';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/default',
    home: true,
  },
  {
    title: 'CADASTROS',
    group: true,
  },
  {
    title: 'Vaca',
    icon: 'heart',
    link: '/pages/vaca',
  },

];
