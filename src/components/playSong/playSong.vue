<template>
  <div class="playSong" v-show="hash">
    <audio :src="url" ref="myAudio"></audio>
    <img :src="imgUrl" alt="" />

    <div class="left_song">
      <p>{{ songName }}</p>
      <p>{{ singerName }}</p>
    </div>

    <i
      @click="playOrPause"
      :class="{ 'bi bi-play-fill': !isPlay, 'bi bi-pause-fill': isPlay }"
    ></i>
    <i @click="nextPlay" class="bi bi-skip-end-fill"></i>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      isPlay: false,
      imgUrl: "",
      url: "",
      singerName: "",
      songName: "",
    };
  },
  watch: {
    hash: {
      handler: async function (hash) {
        let { data } = await this.$axios.get("/api/api/v1/song/get_song_info", {
          params: {
            cmd: "playInfo",
            hash,
          },
        });
        if (data.errcode != 2) {
          console.log(data);
          //有歌曲回来
          this.url = data.url;
          this.imgUrl = data.imgUrl.replace(/{size}/, "400");
          this.singerName = data.fileName.split("-")[0];
          this.songName = data.fileName.split("-")[1];
          var that = this;
          this.$refs.myAudio.addEventListener("loadeddata", function () {
            this.play();
            that.isPlay = true;
            let asa = that.$refs.myAudio.duration; //总时长

            let aba = that.$refs.myAudio.currentTime; //当前播放的位置
          });
        }
        //未排序的歌词
        let response = await this.$axios.get(
          "/geci/app/i/krc.php?cmd=100&keyword=" +
            data.fileName +
            "&hash=" +
            this.hash +
            "&timelength=228055"
        );

        this.geciText = ""; //排序后的歌词
        let arr = response.data
          .split("[")
          .filter((item) => item.charAt(0) == "0");
        arr.forEach((item) => {
          let smallArr = item.split("]");

          this.geciText +=
            "<p id=" + smallArr[0].split(".")[0] + ">" + smallArr[1] + "</p>";
        });
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState(["hash", "songlists"]),
  },

  methods: {
    playOrPause() {
      this.isPlay = !this.isPlay;
      if (this.isPlay) {
        this.$refs.myAudio.play();
      } else {
        this.$refs.myAudio.pause();
      }
    },
    nextPlay() {
      console.log(this.songlists);
      let idx = this.songlists.findIndex((item) => item.hash == this.hash);
      if (this.songlists[idx + 1]) {
        this.$store.commit("itemPlaySong", {
          hash: this.songlists[idx + 1].hash,
        });
      }
    },
  },
};
</script>

<style lang="less">
@import url("../../../node_modules/bootstrap-icons/font/bootstrap-icons.css");
.playSong {
  width: 100%;
  height: 4.8rem;
  background-color: #000;
  position: fixed;
  left: 0;
  bottom: 0;
  color: white;
  z-index: 9999;
  & > * {
    float: left;
  }
  & > img {
    margin: 0.25rem;
    width: 3.9875rem;
    height: 4.275rem;
    border-radius: 0.425rem;
  }
  & > div.left_song {
    margin-left: 1rem;
    width: 50%;
    p {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin: 1.05rem 0 0 0;
      &:nth-child(2) {
        margin-top: 0.25rem;
        color: #888888;
      }
    }
  }
  i {
    font-size: 2.025rem;
    margin: 0.6rem 0.2rem;
  }
}
</style>