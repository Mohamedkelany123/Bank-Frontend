import {createRouter, createWebHistory } from 'vue-router';
import LoginPage from '@/views/LoginPage';
import BankPersonnelPage from '../views/BankPersonnelPage.vue';
import LoanProviderPage from '../views/LoanProvider.vue';
import LoanCustomerPage from '../views/LoanCustomer.vue';
import registerPage from '../views/registerPage.vue';
import store from '@/store';


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
    meta: { requiresAuth: true },
  },
  {
    path: '/loanProvider',
    name: 'LoanProviderPage',
    component: LoanProviderPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/loanCustomer/:username',
    name: 'loanCustomer',
    component: LoanCustomerPage,
    meta: { requiresAuth: true },
  },
  {
    path: '/register',
    name: 'register',
    component: registerPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const checkAuthentication = () => {
  // Use the Vuex store to check if the user is authenticated
  return store.getters.isAuthenticated;
};

router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.meta.requiresAuth) {
    // Check if the user is authenticated using the checkAuthentication function
    const isAuthenticated = checkAuthentication();

    if (!isAuthenticated) {
      // Redirect to the login page or handle unauthenticated access
      next('/login');
    } else {
      // User is authenticated, proceed to the requested route
      next();
    }
  } else {
    // If the route doesn't require authentication, proceed to the requested route
    next();
  }
});

export default router;

