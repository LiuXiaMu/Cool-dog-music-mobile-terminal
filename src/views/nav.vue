<template>
  <!-- 头部通栏（导航栏) -->
  <div class="nav">
    <van-sticky :offset-top="60">
      <van-nav-bar
        :border="borderShow"
        v-if="Head.headSeat == 1"
        :style="styleObj"
      >
        <template #left>
          <van-icon
            size="20"
            name="arrow-left"
            @touchstart.prevent="$router.go(-1)"
          ></van-icon>
        </template>
        <template #title>
          <span :style="{ color: borderShow ? '#000' : '#fff' }">{{
            Head.headTitle
          }}</span>
        </template>
      </van-nav-bar>

      <van-tabs v-else v-model="active">
        <van-tab
          v-for="(item, i) in list"
          :key="i"
          :to="item.path"
          :title="item.meta.title"
        >
        </van-tab>
      </van-tabs>
    </van-sticky>
  </div>
</template>

<script>
import routes from "../router/routes";
import { mapState } from "vuex";
export default {
  data() {
    return {
      list: routes,
      styleObj: {},
      borderShow: true,
    };
  },
  watch: {
    $route: {
      handler(to) {
        this.styleObj = {
          background: to.params.songName
            ? "linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0))"
            : "#fff",
          color: to.params.songName ? "#fff" : "#000",
        };
        to.params.songName
          ? (this.borderShow = false)
          : (this.borderShow = true);
        // if (to.params.songName) {
        //   this.$store.commit("changeHead", {
        //     seat: 1,
        //   });
        // }
        if (to.path == "/search") {
          this.$store.commit("changeHead", {
            seat: 1,
            title: "搜索",
          });
        } else {
          this.$store.commit("changeHead", {
            seat: 0,
          });
        }
      },
      deep: true,
    },
  },
  computed: {
    ...mapState(["Head"]),
    active: {
      get() {
        return this.$route.meta.idx;
      },
      set() {},
    },
  },
  mounted() {},
};
</script>

<style lang='less' >
.nav {
  height: 3rem;
  width: 100%;
  div {
    .van-nav-bar {
      color: none;
      height: 3rem;
      line-height: 3rem;
      .van-nav-bar__title {
        font-size: 1.0625rem;
      }
    }
  }
}
</style>