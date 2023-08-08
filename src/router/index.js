import {createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/views/LoginPage';
import BankPersonnelPage from '../views/BankPersonnelPage.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginPage, // Use the LoginPage component for the /login route
  },
  {
    path: '/bankPersonnel',
    name: 'BankPersonnelPage',
    component: BankPersonnelPage,
  },
  // Other routes if needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
