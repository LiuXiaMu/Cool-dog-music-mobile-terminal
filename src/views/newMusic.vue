<template>
  <!-- 新歌组件 -->
  <div class="newMusic">
    <div class="swipe">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index) in banner" :key="index">
          <img :src="item.imgurl" width="100%" height="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <song-list class="songList" :songlist="songList"></song-list>
  </div>
</template>

<script>
import SongList from "../components/songList/songList";
export default {
  data() {
    return {
      banner: [],
      songList: [],
    };
  },
  components: {
    SongList,
  },

  async created() {
    let { data } = await this.$axios.get("/api?json=true");
    this.banner = data.banner;
    this.songList = data.data;
  },
};
</script>

<style lang="less">
.newMusic {
  position: relative;
  .swipe {
    .van-swipe {
      height: 10.425rem;
      .van-swipe__track {
        height: 100%;
      }
    }
  }

  .songList {
    position: absolute;
    top: -30%;
  }
}
</style>