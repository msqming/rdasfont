<template>
  <!--              选项筛选-->
  <div class="idx-options margin-bottom-sm margin-top">
    <div class=" margin-top-sm margin-bottom-sm padding-lr-xs "
         :class="showmore?'flex flex-wrap':'idx-tag'"
         style="position: relative"
    >
      <el-tag
          class=" margin-bottom-sm pointer tag-Opt"
          v-for="(item,index) in tags"
          :key="index"
          :type="item.ischoosed?'success':'warn'"
          @click="index!=0?pickOpt(index):''"
      >
        {{ item.label }} <i class="el-icon-check el-icon--right" v-if="item.ischoosed"></i>
      </el-tag>

      <div
          class="checkmore margin-bottom-sm pointer text-center margin-right-xs"
          v-if="tags.length>8&showmore"
          @click="closeMore"
      >
        收起 <i class="el-icon-arrow-up"></i>
      </div>
      <div class="checkmore pointer" @click="checkmore()" v-if="tags.length>8&!showmore">查看更多</div>
    </div>
    <div class="flex align-center">
      <el-button-group>
        <el-button type="primary" size="mini" @click="allPick">全选</el-button>
        <el-button type="warning" size="mini" @click="inservePick">反选</el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TableOption",
    props:['tags'],
    data(){
      return{
        showmore: false,//查看更多标签
      }
    },
    methods:{
      // 点击查看更多
      checkmore() {
        this.showmore = true
      },
      closeMore(){
        this.showmore = false

      },

      // 点击选择标签
      pickOpt(e) {
        let idx = e;
        this.tags.forEach((item, index) => {
          if (idx == index) {
            item.ischoosed = !item.ischoosed;
            this.tags[idx] = item
          }

        })
        this.$emit('getTableOpt',this.tags)
      },

      // 全选标签
      allPick() {
        this.tags.forEach((item, index) => {
          item.ischoosed = true;
          this.tags[index] = item
        })
        this.$emit('getTableOpt',this.tags)
      },


      // 反选标签
      inservePick() {
        this.tags.forEach((item, index) => {
          if(index==0){
            item.ischoosed = true;
          }else{
            item.ischoosed = !item.ischoosed;
          }
          this.tags[index] = item
        })
        this.$emit('getTableOpt',this.tags)
      },
    }
  }
</script>

<style scoped>
  .tag-Opt{
    min-width: 8%;
    margin-right: 3.5%;
  }
  .idx-options {
    background-color: rgba(255, 1, 1, .04);
    padding: 10px;
  }

  .idx-tag {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    position: relative;
  }

  .idx-tag > span {
    display: inline-block;
  }

   .checkmore {
    position: absolute;
    right: 0;
    bottom: 0px;
    color: #1cbbb4;
    background-color: #ecf5ff;
    padding: 0 10px;
    line-height: 30px;
    margin-bottom: 20px;
  }
</style>