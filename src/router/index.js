import Vue from 'vue'
import Router from 'vue-router'

import HomePage from '_views/HomePage.vue'
import GameDetails from '_views/GameDetails.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '/',
            component: HomePage
        },
        {
            path: '/details',
            component: GameDetails
        }
    ]
})
