<!--自定义侧边栏组件-->
<template>
  <div class="sidebar-list">
    <div class="padding-xs padding-top-sm padding-bottom-sm sidebar-item" v-for="(items,index) in sideData"
         :key="items.id">
      <div class="sidebar-item-title large margin-bottom-sm">{{items.name}} <i
          class="el-icon-arrow-right margin-left-xs large"></i>
      </div>

      <div class="flex sidebar-item-son">
        <div class="flex-sub text-cut padding-lr-xs text-center" v-for="(item,idx) in sideData[0].fields[0].fields"
             :key="idx" v-if="idx<3"><span
            class="sidebar-item-son-item pointer" :class="curItem==index&&curOpt==item.id?'text-cyan':''"
            @click="getSubData(item.name,item.id,sideData[0].fields[0].name,index,item.url)">{{item.name}}</span>
        </div>
      </div>

      <div class="sub-menu-box" :style="{'height':orderHight+'px'}">
        <div class="sub-menu flex flex-wrap">
          <div class="text-center padding-lr-xs margin-bottom" style="width: calc(100%/6);box-sizing: border-box" v-for="(subitem,idx) in items.fields" :key="idx">
            <div class="large text-blod sub-menu-title margin-bottom-sm">{{subitem.name}}</div>
            <div class=" base sub-menu-list">
              <div class="margin-bottom-sm sub-menu-item text-center" :class="curItem==index&&curOpt==lowItem.id?'text-cyan':''"
                   v-for="(lowItem,subidx) in subitem.fields"
                   :key="subidx" @click="getSubData(lowItem.name,lowItem.id,subitem.name,index,lowItem.url)">
                {{lowItem.name}}
              </div>
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
      sideData: {
        type: Array,
        default: []
      },
      defOpt:{
        type: Number,
        default:''
      }
    },
    data() {
      return {
        curItem: 0,
        curOpt: this.defOpt||0
      }
    },

    mounted(){

    },
    methods: {
      getSubData(name,id, parentname, index,url) {
        let data = {
          name,
          id,
          parentname,
          index,
          url
        }
        this.$emit('getcur', data,)
        this.curItem = index;
        this.curOpt = id;
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

  .sub-menu-box {
    width: 800px;
    position: fixed;
    left: 310px;
    top: 191px;
    display: none;
    z-index: 3;
    color: #333 !important;
  }

  .sub-menu {
    width: 800px;
    min-height: 50%;
    border-radius: 10px;
    padding: 30px 20px;
    background: #fff;
    box-shadow: 0px 0px 10px #cce6ff inset;
  }

  .sub-menu-list .sub-menu-item:hover {
    color: #1cbbb4;
  }

</style>
