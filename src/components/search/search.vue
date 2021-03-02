<template>
  <!-- 搜索组件 -->
  <div class="search">
    <van-search
      show-action
      v-model="value"
      background="#f8f8f8"
      @search="onSearch"
      placeholder="歌手/歌名"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>

    <div v-if="songShow" class="songList">
      <div class="search-result">共有{{ total }}条结果</div>
      <song-list class="songList" :songlist="songList"></song-list>
    </div>

    <div class="Hot" v-else>
      <p class="hotTitie">最近热门</p>
      <hr />
      <div class="hotItem">
        <p
          v-for="(item, index) in hot"
          :key="index"
          @click="onHot(item.keyword)"
        >
          {{ item.keyword }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import SongList from "../songList/songList";
export default {
  data() {
    return {
      hot: [], //最近热门
      songList: [], //歌曲列表
      value: "", //搜索框输入的内容
      songShow: false, //判断是否隐藏
      total: 0, //共有多少条结果
    };
  },

  components: {
    SongList,
  },

  async created() {
    // let data = await this.$axios.get("/wenzi/api/v3/search/hot");
    let { data } = await this.$jsonp(
      "http://mobilecdn.kugou.com/api/v3/search/hot?format=jsonp&plat=0&count=30"
    );
    this.hot = data.info;
  },

  methods: {
    onSearch: async function () {
      if (!this.value) {
        return;
      }
      let { data } = await this.$jsonp(
        "http://mobilecdn.kugou.com/api/v3/search/song?format=jsonp&keyword=" +
          this.value +
          "&page=1&pagesize=30&showtype=1"
      );
      console.log(data);
      this.songList = data.info.map((item) => {
        return {
          filename: item.filename,
          hash: item.hash,
        };
      });
      this.total = data.total;
      this.songShow = true;
    },

    onHot(item) {
      this.value = item;
      this.onSearch();
    },
  },
};
</script>

<style lang="less" scoped>
.search {
  .van-search {
    .van-search__action {
      padding: 0 10px;
      margin-right: 10px;
      border-radius: 10px;
      background: #2ca2f9;
      color: #fff;
    }
  }

  .songList {
    .search-result {
      color: #5d5d5d;
      background: #e6e6e6;
      padding-left: 1.2375rem;
      line-height: 170%;
    }
  }

  .Hot {
    .hotTitie {
      padding: 0.225rem 0.875rem;
      color: #2ca3f5;
    }
    .hotItem {
      padding: 0.625rem 0.875rem;

      p {
        &:nth-child(1) {
          padding-top: 0;
        }
        font-size: 1.3rem;
        margin: 0;
        padding: 1.2rem 0;
        border-bottom: 1px solid #e6e4e4;
      }
    }
  }
}
</style>