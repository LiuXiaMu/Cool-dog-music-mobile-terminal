<template>
  <div class="songCont" ref="playbottom">
    <van-cell
      :title="item.filename"
      v-for="(item, i) in songlist"
      :key="i"
      @click="playSong(item)"
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
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["songlist"],
  data() {
    return {};
  },
  computed: {
    ...mapState(["hash"]),
    SongList() {
      return this.songlist;
    },
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
  methods: {
    playSong(item) {
      this.$store.commit("itemPlaySong", {
        hash: item.hash,
      });
      this.$store.commit("CommitSongList", {
        songlists: this.SongList,
      });
    },
  },
};
</script>

<style lang="less">
.songCont {
  position: absolute;
  top: 0;
  margin-top: 14.0625rem;
  width: 100vw;

  .van-cell {
    display: flex;
    justify-items: center;
    align-items: center;
    line-height: 2.0875rem;
    .cls {
      height: 1.0714rem;
      line-height: 1.0714rem;
      padding: 0 0.7rem 0 0.4rem;
      font-size: 0.9375rem;
      border-radius: 1.875rem;
      color: #000;
      margin-right: 0.9375rem;
    }
    .cls1,
    .cls2,
    .cls3 {
      color: #fff;
    }
    .cls1 {
      background: #e80000;
    }
    .cls2 {
      background: #ff7200;
    }
    .cls3 {
      background: #f8b300;
    }
    .van-cell__title {
      margin-right: 0.625rem;
    }
    .van-icon-down {
      line-height: 2.125rem;
    }
  }
}
</style>