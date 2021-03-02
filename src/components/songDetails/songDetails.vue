<template>
  <div class="songDetails">
    <div class="songHead">
      <img :src="songDetailsList.imgUrl" alt="" />
      <div class="songBgd" v-if="$route.params.songPath == 'rank'">
        <span>上次更新时间：{{ update }}</span>
      </div>
    </div>

    <song-list :songlist="songDetailsList.lists"></song-list>

    <!-- <div class="songCont">
      <van-cell
        :title="item.filename"
        v-for="(item, i) in songDetailsList.lists"
        :key="i"
      >
        <template #icon v-if="$route.params.songPath == 'rank'">
          <i :class="{ cls: true, cls1: i == 0, cls2: i == 1, cls3: i == 2 }">{{
            i + 1
          }}</i>
        </template>
        <template #right-icon>
          <van-icon name="down" />
        </template>
      </van-cell>
    </div> -->
  </div>
</template>

<script>
import SongList from "../songList/songList.vue";

export default {
  data() {
    return {
      songDetailsList: {},
    };
  },
  components: {
    SongList,
  },

  filters: {
    imgRename(val) {
      return val.replace(/{size}/, "400");
    },
  },

  computed: {
    update() {
      if (this.songDetailsList.updateTime) {
        return this.songDetailsList.updateTime.substr(0, 10);
      } else {
        return "";
      }
    },
  },

  async created() {
    let path = window.location.hash.substr(15);
    let path2 = this.$route.params.songPath;
    let { data } = await this.$axios.get("/api/" + path + "?json=true");
    if (path2 == "rank") {
      this.songDetailsList = {
        imgUrl: data.info.imgurl.replace(/{size}/, "400"),
        updateTime: data.songs.list[0].addtime,
        lists: data.songs.list,
      };
    } else if (path2 == "plist") {
      this.songDetailsList = {
        imgUrl: data.info.list.imgurl.replace(/{size}/, "400"),
        lists: data.list.list.info,
      };
    }

    this.$store.commit("changeHead", {
      seat: 1,
      title: data.info.rankname || data.info.list.specialname,
    });
  },
};
</script>


<style lang="less">
.songDetails {
  position: relative;
  margin-top: -3.4375rem;
  height: 100vh;
  .songHead {
    position: absolute;
    top: 0;
    width: 100%;
    height: 14.0625rem;
    .songBgd {
      height: 2.875rem;
      width: 100%;
      position: absolute;
      bottom: 0;
      z-index: 99;
      background: -webkit-linear-gradient(
        top,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.6)
      );
      span {
        font-size: 0.95rem;
        color: white;
        display: block;
        margin-left: 0.8375rem;
        margin-top: 0.625rem;
      }
    }
    img {
      height: 100%;
      width: 100%;
    }
  }
}
</style>