<template>
  <div>
    <el-container style="height: 100%; border: 1px solid #eee;overflow-y: auto">

      <el-header class=" bg-black" height="141px" style="padding-right: 0;">
        <!--  头部信息-->
        <DBheader></DBheader>

        <!--          导航栏-->
        <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo flex align-end padding-left-xl"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545C64"
            text-color="#fff"
            active-text-color="#ffd04b"
        >
          <el-menu-item index="1">首页</el-menu-item>
          <el-submenu index="数据中心">
            <template slot="title">数据中心</template>

            <el-submenu index="2">
              <template slot="title">电商平台数据</template>
              <el-menu-item index="淘宝 / 天猫">
                <el-submenu index="2-1-1-1">
                  <template slot="title">淘宝 / 天猫</template>
                  <el-menu-item index="HP官方旗舰店">HP官方旗舰店</el-menu-item>
                  <el-menu-item index="HP儒韵店">HP儒韵店</el-menu-item>
                </el-submenu>
              </el-menu-item>
              <el-menu-item index="京东商城">京东商城</el-menu-item>
              <el-menu-item index="唯品会">唯品会</el-menu-item>
              <el-menu-item index="亚马逊">亚马逊</el-menu-item>
              <el-menu-item index="拼多多">拼多多</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-header>

      <el-container :style="{'height':orderHight+'px'}">
        <el-header height="50px" style="line-height: 50px;background: #fff">
          <!--          面包屑导航栏-->
          <div class=" flex align-center padding-left-sm">
            <div class="margin-right-sm">您当前的位置：</div>
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>首页</el-breadcrumb-item>
              <el-breadcrumb-item>电商平台数据</el-breadcrumb-item>
              <el-breadcrumb-item>淘宝 / 天猫</el-breadcrumb-item>
              <el-breadcrumb-item>HP官方旗舰店</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </el-header>
        <el-container :style="{'height':orderHight+'px'}">
          <!--  侧边栏-->
          <el-aside width="300px" class="sidebar" :style="{'height':'85%','background-color':' #F2F6FC'}">
            <Sidebar :sideData="sideData" :orderHight="orderHight" @getcur="getcurId"></Sidebar>
          </el-aside>
          <el-main :style="{'height':'96%'}">
            <!--          模块头部-->
            <div class="idx-header ">
              <el-card>
                <div class="flex align-center justify-between">
                  <div class="extra-large text-blod">模块名</div>
                  <div class="base pointer flex align-center">
                    <!-- 市场大盘时显示-->
                    <el-dropdown @command="selectStore" size="small" type="primary" class="margin-right-sm"
                                 v-if="false">
                      {{store[storeIndex].name}}
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="(item,index) in store" :key="index" :command="index">{{item.name}}
                        </el-dropdown-item>

                      </el-dropdown-menu>
                    </el-dropdown>
                    <el-button type="primary" @click="openUpLoad()">上传<i class="el-icon-upload el-icon--right"></i>
                    </el-button>
                    <el-button type="warning" @click="toggleManage">管理<i
                        class="el-icon-setting el-icon--right"></i>
                    </el-button>
                    <span class="margin-left-xs log" @click="dialogTableVisible = true"><i
                        class="el-icon-document"></i> 日志</span>
                  </div>
                </div>
              </el-card>
            </div>

            <!--          子类筛选选项-->
            <el-card class="margin-top-sm">
              <div class="idx-subnav flex align-start">
                <div class="flex-sub flex idx-subnav-list">
                <span v-for="(item,index) in opts" :key="index" class="margin-right-xl pointer"
                      :class="curIdx==index?'text-cyan':''" :data-index="index" @click="choosednav">{{item}}</span>
                </div>
                <div class="text-blue">设置</div>
              </div>
            </el-card>

            <!--         360 子类选项-->
            <el-card class="margin-top-sm">
              <div class="flex flex-wrap idx-opt-list">
                <div class="padding-xs margin-bottom-sm border idx-opt-item pointer" v-for="(item,index) in 12" :key="index"
                     v-if="isShowAll?index<8:index<12" :data-index="index" @click="">
                  <div class="text-cut">ID 121321231</div>
                  <div class="text-cut">光影精灵2</div>
                </div>
              </div>

              <div class="text-center " @click="showAll()"><i class="extra-large"
                                                              :class="isShowAll?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
              </div>
            </el-card>

            <!--          选择切换-->
            <div class=" margin-top-sm">
              <el-menu
                  :default-active="default1"
                  class="el-menu-demo"
                  mode="horizontal"
                  @select="selectSub"
                  text-color="#333"
                  active-text-color="#ffd04b">
                <el-menu-item :index="item.id.toString()" v-for="(item,index) in navlist" :key="index">{{item.name}}
                </el-menu-item>
              </el-menu>
            </div>

            <!--          主要内容-->
            <el-card class="margin-top-sm">
              <div class="idx-main">
                <div class="large text-blod marign-bottom-sm flex align-end justify-between margin-top-sm">
                  <div>
                    <div class="extra-large">標題名</div>
                    <div class="flex-sub flex margin-top">
                      <el-radio-group v-model="radio2" @change="changeRadio">
                        <el-radio v-for="(item,index) in 3" :key="index" :label="index">选项</el-radio>

                      </el-radio-group>
                    </div>
                  </div>
                  <div class="flex align-center">
                    <el-dropdown trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                      日期:<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a" icon="el-icon-s-promotion">最近一天</el-dropdown-item>
                        <el-dropdown-item command="b" icon="el-icon-s-promotion">最近七天</el-dropdown-item>
                        <el-dropdown-item command="c" icon="el-icon-s-promotion">最近三十天</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>

                    <div class="margin-left-sm">
                      <el-date-picker
                          v-model="value1"
                          type="date"
                          placeholder="选择起始日期">
                      </el-date-picker>
                      ~
                      <el-date-picker
                          v-model="value2"
                          type="date"
                          placeholder="选择结束日期">
                      </el-date-picker>
                    </div>

                    <el-button type="text" class="margin-left-sm" @click="handleDownload">下载<i
                        class="el-icon-download el-icon--right"></i>
                    </el-button>

                  </div>
                </div>

                <!--              选项筛选-->
                <div class="idx-options margin-bottom-sm margin-top">
                  <div class=" margin-top-sm margin-bottom-sm padding-lr-xs "
                       :class="showmore?'flex flex-wrap':'idx-tag'">
                    <el-tag
                        class=" margin-bottom-sm pointer tag-Opt"
                        v-for="(item,index) in tags"
                        :key="index"
                        :type="item.ischoosed?'success':'warn'"
                        @click="pickOpt"
                        :data-id="index"
                    >
                      {{ item.label }} <i class="el-icon-check el-icon--right" v-if="item.ischoosed"></i>
                    </el-tag>

                    <div class="checkmore" @click="checkmore()" v-if="tags.length>8&!showmore">查看更多</div>
                  </div>
                  <div class="flex align-center">
                    <el-button-group>
                      <el-button type="primary" size="mini" @click="allPick">全选</el-button>
                      <el-button type="warning" size="mini" @click="cencerPick">取消</el-button>
                      <el-button type="primary" size="mini" @click="inservePick">反选</el-button>
                    </el-button-group>
                  </div>
                </div>


                <!--              表格-->
                <subTable :tableData="tableData" :arr="arr"></subTable>

                <!--              分页-->
                <div class="flex justify-center padding-sm">
                  <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page.sync="currentPage"
                      :page-size="20"
                      layout=" prev, pager, next"
                      :total="500"
                      prev-text="上一页"
                      next-text="下一页"
                  >
                  </el-pagination>
                </div>
              </div>
            </el-card>

          </el-main>
        </el-container>
      </el-container>
    </el-container>


    <!--    日志弹窗-->
    <el-dialog title="日志" :visible.sync="dialogTableVisible">
      <el-table :data="tableData" height="350">
        <el-table-column property="address" label="操作日志"></el-table-column>
      </el-table>
    </el-dialog>

    <!--    上传弹窗组件-->
    <Upload :showLoadBox="isShowLoadBox" @changeShowLoadBox="changeVal"></Upload>
    <!--    管理弹窗-->
    <Manage :manageModel="manageModel" @changeManageModel="changeManageModel"></Manage>
  </div>
