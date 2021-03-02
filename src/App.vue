<template>
  <div id="app">
    <Head v-if="$route.name != 'singerInfo'"></Head>
    <Nav v-if="$route.name != 'singerInfo'"></Nav>
    <router-view></router-view>
    <play-song ref="playbottom"></play-song>
  </div>
</template>

<script>
import Head from "components/head/head.vue";
import Nav from "views/nav.vue";
import playSong from "components/playSong/playSong.vue";

export default {
  components: {
    Nav,
    Head,
    playSong,
  },
};
</script>

<style lang="less">
* {
  font-size: 1.0625rem;
}
</style>