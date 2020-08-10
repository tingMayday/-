import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Index from '@/pages/index'
import Home from '@/pages/Home/Home'
import StaffList from '@/pages/Staff/List'
import StaffRole from '@/pages/Staff/Role'
import ArticleList from '@/pages/Article/List'
import ArticleCategory from '@/pages/Article/Category'
import Comment from '@/pages/Comments/Comment'
import Links from '@/pages/Links/Links'
import Donate from '@/pages/Donate/Donate'

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'index',
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      meta: { title: '首页' },
      redirect: '/home', 
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home,
          meta: { title: '工作台' }
        },
        {
          path: '/staff_list',
          name: 'staff_list',
          component: StaffList,
          meta: { title: '会员列表' }
        },
        {
          path: '/staff_role',
          name: 'staff_role',
          component: StaffRole,
          meta: { title: '角色管理' }
        },
        {
          path: '/article_list',
          name: 'article_list',
          component: ArticleList,
          meta: { title: '文章列表' }
        },
        {
          path: '/article_category',
          name: 'article_category',
          component: ArticleCategory,
          meta: { title: '文章分类' }
        },
        {
          path: '/comment',
          name: 'comment',
          component: Comment,
          meta: { title: '评论管理' }
        },
        {
          path: '/links',
          name: 'links',
          component: Links,
          meta: { title: '友情链接' }
        },
        {
          path: '/donate',
          name: 'donate',
          component: Donate,
          meta: { title: '支持作者' }
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
  ]
})

// 解决路由重复点击报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}