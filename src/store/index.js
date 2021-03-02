import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Head: {
      headSeat: 0,
      headTitle: "搜索"
    },
    songlists: [],
    hash: "",
  },
  mutations: {
    changeHead(state, { seat, title }) {
      state.Head.headSeat = seat
      state.Head.headTitle = title
    },
    itemPlaySong(state, { hash }) {
      state.hash = hash
    },
    CommitSongList(state, { songlists }) {
      state.songlists = songlists
    }
  },
  actions: {
  },
  modules: {
  }
})
