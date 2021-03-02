<template>
  <div class="head">
    <van-nav-bar :border="borderShow" fixed z-index="9999" placeholder>
      <template #title>
        <span>下载酷狗</span>
      </template>
      <template #left>
        <router-link to="/">
          <img src="~assets/logo.png" alt="" />
        </router-link>
      </template>
      <template #right>
        <router-link to="/search">
          <van-icon name="search" size="30" color="white" />
        </router-link>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      borderShow: false,
    };
  },
  methods: {
    goback() {},
  },
};
</script>

<style lang="less">
.head {
  .van-nav-bar__placeholder {
    .van-nav-bar {
      height: 3.525rem;
      background: rgb(44, 162, 249);
      .van-nav-bar__left {
        margin-bottom: 0.5375rem;
        height: 60%;
        width: 35%;
        img {
          width: 100%;
          height: 100%;
        }
      }

      .van-nav-bar__title {
        width: 6.25rem;
        line-height: 1.55rem;
        padding: 4px 2px;
        border: 1px solid white;
        border-radius: 7px;
        color: white;
        margin: 0.7375rem auto 0 45%;
      }

      .van-nav-bar__right {
        margin-bottom: 0.4375rem;
      }
    }
  }
}
</style>