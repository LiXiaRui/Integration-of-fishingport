import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/home/index'
import shipInformation from '@/components/ship-information/ship-information'



Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


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
