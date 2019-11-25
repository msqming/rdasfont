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
          <el-menu-item index="首页">首页</el-menu-item>
          <el-submenu index="数据中心">
            <template slot="title">数据中心</template>

            <el-submenu index="电商平台数据">
              <template slot="title">电商平台数据</template>
              <el-menu-item index="淘宝 / 天猫">
                <el-submenu index="">
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
              <el-breadcrumb-item v-for="item in curpath">{{item}}</el-breadcrumb-item>

            </el-breadcrumb>
          </div>
        </el-header>
        <el-container :style="{'height':orderHight+'px'}">
          <!--  侧边栏-->
          <el-aside width="300px" class="sidebar" :style="{'height':'85%','background-color':' #F2F6FC'}">
            <Sidebar :defOpt="sideOpt" :sideData="sideData" :orderHight="orderHight" @getcur="getcurId"></Sidebar>
          </el-aside>
          <el-main :style="{'height':'96%'}">
            <!--          模块头部-->
            <div class="idx-header ">
              <el-card>
                <div class="flex align-center justify-between">
                  <div class="extra-large text-blod">{{sideModelName}}</div>
                  <div class="base pointer flex align-center">

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

            <template>
              <!--         360 子类筛选选项-->
<!--              -->
              <el-card class="margin-top-sm" v-if="sideModelParams.hardwareList">
                <div class="idx-subnav flex align-start">
                  <div class="flex-sub flex idx-subnav-list">
                <span v-for="(item,index) in opts" :key="index" class="margin-right-xl pointer"
                      :class="curIdx==index?'text-cyan':''" :data-index="index" @click="choosednav">{{item}}</span>
                  </div>
<!--                  <div class="text-blue">设置</div>-->
                </div>
              </el-card>

              <!--         360 子类选项-->
<!--              -->
              <el-card class="margin-top-sm" v-if="sideModelParams.productList">
                <div class="flex flex-wrap idx-opt-list">
                  <div class="padding-xs margin-bottom-sm border idx-opt-item pointer"
                       :class="curOpt==index?'bg-cyan':''" v-for="(item,index) in 12" :key="index"
                       v-if="isShowAll?index<8:index<12" @click="choosedOpt(index)">
                    <div class="text-cut">ID 121321231</div>
                    <div class="text-cut">光影精灵2</div>
                  </div>
                </div>

                <div class="text-center " @click="showAll()"><i class="extra-large"
                                                                :class="isShowAll?'el-icon-arrow-down':'el-icon-arrow-up'"></i>
                </div>
              </el-card>
            </template>

            <!--          选择切换-->
<!--            -->
            <div class=" margin-top-sm" v-if="sideModelParams.navList!=undefined&&sideModelParams.navList.length>1">
              <el-menu
                  :default-active="default1"
                  class="el-menu-demo"
                  mode="horizontal"
                  @select="selectSub"
                  text-color="#333"
                  active-text-color="#ffd04b">
                <el-menu-item :index="(index+1).toString()" v-for="(item,index) in sideModelParams.navList" :key="index">{{item.name}}
                </el-menu-item>
              </el-menu>
            </div>

            <!--          主要内容-->
            <el-card class="margin-top-sm">
              <div class="idx-main">
                <div class="large text-blod marign-bottom-sm flex align-end justify-between margin-top-sm">
                  <div>
                    <div class="extra-large" v-if="sideModelParams.navList!==undefined&&sideModelParams.navList.length>0">{{sideModelParams.navList[navIndex].name}}</div>
