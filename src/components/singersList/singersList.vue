<template>
  <div class="singersList">
    <cell-com :CellSongList="SingersLists"></cell-com>
  </div>
</template>

<script>
import CellCom from "components/cellCom/cellCom.vue";
import { mapState } from "vuex";
export default {
  data() {
    return {
      SingersLists: [],
    };
  },
  components: {
    CellCom,
  },

  async created() {
    let { data } = await this.$axios.get(
      "/api" + this.$route.path + "?json=true"
    );
    this.SingersLists = data.singers.list.info;
    this.$store.commit("changeHead", {
      seat: 1,
      title: data.classname,
    });
  },
};
</script>

<style>
</style>