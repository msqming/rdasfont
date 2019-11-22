<template>
  <div class="mainHolder">
    <div class="textHolder padding">
      <el-row :gutter="20" class="flex flex-direction align-center justify-start" style="width: 100%;z-index: 5;min-height: 100vh">
        <div class="extra-large padding-bottom-sm text-blod" style="width: 100%">二级API</div>
        <el-col :span="24">
          <el-table
              size="mini"
              :data="master_user.data"
              border
              style="width: 100%;margin:auto"
              highlight-current-row
          >
            <el-table-column type="index"></el-table-column>
            <el-table-column
                v-for="(item,index) in master_user.columns"
                :label="item.label"
                :prop="item.prop"
                :width="item.width"
                :key="index"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.isSet">
                  <el-input size="mini" placeholder="请输入内容" v-model="master_user.sel[item.prop]"></el-input>
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
                >保存</el-button>
                <el-button
                    class="Edit_Cold"
                    style="cursor: pointer;"
                    @click="editRow(scope.row,scope.$index)"
                    type="primary" round
                    round
                    size="small"
                    icon="el-icon-edit"
                >编辑</el-button>
                <el-button
                    class="Delete_Cold"
                    style="cursor: pointer;"
                    @click="deleteRow(scope.$index,master_user.data)"
                    type="danger"
                    round
                    size="small"
                    icon="el-icon-delete"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <div class="flex justify-end padding-sm" style="width: 99.2%;" >
          <el-button type="success" round @click="add()"><i class="el-icon-add-location"></i> 添加</el-button>
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
          columns: [

            {
              prop: "OutdoorTDB",
              label: "所属层级",

            },
            {
              prop: "IndoorTDB",
              label: "接口名"
            },

          ],
          data: []
        }
      }
    },
    methods:{
      //基本输入列表
      add()
      {
        for (let i of this.master_user.data) {
          if (i.isSet) return this.$message.error("请先保存当前编辑项");
        }
        let j = {
          index: "",
          OutdoorTDB: "",
          IndoorTDB: "",
          isSet: true
        };
        this.master_user.data.push(j);
        this.master_user.sel = JSON.parse(JSON.stringify(j));
      }
      ,
      saveRow(row, index)
      {
        //保存
        let data = JSON.parse(JSON.stringify(this.master_user.sel));
        for (let k in data) {
          row[k] = data[k];
        }
        row.isSet = false;
      }
      ,
      editRow(row)
      {
        //编辑
        for (let i of this.master_user.data) {
          if (i.isSet) return this.$message.error("请先保存当前编辑项");
        }
        this.master_user.sel = row;
        row.isSet = true;
      }
      ,
      deleteRow(index, rows)
      {
        //删除
        rows.splice(index, 1);
      }

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
    top:0;
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
    top:0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.25);
  }

</style>