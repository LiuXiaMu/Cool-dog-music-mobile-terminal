<template>
  <!-- 歌单组件 -->
  <div class="plist">
    <cell-com :CellSongList="PlistkSongList"></cell-com>
  </div>
</template>

<script>
import CellCom from "components/cellCom/cellCom";
export default {
  data() {
    return {
      PlistkSongList: [],
    };
  },
  async created() {
    let { data } = await this.$axios.get("/api/plist/index?json=true");
    this.PlistkSongList = data.plist.list.info.map((item) => {
      return {
        intro: item.intro,
        playcount: item.playcount,
        specialname: item.specialname,
        specialid: item.specialid,
      };
    });

    this.PlistkSongList = data.plist.list.info;
  },
  components: {
    CellCom,
  },
};
</script>

<style>
</style>