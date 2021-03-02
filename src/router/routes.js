const nav = () => import('@/views/nav')
const newMusic = () => import('@/views/newMusic')
const Rank = () => import('@/views/rank.vue')
const Plist = () => import('@/views/plist.vue')
const Singer = () => import('@/views/singer.vue')


const routes = [
    {
        path: "/",
        meta: {
            title: '新歌',
            idx: 0
        },
        components: {
            default: newMusic,

        }
    },
    {
        path: "/rank",
        name: "rank",
        meta: {
            title: '排行',
            idx: 1
        },
        components: {
            default: Rank,

        }
    },
    {
        path: "/plist",
        name: "plist",
        meta: {
            title: '歌单',
            idx: 2
        },
        components: {
            default: Plist,

        }
    },
    {
        path: "/singer",
        name: "singer",
        meta: {
            title: '歌手',
            idx: 3
        },
        components: {
            default: Singer,

        }
    },


]

export default routes