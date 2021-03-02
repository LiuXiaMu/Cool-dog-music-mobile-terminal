<template>
  <!-- 排行组件 -->
  <div class="rank">
    <cell-com :CellSongList="RankSongList"></cell-com>
  </div>
</template>

<script>
import CellCom from "components/cellCom/cellCom";
export default {
  data() {
    return {
      RankSongList: [],
    };
  },
  async created() {
    let { data } = await this.$axios.get("/api/rank/list?json=true");
    this.RankSongList = data.rank.list.map((item) => {
      return {
        rankname: item.rankname,
        rankid: item.rankid,
        imgurl: item.imgurl,
      };
    });
  },
  components: {
    CellCom,
  },
};
</script>

<style>
</style>