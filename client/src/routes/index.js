import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/store'
import LandingPage from '../components/LandingPage.vue' 
import Login from '../views/LoginPage.vue'
import ProductsPage from '../views/ProductsPage.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: LandingPage,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/ProfileView.vue'),
    },
    {
        path: '/products',
        name: 'products',
        component: ProductsPage,
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
  });

router.beforeEach((to, from, next) => {
const publicPages = ['/login', '/register', '/'];
const authRequired = !publicPages.includes(to.path);
const isAuth = store.state.isLoggedIn;

if (authRequired && !isAuth) {
    return next('/login');
}

if ((to.path === '/login' || to.path === '/register') && isAuth) {
    return next('/');
}

next();
  });
export default router;