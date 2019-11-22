<!--头部组件-->
<template>
  <div class="flex flex-sub justify-between bg-black">
    <div class="extra-large bg-black text-white text-blod text-center head-icon">数据分析系统
    </div>
    <div class="flex flex-sub justify-end header-right bg-black">
      <div class="flex align-center ">
        <div class="margin-right-sm text-white pointer" @click="linkto('/ManageAPI')">
          <i class="el-icon-s-order large"></i>
          api管理
        </div>
        <el-dropdown class="head-drop">
          <el-badge value="new" class="item">
            <i class="el-icon-message-solid text-white large" style="margin-right: 15px"></i>
          </el-badge>
          <el-dropdown-menu slot="dropdown">

            <el-dropdown-item class="clearfix">
              查看
              <el-badge class="mark" :value="12"/>
            </el-dropdown-item>

            <el-dropdown-item class="clearfix">
              通知
              <el-badge class="mark" :value="12"/>
            </el-dropdown-item>

            <el-dropdown-item class="clearfix">
              日志
              <el-badge class="mark" :value="12"/>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="flex align-center justify-center margin-right-xs">
          <el-avatar :size="40" src="https://empty" @error="errorHandler">
            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
          </el-avatar>
          <span class="text-cut margin-lr-xs text-white">{{userInfo.nickname||儒韵BI}}</span>
        </div>

        <span class="exit padding-right text-white" onselectstart="return false;" unselectable="on" @click="exit">退出登录</span>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "DBheader",
        props:{},
        data(){
            return {
              userInfo:this.$local.get('userInfo')
            }
        },
        methods:{
            errorHandler() {
                return true
            },

          linkto(url){
              if(this.$local.get('userInfo').nickname!='root'){
                this.$message.error('暂无权限');
                return
              }
              this.$router.push({
                path:url,
                query:'/ManageAPI'
              })
          },

          exit(){
            this.$router.push({
              path:'/Login'

            })
          }
        }
    }
</script>

<style scoped>
  .head-icon {
    width: 300px;
    line-height: 80px;
    letter-spacing: 2px
  }
  .header-right {
    line-height: 80px;
  }
  .head-drop {
    line-height: 30px;
    margin-right: 30px;
  }
  .exit:hover {
    color: #1cbbb4;
    user-select: none;
  }
</style>
