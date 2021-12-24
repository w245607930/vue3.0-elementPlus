/**
 * Created by admin on 2021/12/9.
 */
const constRouterMap = [
    {
        path: '',
        redirect: 'home',
    },
    {
        name: 'home',
        path: '/home',
        component: () => import('@/views/homePage.vue'),
        meta: {
            keepAlive: true,
        }
    }
]

export default constRouterMap