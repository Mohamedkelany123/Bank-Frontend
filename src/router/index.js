import {createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/views/LoginPage';
import BankPersonnelPage from '../views/BankPersonnelPage.vue';
import LoanProviderPage from '../views/LoanProvider.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage, 
  },
  {
    path: '/bankPersonnel',
    name: 'BankPersonnelPage',
    component: BankPersonnelPage,
  },
  {
    path: '/loanProvider',
    name: 'LoanProviderPage',
    component: LoanProviderPage,
  },
  // Other routes if needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
