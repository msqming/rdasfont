<template>
  <div class="sidebar-list">
    <div class="padding-xs padding-top-sm padding-bottom-sm sidebar-item" v-for="(items,index) in sideData"
         :key="index">
      <div class="sidebar-item-title large margin-bottom-sm">{{items.title}} <i
        class="el-icon-arrow-right margin-left-xs large"></i>
      </div>

      <div class="flex sidebar-item-son">
        <div class="flex-sub text-cut padding-lr-xs text-center" v-for="(item,index) in items.bestList" :key="index"  ><span
          class="sidebar-item-son-item pointer" @click="getSubData" :data-id="item.id">{{item.name}}</span>
        </div>
      </div>

      <div class="sub-menu-box" :style="{'height':orderHight+'px'}">
        <div class="sub-menu">
          <div class="large text-blod sub-menu-title margin-bottom-sm">{{items.title}}</div>
          <div class="flex flex-wrap base sub-menu-list">
            <div class="margin-bottom-sm sub-menu-item" style="width: 50%" v-for="(item,index) in items.moreList"
                 :key="index" @click="getSubData" :data-id="item.id">
              {{item.name}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Sidebar",
        props: {
            orderHight: {
                type: Number,
                default: 700
            },
            sideData:{
                type: Array,
                default: []
            }
        },
        methods:{
            getSubData(e){
                let id = e.target.dataset.id;
                console.log(e)
                this.$emit('getcur',id)
            }
        }
    }
</script>

<style scoped>
  .sidebar-item:hover {
    background: #ffffff;
    box-shadow: 0px 0px 5px #cce6ff inset;
  }

  .sidebar-item:hover .sidebar-item-title, .sidebar-item:hover .sub-menu-box {
    color: #1cbbb4;
    display: block;
    transition: color 0.13s ease-in-out;
  }
</style>
