<template>
  <!-- 歌手组件 -->
  <div class="singer">
    <van-cell
      v-for="(item, i) in GetSingers"
      :key="item.classid"
      :title="item.classname"
      is-link
      :class="{
        classSinger: !classSingers(item.classname, i),
        classSinger2: classSingers(item.classname, i),
      }"
      :to="'/singer/list/' + item.classid"
    ></van-cell>
  </div>
</template>

<script>
export default {
  data() {
    return {
      GetSingers: [],
    };
  },
  async created() {
    let res = await this.$axios.get("api/singer/class?json=true");
    this.GetSingers = res.data.list;
  },
  methods: {
    classSingers(name, i) {
      if (
        i > 0 &&
        this.GetSingers[i - 1].classname.includes(name.substr(0, 2))
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang='less'>
.singer {
  .van-cell--clickable {
    border: 1px solid rgba(0, 0, 0, 0.199);
    background: #fbfbfb;
    width: 91%;
    line-height: 1.65rem;
    border-radius: 0.35rem;
  }
  .classSinger {
    margin: 1rem 1rem 0;
  }
  .classSinger2 {
    margin: 0 1rem;
    border-top: none;
  }
}
</style>