import Vue from 'vue'
import VueRouter from 'vue-router'


import NavRoutes from './routes'
const Search = () => import('components/search/search.vue')
const nav = () => import('@/views/nav')
const SongDetails = () => import('components/songDetails/songDetails.vue')
const SingersList = () => import('components/singersList/singersList.vue')
const SingerInfo = () => import('components/singersList/singerInfo.vue')

Vue.use(VueRouter)

const routes = [
  ...NavRoutes,
  {
    path: "/search",
    name: 'search',
    meta: {
      title: '搜索'
    },
    components: {
      default: Search,

    }
  },
  {
    path: "/song/details/:songPath/:songName/:songId",
    name: 'songDetails',
    components: {
      default: SongDetails,

    }
  },
  {
    path: "/singer/list/:singerId",
    name: "singersList",
    components: {
      default: SingersList,

    }
  },
  {
    path: "/singer/info/:singerId",
    name: "singerInfo",
    components: {
      default: SingerInfo

    }
  }
]
const router = new VueRouter({
  routes,
  scrollBehavior: (to, from, savePosition) => {
    // to: 当前的路由信息对象 跳转过来之后的路由信息对象
    // from: 跳转之前的 原路由信息对象
    // savePosition 保存你的滚动位置  只有在使用历史记录的时候才可以生效  {x: 0, y: 0}
    // console.log(to, from, savePosition); // null  {x: 0, y: 226}

    if (savePosition) {
      return savePosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }


  },
})

export default router
