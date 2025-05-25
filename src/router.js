// import { createRouter, createWebHashHistory } from 'vue-router';
import {createRouter, createWebHistory} from 'vue-router';
import HomeMain from './components/HomeMain.vue';
import MyPageMain from './components/MyPageMain.vue';
import LoginMain from './components/LoginMain.vue';
import SignupForm from './components/SignupForm.vue';

const routes = [
    {
        path: '/index.html',
        name: "HomeMain",
        component: HomeMain,
        meta: {
            requireAuth: false,
        }
    },
    {
        path: '/',
        name: "HomeMain",
        component: HomeMain,
        meta: {
            requireAuth: false,
        }
    },
    {
        path: '/my-page',
        name: "MyPageMain",
        component: MyPageMain,
        meta: {
            requireAuth: true,
        }
    },
    {
        path: '/login-form',
        name: "LoginMain",
        component: LoginMain,
        meta: {
            requireAuth: false,
        }
    },
    {
        path: '/signup-form',
        name: "SignupForm",
        component: SignupForm,
        meta: {
            requireAuth: false,
        }
    },
    {
        path: '/user/:userId',
        name: "UserProfile",
        component: () => import('./components/UserProfile.vue'),
        meta: {
            requireAuth: true,
        }
    },
    {
        path: '/my-following',
        name: "MyFollowing",
        component: () => import('./components/MyFollowing.vue'),
        meta: {
            requireAuth: true,
        }
    },
    {
        path: '/my-followers',
        name: "MyFollowers",
        
        component: () => import('./components/MyFollowers.vue'),
        meta: {
            requireAuth: true,
        }
    }
];

// Vue Routerのインスタンスを生成。
// オプション設定やルーティングの設定を行う。
const router = createRouter({
    // history: createWebHashHistory(),
    history: createWebHistory(),
    routes: routes,
});

import { useAuthStore } from './stores/auth';

router.beforeEach(async (to, from, next) => {
    if (!to.meta.requireAuth){
        next();
        return
    }

    const authStore = useAuthStore();

    await authStore.checkAuth();
    
    if (!authStore.isAuthenticated) {
        next({ name: "LoginMain" });
        return
    } 
    
    next();
});

export default router;
