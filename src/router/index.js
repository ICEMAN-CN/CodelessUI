import Vue from 'vue'
import VueRouter from 'vue-router'
import Full from '../components/full.vue'
import utils from '../assets/js/utils'


const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter);


const routes = [
    {
        path: '/',
        name: 'Full',
        component: Full,
        redirect: {
            name: 'homepage',
        },
        children: [
            {
                path: 'homepage',
                name: 'homepage',
                mete: {
                    title: '首页',
                },
                component: () => import('../views/HomePage/index.vue')
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '系统登录'
        },
        component: () => import('../views/LoginPage')
    },
   
]

const router = new VueRouter({
    routes
});

// router.beforeEach((to, from, next) => {
//     if (to.name == "login") {
//         utils.storage.remove("Authorization");
//         next();
//     } else {
//         let GetAuthorization = utils.storage.get("Authorization");
//         if (GetAuthorization) {
//             next();
//         } else {
//             utils.storage.remove("Authorization");
//             next('/login');
//         }
//     }
// })

router.afterEach(route => {
    window.scrollTo(0, 0);
})

export default router