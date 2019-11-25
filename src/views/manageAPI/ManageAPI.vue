<template>
  <div class="mainHolder">
    <div class="textHolder padding">
      <el-row :gutter="20" class="flex flex-direction align-center justify-start"
              style="width: 100%;z-index: 5;min-height: 50vh">
        <div class="extra-large padding-bottom-sm text-blod" style="width: 100%">二级API</div>
        <el-col :span="24">
          <el-table
              size="mini"
              :data="master_user.data1"
              border
              style="width: 100%;margin:auto"
              highlight-current-row
          >
            <el-table-column type="index"></el-table-column>
            <el-table-column
                v-for="(item,index) in master_user.columns1"
                :label="item.label"
                :prop="item.prop"
                :width="item.width"
                :key="index"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.isSet">
                  <el-input size="mini" placeholder="请输入内容" v-model="master_user.sel[item.prop]"
                            v-if="item.prop!='upper_name'"></el-input>
                </span>
                <span v-else>{{scope.row[item.prop]}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="300">
              <template slot-scope="scope">
                <el-button
                    class="Insert_Cold"
                    style="cursor: pointer;"
                    @click.stop="saveRow(scope.row,scope.$index)"
                    type="success" round
                    round
                    size="small"
                    v-if="scope.row.isSet"
                >保存
                </el-button>
                <el-button
                    class="Edit_Cold"
                    style="cursor: pointer;"
                    @click="editRow(scope.row,scope.$index)"
                    type="primary" round
                    round
                    size="small"
                    icon="el-icon-edit"
                >编辑
                </el-button>
                <el-button
                    class="Delete_Cold"
                    style="cursor: pointer;"
                    @click="deleteRow(scope.$index,master_user.data)"
                    type="danger"
                    round
                    size="small"
                    icon="el-icon-delete"
                >删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <div class="flex justify-end padding-sm" style="width: 99.2%;">
          <el-button type="success" round @click="add('no2')"><i class="el-icon-add-location"></i> 添加</el-button>
        </div>
      </el-row>


      <el-row :gutter="20" class="flex flex-direction align-center justify-start"
              style="width: 100%;z-index: 5;min-height: 100vh">
        <div class="extra-large padding-bottom-sm text-blod" style="width: 100%">三级API</div>
        <el-col :span="24">
          <el-table
              size="mini"
              :data="master_user.data2"
              border
              style="width: 100%;margin:auto"
              highlight-current-row
          >
            <el-table-column type="index" width="50" label="#"></el-table-column>
            <el-table-column
                v-for="(item,index) in master_user.columns1"
                :label="item.label"
                :prop="item.prop"
                :width="item.width"
                :key="index"
            >
              <template slot-scope="scope">
                <el-dropdown size="mini" split-button type="primary" v-if="scope.row.isSet" @command="handleCommand">
                  选择上传模块
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="index">黄金糕</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
                <span v-if="scope.row.isSet">
                  <el-input size="mini" placeholder="请输入内容" v-model="master_user.sel[item.prop]"
                            v-if="item.prop!='upper_name'"></el-input>
                </span>
                <span v-else>{{scope.row[item.prop]}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="300">
              <template slot-scope="scope">
                <el-button
                    class="Insert_Cold"
                    style="cursor: pointer;"
                    @click.stop="saveRow(scope.row,'no3')"
                    type="success"
                    round
                    size="small"
                    v-if="scope.row.isSet"
                >保存
                </el-button>
                <el-button
                    class="Edit_Cold"
                    style="cursor: pointer;"
                    @click="editRow(scope.row,'no3')"
                    type="primary"
                    round
                    size="small"
                    icon="el-icon-edit"
                >编辑
                </el-button>
                <el-button
                    class="Delete_Cold"
                    style="cursor: pointer;"
                    @click="deleteRow(scope.$index,master_user.data)"
                    type="danger"
                    round
                    size="small"
                    icon="el-icon-delete"
                >删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <div class="flex justify-end padding-sm" style="width: 99.2%;">
          <el-button type="success" round @click="add('no3')"><i class="el-icon-add-location"></i> 添加</el-button>
        </div>
      </el-row>
    </div>


  </div>
</template>

<script>
  export default {
    name: "ManageAPI",
    data() {
      return {
        master_user: {
          sel: null, //选中行
          columns1: [
            {
              prop: "upper_name",
              label: "所属模块",

            },
            {
              prop: "name",
              label: "接口名",

            },
            {
              prop: "api_url",
              label: "接口地址"
            },

          ],
          data0: [],//一级接口
          data1: [],//二级接口
          data2: [],//三级接口
        },
        selList:[]
      }
    },
    methods: {
      //获取三级API
      getThreeGradeApi() {
        let that = this;
        that.$axios.get('/api/v1/three/').then(res => {
          if (res.data.code == 0) {
            res.data.data.navList.forEach(item => {
              item.isSet = false
            })
            this.master_user.data2 = res.data.data.navList
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },

      //基本输入列表
      add(e) {
        console.log(e)
        if (e == 'no2') {
          var data = this.master_user.data1

        } else if (e == 'no3') {
          var data = this.master_user.data2

        }
        for (let i of data) {
          if (i.isSet) return this.$message.error("请先保存当前编辑项");
        }
        let j = {
          upper_name: "",
          name: "",
          api_url: "",
          isSet: true
        };
        data.push(j);
        this.master_user.sel = JSON.parse(JSON.stringify(j));
      },

      // 保存
      saveRow(row, index) {
        console.log(row)
        //保存
        let data = JSON.parse(JSON.stringify(this.master_user.sel));
        for (let k in data) {
          row[k] = data[k];
        }
        row.isSet = false;
      }
      ,
      editRow(row) {
        //编辑
        for (let i of this.master_user.data) {
          if (i.isSet) return this.$message.error("请先保存当前编辑项");
        }
        this.master_user.sel = row;
        row.isSet = true;
      }
      ,
      deleteRow(index, rows) {
        //删除
        rows.splice(index, 1);
      },

      // 选择上传模块
      handleCommand(command){
        console.log(command)
      }

    },
    created() {
      this.getThreeGradeApi()
    }
  }
</script>

<style scoped>
  * {
    box-sizing: border-box;
  }

  .mainHolder {
    width: 100%;
    height: 100vh;
    background-image: url('../../assets/bg.jpg');
    background-attachment: fixed;
    background-position: center;
    background-size: cover;
    position: relative;
  }

  .textHolder {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: inherit;
    overflow: hidden;
  }

  .textHolder::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: inherit;
    background-attachment: fixed;
    filter: blur(4px);
  }

  .textHolder::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.25);
  }

</style>