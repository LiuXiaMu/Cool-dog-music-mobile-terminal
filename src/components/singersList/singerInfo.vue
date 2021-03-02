<template>
  <div class="singerInfo">
    <div class="singerInfoHead">
      <van-icon
        name="arrow-left"
        size="35"
        color="#fff"
        @touchstart.prevent="$router.go(-1)"
      />
      <div class="singerInfoHeadText">
        <p>{{ singerInfoList.singerName }}</p>
      </div>
      <img :src="singerInfoList.singerImgurl" alt="" />
    </div>
    <div class="singerSong" ref="playbottom">
      <div class="singerSongT"></div>
      <van-cell
        :boder="false"
        v-for="(item, i) in singerSongs"
        :key="i"
        :title="item.songName"
        :label="item.singerNmae"
        @touchstart.native="playSong(item)"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      singerInfoList: {},
      singerSongs: [],
      songLists: [],
    };
  },

  computed: {
    ...mapState(["hash"]),
  },

  watch: {
    hash: {
      handler(hash) {
        if (hash) {
          this.$refs.playbottom.style.paddingBottom = "4.8rem";
        }
      },
    },
  },

  async created() {
    let { data } = await this.$axios.get(
      "/api" + this.$route.path + "?json=true"
    );
    this.singerInfoList = {
      singerImgurl: data.info.imgurl.replace(/{size}/, "400"),
      singerName: data.info.singername,
    };
    this.singerSongs = data.songs.list.map((item) => {
      return {
        songName: item.filename.split("-")[1],
        singerNmae: item.filename.split("-")[0],
        hash: item.hash,
      };
    });
    this.songlists = data.songs.list;
  },
  methods: {
    playSong(item) {
      this.$store.commit("itemPlaySong", {
        hash: item.hash,
      });
      this.$store.commit("CommitSongList", {
        songlists: this.songlists,
      });
    },
  },
};
</script>

<style lang='less'>
.singerInfo {
  .singerInfoHead {
    width: 100vw;
    height: 380px;
    position: absolute;
    top: -11%;
    .van-icon-arrow-left {
      position: absolute;
      z-index: 8888;
      top: 25%;
      width: 100px;
      height: 50px;
    }
    .singerInfoHeadText {
      background: rgba(0, 0, 0, 0.26);
      position: absolute;
      height: 100%;
      width: 100%;
      p {
        color: #fff;
        font-size: 1.775rem;
        position: absolute;
        bottom: 10%;
        left: 3%;
      }
    }
    img {
      height: 100%;
      width: 100%;
    }
  }

  .singerSong {
    position: absolute;
    width: 100vw;
    top: 40%;
    z-index: 9999;
    .singerSongT {
      height: 0.725rem;
      background: #fff;
      margin-top: -0.25rem;
      border-radius: 0.625rem 0.625rem 0 0;
    }
    .van-cell__title:hover {
      color: #2094ff;
    }
  }
}
</style>