<template>
  <div>
    <el-container style="height: 100%; border: 1px solid #eee;overflow-y: auto">

      <el-header class=" bg-black" height="141px" style="padding-right: 0;">
        <div class="flex flex-sub justify-between bg-black">
          <div class="extra-large bg-black text-white text-blod text-center head-icon">数据分析系统
          </div>

          <div class="flex flex-sub justify-end header-right bg-black">
            <div class="flex align-center ">
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
                <span class="text-cut margin-lr-xs text-white">用户名啊啊啊啊</span>
              </div>

              <span class="exit padding-right text-white" onselectstart="return false;" unselectable="on">退出登录</span>
            </div>
          </div>
        </div>
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
          <el-aside width="300px" class="sidebar" :style="{'height':'85%','background-color':' #F2F6FC'}">
            <div class="padding-xs padding-top-sm padding-bottom-sm sidebar-item" v-for="(items,index) in 10"
                 :key="index">
              <div class="sidebar-item-title large margin-bottom-sm">标题头 <i
                class="el-icon-arrow-right margin-left-xs large"></i>
              </div>

              <div class="flex sidebar-item-son">
                <div class="flex-sub text-cut padding-lr-xs text-center" v-for="(item,index) in 3" :key="index"><a
                  href="#"
                  class="sidebar-item-son-item pointer">子节点</a>
                </div>
              </div>

              <div class="sub-menu-box" :style="{'height':orderHight+'px'}">
                <div class="sub-menu">
                  <div class="large text-blod sub-menu-title margin-bottom-sm">標題頭</div>
                  <div class="flex flex-wrap base sub-menu-list">
                    <div class="margin-bottom-sm sub-menu-item" style="width: 50%" v-for="(item,index) in 6"
                         :key="index">
                      123132
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </el-aside>
          <el-main :style="{'height':'96%'}">

            <!--          模块头部-->
            <div class="idx-header ">
              <el-card>
                <div class="flex align-center justify-between">
                  <div class="extra-large text-blod">访客分析</div>

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
                    <div class="extra-large">{{navlist[navIndex].name}}</div>
                    <!--                    <div class="flex-sub flex margin-top">-->
                    <!--                      <el-radio-group v-model="radio2" @change="changeRadio">-->
                    <!--                        <el-radio v-for="(item,index) in 3" :key="index" :label="index">选项</el-radio>-->

                    <!--                      </el-radio-group>-->
                    <!--                    </div>-->
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


                <!--              数据表格-->
                <subTable :tableData="tableData" :arr="arr" :sorts="sorts"></subTable>

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

        <el-table-column property="address" label=""></el-table-column>
      </el-table>
    </el-dialog>

    <!--    上传弹窗-->
    <transition name="el-fade-in-linear">
      <div class="up-dialog" v-if="isShowLoadBox">
        <div class="up-dialogBox bg-white padding-sm text-black">
          <!--        关闭按钮-->
          <div class="text-right">
            <i class="el-icon-close text-blod large " @click="closeDialog()"></i>
          </div>

          <!--        主体内容-->
          <!--          上传列表-->
          <div class="upLoadList flex flex-direction-reverse ">

            <div class="flex justify-center margin-top-sm">
              <div class="pointer el-button--small bg-cyan  margin-left-sm" @click="submitclick">点击上传
              </div>
              <el-button size="small" class="el-button--small bg-red margin-left-sm" @click="closeUpload">取消
              </el-button>
            </div>

            <el-upload
              class="upload-demo flex flex-direction-reverse up-file"
              ref="upload"
              action="baidu.com"
              accept='.xls,.xlsx'
              :show-file-list="true"
              :on-preview="handlePreview"
              :on-success="uploadFileSuccess"
              :on-remove="handleRemove"
              :auto-upload="false"
              multiple
              :limit="10"
              :on-exceed="handleExceed"
              :on-change="filechange"
              :file-list="fileList"
              :http-request="submitFile"
            >

              <div slot="tip" class="el-upload__tip margin-top-sm">点击选择文件即可上传</div>
              <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
            </el-upload>

            <div class="text-center extra-large padding-xl" v-if="fileList.length<=0">空空如也，请先添加文件吧</div>

          </div>
        </div>
      </div>
    </transition>

    <!--    缩小上传弹窗-->
    <div class="uploadSmall bg-cyan "
         :class="uploadShow?'animate-small':''"
         @click="showUpload()">
      <div class="flex align-center justify-center" style="height: 100%"><span>{{uploadNum==fileList.length?'已完成':'上传中'}}</span>
      </div>
    </div>

    <!--    管理弹窗-->
    <el-dialog title="管理" :visible.sync="manageModel">
      <el-table :data="manageList" style="width: 92%" max-height="400" ref="multipleTable" tooltip-effect="dark" border>
        <!--  可勾选-->
        <!--        <el-table-column-->
        <!--          type="selection"-->
        <!--          width="55">-->
        <!--        </el-table-column>-->
        <!--        <template v-for="(item,index) in arr">-->

        <!--          <el-table-column :prop="item.prop" :label="item.label" :key="index" width=""-->
        <!--                           v-if="item.type==='normal'">-->

        <!--          </el-table-column>-->
        <!--          <el-table-column slot-scope="scope"></el-table-column>-->
        <!--        </template>-->
        <el-table-column prop="file_name" label="文件名"></el-table-column>
        <el-table-column prop="create_date" label="上传日期"></el-table-column>
        <el-table-column prop="user" label="上传人"></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click.native.prevent="deleteRow(scope.$index, manageList)" type="text" size="small">删除
            </el-button>
            <!--            <el-button type="text" size="small">编辑</el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
    import {parseTime} from "../../common/utils/setMethods.js";
    import {json2excel} from "../../common/utils/setMethods.js";
    import subTable from '../../components/table/SubTable';

    export default {
        name: "visitor",
        components: {
            subTable
        },
        data() {

            const list = [{
                name: '时段分布',
                id: 1
            }, {
                name: '地域分布',
                id: 2
            }]
            return {
                manageList: [],//管理列表数据
                uploadNum: 0,//已上传文件个数
                tableData: [],
                orderHight: 1000,
                activeIndex2: '1',//控制nav高亮
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
                arr: [],//自定义表格头
                sortrow: {prop: 'date', order: 'descending'},//表头是否排序
                currentPage: 1,//表格当前页码
                store: [{id: 0, name: '全部'}, {id: 1, name: '天猫'}, {id: 2, name: '淘宝'}],
                storeIndex: 0,//选中的店铺来源index
                storeIndex1: 0,
                isShowLoadBox: false,//打开上传弹窗
                isuploading: false,//是否正在上传
                uploadShow: '',//控制上传中的弹窗
                fileList: [],
                showmore: false,//查看更多标签
                opts: ['笔记本电脑', '键盘', '无线鼠标', '有线鼠标', '台式整机', '家用一体机', '显示器', '普通U盘', '其他'],//子类筛选
                curIdx: 0,//当前选中
                isShowAll: false,//是否查看更多
                radio2: 2,
                sorts: '',//决定表格排序的字段
                navIndex: 0,//子导航选中的值

            }
        },
        methods: {
            errorHandler() {
                return true
            },

            // 点击管理
            toggleManage() {
                this.manageModel = true;

                const loading = this.$loading({
                    lock: true,
                    text: '努力加载中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.1)'
                });
                let data = {
                    // today: 2019 - 11 - 12,
                    user: 'root'
                }
                this.$axios.post('/api/v1/uploadlog/', data).then(res => {
                    loading.close()
                    console.log(res)
                    if (res.status == 200) {
                        this.manageList = res.data.data
                    }
                }).catch(res => {
                    loading.close()
                })
            },

            // 删除管理数据
            deleteRow(idx, rows) {
                console.log(idx, rows)
                let tabId;
                this.manageList.forEach((item, index) => {
                    if (index == idx) {
                        tabId = item.id
                    }
                })
                console.log(tabId)
                let pram = {tabId: tabId}
                this.$axios.delete('/api/v1/uploadlog/', {data: pram}).then(res => {
                    if (res.status == 200) {
                        rows.splice(idx, 1);
                    } else {
                        this.$message.error(`操作失败,错误代码为：${res.msg}`);
                    }
                }).catch(res => {
                    console.log(res)
                })
            },

            // 导航栏选择
            handleSelect(key, keyPath) {
                console.log(key, keyPath);

            },

            // 子导航选择
            selectSub(key, keyPath) {
                console.log(key, keyPath);
                this.navIndex = Number(key - 1)
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
            },
            // 关闭上传弹窗
            closeUpload() {
                this.$refs.upload.abort()
                this.isShowLoadBox = false;
                this.fileList = [];
                this.uploadNum = 0
            },
            // 缩小上传弹窗
            closeDialog() {
                if (this.fileList.length > 0) {
                    if (this.uploadNum == this.fileList.length) {
                        this.isShowLoadBox = false;
                        this.fileList = [];
                        this.uploadNum = 0
                    } else {
                        this.isShowLoadBox = false;
                        this.uploadShow = true;
                    }
                } else {
                    this.isShowLoadBox = false;
                    this.fileList = [];
                    this.uploadNum = 0
                }

                // this.isuploading = true;

            },
            //放大上传弹窗
            showUpload() {
                this.uploadShow = false;
                this.isShowLoadBox = true;
            },

            // 上传文件状态监听
            filechange(files, fileList) {
                console.log(fileList)
                this.fileList = fileList
            },

            // 删除文件
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            // 文件超出限制
            handleExceed(file, fileList) {
                console.log(file, fileList);
            },

            // 点击查看更多
            showAll() {
                this.isShowAll = !this.isShowAll;
            },

            //点击返回选中的单选值
            changeRadio(e) {
                console.log(e)
            },

            // 自定义上传资料
            submitFile(data) {
                var i = 0;
                i++
                console.log(i)
                let params = new FormData(); //创建form对象
                params.append('file', data.file);//通过append向form对象添加数据
                params.append('fileType', data.file.type);//通过append向form对象添加数据
                // params.append('fileSize', data.file.size);//通过append向form对象添加数据
                params.append('fileName', data.file.name);//添加form表单中其他数据
                params.append('platform', '天猫');//添加form表单中其他数据
                params.append('shop', '惠普儒韵官旗店');//添加form表单中其他数据
                params.append('user', 'admin');//添加form表单中其他数据
                let config = {
                    headers: {'Content-Type': 'multipart/form-data'},
                    onUploadProgress: progressEvent => {
                        console.log(progressEvent, 'progressEvent')
                        let percent = (progressEvent.loaded / progressEvent.total * 100) || 0
                        //调用onProgress方法来显示进度条，需要传递个对象 percent为进度值
                        data.onProgress({percent: percent})
                    },
                };  //添加请求头
                this.$axios.post('/storage/flow/', params, config)//上传文件
                    .then(response => {
                        if (response.status == 200) {
                            data.onSuccess(response.data)
                            this.uploadNum++;
                            // 判断是否全部上传完
                            if (this.uploadNum == this.fileList.length) {
                                this.$message({
                                    showClose: true,
                                    message: '文件已上传完成',
                                    type: 'success'
                                });
                            }
                        }else{
                            this.$message.error(`文件上传失败，错误码为：${response.status}`);
                        }
                    })
                    .catch(({err}) => {
                        data.onError()
                        this.uploadNum++;
                        if (this.uploadNum == this.fileList.length) {
                            this.$message({
                                showClose: true,
                                message: '文件已上传完成',
                                type: 'success'
                            });
                        }
                    })
            },
            // 点击上传
            submitclick() {
                console.log(this.fileList)
                if (this.fileList.length <= 0) {
                    this.$message({
                        showClose: true,
                        message: '请先选择需要上传的文件',
                        type: 'warning'
                    });
                    return
                }
                this.$refs.upload.submit();
            },
            // 上传成功监听
            uploadFileSuccess(file, fileList) {// 这里可以打印file查看数据结构
                if (file.response) {//判断是否上传成功
                    this.fileList.push({url: file.response.key, status: 'finished'})//上传成功之后把值添加到imglist中
                }
            },
            handleRemove(file, fileList) {// 这里可以打印filelist查看数据结构
                this.fileList = fileList//删除某项数据重新对filelist赋值
            },


            //点击下载事件
            handleDownload() {
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
  @import 'Visitor.css';
</style>

