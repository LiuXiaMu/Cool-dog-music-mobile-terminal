<template>
  <!-- 排行和歌单的复用组件 -->
  <div class="cellCom">
    <van-cell
      center
      v-for="(item, i) in CellSongList"
      :key="i"
      :title="titleName(item)"
      :icon="item.imgurl | imgRename"
      :to="JumpToPage(item)"
    >
      <template #right-icon v-if="$route.name != 'singersList'">
        <van-icon name="arrow" />
      </template>
      <template v-if="item.playcount" #label>
        <van-icon name="service-o" />
        <i style="margin-left: 5px">{{ item.playcount }}</i>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    CellSongList: {
      type: Array,
    },
  },
  filters: {
    imgRename(val) {
      return val.replace(/{size}/, "400");
    },
  },
  computed: {
    titleName() {
      return function (item) {
        return item.rankname || item.specialname || item.singername;
      };
    },
    playCount() {
      return function (item) {
        return item.playcount || "";
      };
    },
    JumpToPage() {
      return function (item) {
        let path = "/song/details/";
        if (item.rankid) {
          path += "rank/info/" + item.rankid;
        } else if (item.singerid) {
          path = "/singer/info/" + item.singerid;
        } else {
          path += "plist/list/" + item.specialid;
        }
        return path;
      };
    },
  },
};
</script>

<style lang="less">
.rank,
.plist,
.singersList {
  .cellCom {
    .van-cell {
      i.van-cell__left-icon {
        width: 5.5rem;
        height: 5.5rem;
        margin-right: 20px;
        img {
          height: 100%;
          width: 100%;
        }
      }
    }
  }
}
</style>