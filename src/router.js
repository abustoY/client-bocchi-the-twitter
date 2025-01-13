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
            requireAuth: true,
        }
    },
    {
        path: '/',
        name: "HomeMain",
        component: HomeMain,
        meta: {
            requireAuth: true,
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
    }
];

// Vue Routerのインスタンスを生成。
// オプション設定やルーティングの設定を行う。
const router = createRouter({
    // history: createWebHashHistory(),
    history: createWebHistory(),
    routes: routes,
});

import {getAuthenticationStatus} from "@/authentication";
import { useUserStore } from './stores/user';

router.beforeEach(async (to, from, next) => {
    if (to.meta.requireAuth && !await getAuthenticationStatus()) {
        console.log("trueだった")
        next({
            name: "LoginMain"
        })
    } else {
        console.log("falseだった")
        if(await getAuthenticationStatus()) {
            await useUserStore().getUserId();
        }
        next();
    }

})

export default router;