</template>

<script>
  import {parseTime} from "common/utils/setMethods.js";
  import {json2excel} from "common/utils/setMethods.js";
  import subTable from 'components/table/SubTable';
  import Sidebar from 'components/sidebar/Sidebar';
  import DBheader from 'components/header/DBheader';
  import Upload from 'components/upload/Upload';
  import Manage from 'components/manage/Manage';

  export default {
    name: "home",
    components: {
      subTable,
      Sidebar,
      DBheader,
      Upload,
      Manage
    },
    data() {

      const list = [{
        name: 'dachui',
        id: 1
      }, {
        name: 'dachui1',
        id: 2
      }]

      const sideData = [{
        title: 'aaa',
        bestList: [{
          id: 0,
          name: '大厦1'
        }, {
          id: 1,
          name: '大厦2'
        }, {
          id: 2,
          name: '大厦3'
        }],
        moreList: [{
          id: 3,
          name: '大厦4'
        }, {
          id: 4,
          name: '大厦5'
        }, {
          id: 5,
          name: '大厦6'
        }, {
          id: 6,
          name: '大厦7'
        }, {
          id: 7,
          name: '大厦8'
        }]
      }, {
        title: 'bbb',
        bestList: [{
          id: 0,
          name: '大厦1'
        }, {
          id: 1,
          name: '大厦2'
        }, {
          id: 2,
          name: '大厦3'
        }],
        moreList: [{
          id: 3,
          name: '大厦4'
        }, {
          id: 4,
          name: '大厦5'
        }, {
          id: 5,
          name: '大厦6'
        }, {
          id: 6,
          name: '大厦7'
        }, {
          id: 7,
          name: '大厦8'
        }]
      }]

      return {
        sideData: sideData,//侧边栏数据
        uploadNum: 0,//已上传文件个数
        tableData: [],
        manageList: [],
        orderHight: 1000,
        activeIndex2: 'HP官方旗舰店',//控制navmenu高亮
        default1: '1',
        dialogTableVisible: false,//控制日志弹窗
        manageModel: false,//控制管理弹窗
        navlist: list,//导航列表
        value1: '',//日期值
        value2: '',//日期值
        tags: [{type: '', label: '标签一标签一标签一', ischoosed: false},
          {type: 'success', label: '标签二标签二标签二', ischoosed: true},
          {type: 'info', label: '标签三标签三标签三标签三', ischoosed: false},
          {type: 'danger', label: '标签四标签四标签四', ischoosed: false},
          {type: 'warning', label: '标签五标签五', ischoosed: false},
          {type: '', label: '标签一', ischoosed: false},
          {type: 'success', label: '标签二标签二标签二', ischoosed: true},
          {type: 'info', label: '标签三', ischoosed: false},
          {type: 'danger', label: '标签三标签三', ischoosed: false},
          {type: 'warning', label: '标签五', ischoosed: false}],
        arr: [],
        sortrow: {prop: 'date', order: 'descending'},//表头是否排序
        currentPage: 1,//表格当前页码
        store: [{id: 0, name: '全部'}, {id: 1, name: '天猫'}, {id: 2, name: '淘宝'}],
        store1: [{id: 0, name: '请选择'}, {id: 1, name: '天猫'}, {id: 2, name: '淘宝'}],
        storeIndex: 0,//选中的店铺来源index
        storeIndex1: 0,
        isShowLoadBox: false,//打开上传弹窗
        showmore: false,//查看更多标签
        opts: ['笔记本电脑', '键盘', '无线鼠标', '有线鼠标', '台式整机', '家用一体机', '显示器', '普通U盘', '其他'],//子类筛选
        curIdx: 0,//当前选中
        isShowAll: false,//是否查看更多
        radio2: 2,

      }
    },
    methods: {


      // 监听获取当前侧边栏点击的参数
      getcurId(e) {
        console.log('Hi, ' + e)
      },

      //改变显示上传弹窗的值
      changeVal(e) {
        this.isShowLoadBox = e
      },

      // 导航栏选择
      handleSelect(key, keyPath) {
        console.log(key, keyPath);

      },

      // 子导航选择
      selectSub(key, keyPath) {
        console.log(key, keyPath);
      },

      // 选择最近几天日期
      handleCommand(command) {
        this.$message('click on item ' + command);
      },
      // 选择店铺来源
      selectStore(command) {
        this.storeIndex = command
      },
      // 选择上传到店铺
      selectToStore(command) {
        this.storeIndex1 = command
      },

      // 点击查看更多
      checkmore() {
        this.showmore = true
      },

      // 点击选择标签
      pickOpt(e) {
        let idx = e.target.dataset.id;
        this.tags.forEach((item, index) => {
          if (idx == index) {
            item.ischoosed = !item.ischoosed;
            this.tags[idx] = item
          }

        })
      },

      // 全选标签
      allPick() {
        this.tags.forEach((item, index) => {
          item.ischoosed = true;
          this.tags[index] = item
        })
      },

      //取消选择
      cencerPick() {
        this.tags.forEach((item, index) => {
          item.ischoosed = false;
          this.tags[index] = item
        })
      },

      // 反选标签
      inservePick() {
        this.tags.forEach((item, index) => {
          item.ischoosed = !item.ischoosed;
          this.tags[index] = item
        })
      },
      // 分页操作
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },

      //子类导航切换
      choosednav(e) {
        let index = e.target.dataset.index;
        this.curIdx = index
      },

      // 打开上传弹窗
      openUpLoad() {
        this.isShowLoadBox = true;
        console.log(this.isShowLoadBox)
      },


      // 点击查看更多
      showAll() {
        this.isShowAll = !this.isShowAll;
      },

      //点击返回选中的单选值
      changeRadio(e) {
        console.log(e)
      },
      // 点击管理
      toggleManage() {
        this.manageModel = true;

      },

      // 监听关注组件返回的值
      changeManageModel() {
        this.manageModel = false;
      },

      //点击下载事件
      handleDownload() {
        // 给下载的表命名，命名规则：模块名+第几页的数据+当前时间
        let day = new Date();
        day = parseTime(day)
        console.log(day)
        let dateName = `模块名第${1}页 ${day}`
        //注意：组装的导出excel所需要的数据结构
        var excelDatas = [
          {
            tHeader: ["Id", "Title", "Author", "Readings", "Date"], // sheet表一头部
            filterVal: ["id", "title", "author", "pageviews", "display_time"], // 表一的数据字段
            tableDatas: this.list, // 表一的整体json数据
            sheetName: dateName// 表一的sheet名字
          }

        ]
        //   引入的函数
        json2excel(excelDatas, dateName, true, "xlsx")
      },
      // 获取访客分析数据
      getvisitor() {
        const that = this;
        const loading = this.$loading({
          lock: true,
          text: '努力加载中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.1)'
        });
        that.$axios.post("/api/v1/storage/").then(res => {
          loading.close();
          if (res.status == '200') {
            for (let i in res.data.data) {
              res.data.data[i].id = Number(i) + 1;
            }
            that.tableData = res.data.data;
            let arr = []
            for (let i in res.data.data[0]) {
              let obj = {}
              if (i == 'id') {
                obj.label = '序号';
                obj.prop = 'id';
                obj.type = 'normal';

              } else if (i != 'create_date' && i != 'filetabinfo' && i != 'last_date') {
                obj.label = i;
                obj.prop = i;
                obj.type = 'normal';
              }
              arr.push(obj)
            }
            // arr.splice(-1, 1)//把多余的一项去掉

            // 再次进行改造
            for (let i in res.data.title) {
              if (i != 0 && i != 7 && i != 8 && i != 9) {
                arr[i].label = res.data.title[i]
              }
            }
            that.arr = arr;
            that.sorts = 'uv'//可调节排序的字段
          }
        }).catch(res => {
          loading.close();
        })
      },
    },

    created() {
      this.getvisitor()
    },

    mounted: function () {
      let that = this;
      //原生获取屏幕高度
      let orderHight = document.body.clientHeight
      console.log(orderHight)
      that.orderHight = orderHight - 350
      // document.getElementById('order-list').style.height = orderHight + 'px'
    }


  }
</script>

<style scoped>
  @import 'Home.css';
</style>

