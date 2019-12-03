import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/home/index'
import shipInformation from '@/components/ship-information/ship-information'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: index,
      children: [
        {
          path: '/shipInformation',
          name: 'shipInformation',
          component: shipInformation,

        }
      ]
    },
  ]
})