<!--                    个别模块含有-->
<!--                    -->
                    <div class="flex-sub flex margin-top" v-if="sideModelParams.categoryList">
                      <el-radio-group v-model="radio2" @change="changeRadio">
                        <el-radio v-for="(item,index) in 3" :key="index" :label="index">选项</el-radio>
                      </el-radio-group>
                    </div>
                  </div>
                  <div class="flex align-center">
                    <el-date-picker
                        v-model="value2"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="~"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions">
                    </el-date-picker>

                    <el-button type="text" class="margin-left-sm" @click="handleDownload">下载<i
                        class="el-icon-download el-icon--right"></i>
                    </el-button>

                  </div>
                </div>

                <!--筛选表格数据-->
                <TableOption :tags="tags" @getTableOpt="getTableOpt" v-if="tableData.length>0"></TableOption>

                <!--              表格-->
                <subTable :tableData="tableData" :arr="tableArr"></subTable>

                <!--              分页-->
                <div class="flex justify-center padding-sm">
                  <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page.sync="currentPage"
                      :page-size="20"
                      layout=" prev, pager, next"
                      :total="count"
                      prev-text="上一页"
                      next-text="下一页"
                      :hide-on-single-page="count<=20"
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
    <Upload :showLoadBox="isShowLoadBox" :uploadUrl="uploadUrl" @changeShowLoadBox="changeVal"></Upload>
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
  import TableOption from 'components/tableOption/TableOption';

  export default {
    name: "home",
    components: {
      subTable,
      Sidebar,
      DBheader,
      Upload,
      Manage,
      TableOption
    },
    data() {

      return {
        sideOpt:1,//侧边栏默认选中
        curpath: [],//面包屑数据
        sideData: [],//侧边栏数据
        uploadNum: 0,//已上传文件个数
        tableData: [],
        manageList: [],
        orderHight: 1000,
        activeIndex2: 'HP官方旗舰店',//控制navmenu高亮
        default1: '1',
        dialogTableVisible: false,//控制日志弹窗
        manageModel: false,//控制管理弹窗
        navIndex:0,
        curOpt: 0,//360子选择
        value1: '',//日期值
        value2: '',//日期值
        tags: [],//表格筛选项
        arr: [],//存储用于控制展示表格表头的数组
        tableArr: [],//实际用于控制展示表格表头的数组
        currentPage: 1,//表格当前页码
        count:0,//表格数据总数
        tableUrl:'',//表格请求连接

        isShowLoadBox: false,//打开上传弹窗
        opts: ['笔记本电脑', '键盘', '无线鼠标', '有线鼠标', '台式整机', '家用一体机', '显示器', '普通U盘', '其他'],//子类筛选
        curIdx: 0,//当前选中
        isShowAll: false,//是否查看更多
        radio2: 2,
        // sorts: '',//决定表格排序的字段
        uploadUrl:'/storage/flow/',
        sideModelName:'',//侧边栏模块名
        sideModelParams:{},//侧边栏模块内部参数

        nextPage:'',//下一页url
        prevPage:'',//上一页url
        pickerOptions: {// 日期
          shortcuts: [{
            text: '最近一天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 1);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }],
          onPick: (dateRange => {//获取选择的时间回调
            if (!dateRange.maxDate) {
              return;
            }
            console.log(parseTime(dateRange.minDate))
            this.value2 = [dateRange.minDate, dateRange.maxDate];
            // this.searchChangeDate(); //接上筛选接口
          })
        },
      }
    },
    methods: {

      // 监听获取当前侧边栏点击的参数
      getcurId(e) {
        let sideItem =  this.sideData[e.index].name||'',
          sideSubItem = e.parentname||'',
          sideLastItem = e.name||'',
          curpath = new Array(sideItem,sideSubItem,sideLastItem)||'';
        let Url;
        console.log(e.subUrl)
        if(e.subUrl){
          if(e.url.indexOf('/api/v1')!=-1){
            Url = '/api/v1'+e.subUrl;
          }else{
            Url = e.subUrl;
          }
        }
        let param = {
          id : e.id
        }
        this.tableUrl = '';
        this.currentPage = 1;
        this.count = 0;
        this.nextPage='';
        this.prevPage='';
        this.sideModelName = sideLastItem;
        this.uploadUrl=e.url;//上传路径
        this.curpath = curpath;
        this.tableData = [];
        this.tableArr = [];
        this.arr = [];
        this.tags = [];
        this.sideModelParams={};
        this.$forceUpdate();

        this.getParam(Url,param)
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

        this.navIndex = Number(key)-1;
        this.tableData = [];
        this.tableArr = [];
        this.arr = [];
        this.tags = [];
        this.count = 0;
        this.tableUrl = '';
        this.currentPage = 1;
        this.$forceUpdate();

        let api_url = this.sideModelParams.navList[this.navIndex].api_url;
        this.tableUrl =api_url
        this.getvisitor(api_url);
      },

      // 选择最近几天日期
      handleCommand(command) {
        this.$message('click on item ' + command);
      },
      // 选择店铺来源
      selectStore(command) {
        this.storeIndex = command
      },


      // 点击选择360子选项
      choosedOpt(index) {
        this.curOpt = index
      },

      // 监听筛选表格返回的字段
      getTableOpt(e) {
        let selArr = []
        for (let i in e) {
          if (e[i].ischoosed == true) {
            selArr.push(this.arr[i])
          }
        }
        this.tableArr = selArr
      },

      // 分页操作
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      // 跳转页
      handleCurrentChange(val) {
        let api_url = this.tableUrl+'?page='+val
        this.getvisitor(api_url)
      },

      //子类导航切换
      choosednav(e) {
        let index = e.target.dataset.index;
        this.curIdx = index;

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
        console.log(this.tableData)
        if (this.tableData.length <= 0) {
          this.$message('表格无数据');
          return
        }
        let arr = this.arr;
        // 给下载的表命名，命名规则：模块名+第几页的数据+当前时间
        let day = new Date();
        day = parseTime(day)
        let dateName = `模块名第${1}页 ${day}`
        let newArr = []
        let newArr2 = []
        for (let i in arr) {
          newArr.push(arr[i].label)
        }
        for (let j in arr) {
          newArr2.push(arr[j].prop)
        }
        //注意：组装的导出excel所需要的数据结构
        var excelDatas = [
          {
            tHeader: newArr, // sheet表一头部
            filterVal: newArr2, // 表一的数据字段
            tableDatas: this.tableData, // 表一的整体json数据
            sheetName: dateName// 表一的sheet名字
          }

        ]
        //   引入的函数
        json2excel(excelDatas, dateName, true, "xlsx")
      },

      // 获取模块内字段参数
      getParam(url,params){
        this.$axios.post(url,params).then(res=>{
          if(res.data.code=='0'){
            this.default1='1'
            this.sideModelParams = res.data.data;
            this.$forceUpdate()
            console.log(this.sideModelParams)

            if(JSON.stringify(this.sideModelParams)==='{}'){
              return;
            }else{
              if(this.sideModelParams.navList.length>0){
                let api_url = res.data.data.navList[0].api_url;
                this.tableUrl = res.data.data.navList[0].api_url
                this.getvisitor(api_url)
              }
            }

          }else{
            this.sideModelParams = null
          }
        }).catch(err=>{
          console.log(err)
        })
      },

      // 获取访客分析数据
      getvisitor(url) {
        const that = this;
        const loading = this.$loading({
          lock: true,
          text: '努力加载中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.1)'
        });

        that.$axios.get(url).then(res => {
          loading.close();
          console.log(res.data.results)
          if (res.data.results.code == 0) {
            for (let i in res.data.results.data) {
              res.data.results.data[i].id = Number(i) + 1;
            }
            that.tableData = res.data.results.data;
            let arr = [];//存储表格头数据
            let arr2 = [];//存储tags筛选数据
            for (let i in res.data.results.data[0]) {
              let obj = {};
              let tag = {}
              if (i == 'id') {
                obj.label = '序号';
                obj.prop = 'id';
                obj.type = 'normal';

                tag.type = 'info';
                tag.label = '序号';
                tag.ischoosed = true

                arr.push(obj);
                arr2.push(tag)
              } else if (i != 'create_date' && i != 'filetabinfo' && i != 'last_date') {
                obj.label = i;
                obj.prop = i;
                obj.type = 'normal';

                tag.type = 'info';
                tag.label = i;
                tag.ischoosed = true

                arr.push(obj);
                arr2.push(tag)
              }

            }

            // 再次进行改造
            for (let i in res.data.results.thead) {
              if (i != 0 ) {
                arr[i].label = res.data.results.thead[i];
                arr2[i].label = res.data.results.thead[i]
              }
            }
            that.count = res.data.count;
            that.nextPage=res.data.next;
            that.prevPage=res.data.previous;
            that.tableArr = arr;
            that.arr = arr;
            that.tags = arr2;
            console.log(that.tags)
            this.$forceUpdate();
            // that.sorts = 'uv'//可调节排序的字段
          } else {
            this.$message(res.data.msg);
            that.tableData = that.tableData
            this.$forceUpdate();
          }
        }).catch(res => {
          loading.close();
        })
      },

      // 获取侧边栏数据
      getSideBar(){
        this.tableData = [];
        this.tableArr = [];
        this.arr = [];
        this.tags = [];
        this.sideModelParams={};
        this.$forceUpdate();
        this.$axios.get("/api/v1/leftcol/").then(res=>{
          if(res.data.code==0){
            if(res.data.data){
              this.sideData = res.data.data;
              if(this.sideData.length<=0) return
              // 编辑面包屑
              let sideItem =  this.sideData[0].name||'',
                sideSubItem = this.sideData[0].fields[0].name||'',
                sideLastItem = this.sideData[0].fields[0].fields[0].name||'',
                curpath = new Array(sideItem,sideSubItem,sideLastItem);
              this.curpath = curpath

              this.sideOpt = this.sideData[0].fields[0].fields[0].id||'';
              this.sideModelName=this.sideData[0].fields[0].fields[0].name||'';

              let url = this.sideData[0].fields[0].fields[0].url||'';
              let param = {
                id : this.sideOpt
              }
              this.getParam(url,param)
            }

          }else{
            this.$message.error('获取侧边栏数据失败')
            this.sideData = []
          }
        }).catch(err=>{
          this.$message.error('获取侧边栏数据失败')
          this.sideData = []
          console.log(err,'侧边栏err')
        })
      },


    },

    created() {
      console.log(this.$local.get('userInfo'))
      if(!this.$local.get('userInfo')){
        this.$message('登录已过期或者未登录，请重新登录');
        setTimeout(()=>{
          let data = {
            url:'/home'
          }
          this.$router.push({path:'/Login',query:data})
        },500)
      }

      // 获取侧边栏数据
      this.getSideBar();

    },

    mounted: function () {
      let that = this;
      //原生获取屏幕高度
      let orderHight = document.body.clientHeight
      console.log(orderHight)
      that.orderHight = orderHight - 350
      // document.getElementById('order-list').style.height = orderHight + 'px'
    },

    // 离开页面时
    // beforeRouteLeave(to,from,next){
    //   console.log(to,'to')
    //   if(to.path=='/Login'){
    //     next(false)
    //   }else{
    //     next()
    //   }
    // },


  }
</script>

<style scoped>
  @import 'Home.css';
</style>

