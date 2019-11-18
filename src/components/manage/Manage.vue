<!--管理弹窗组件-->
<template>
  <el-dialog title="管理" :visible.sync="toggleModel" @close="close">
    <el-table :data="manageList" style="width: 92%" max-height="400" ref="multipleTable" tooltip-effect="dark" border>
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
</template>

<script>
  export default {
    name: "Manage",
    props: ['manageModel'],
    data() {
      console.log(this.manageModel)

      return {
        manageList: [],
        toggleModel: this.manageModel
      }
    },
    created() {
      this.getManageData()
    },
    methods: {
      // 关闭弹窗
      close() {
        this.$emit('changeManageModel', this.toggleModel = false)//传递给父组件
      },

      // 获取管理数据
      getManageData() {
        const loading = this.$loading({
          lock: true,
          text: '努力加载中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.1)'
        });
        let data = {
          // today: 2019 - 11 - 12,
          user: 'admin'
        }
        this.$axios.post('/api/v1/uploadlog/', data).then(res => {
          loading.close()
          console.log(res)
          if (res.data.code == 0) {
            this.manageList = res.data.data
          }else {
            this.$message.error(`${res.data.msg}`);
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
          if (res.data.code == 0) {
            rows.splice(idx, 1);
          } else {
            this.$message.error(`操作失败${res.data.msg}`);
          }
        }).catch(res => {
          console.log(res)
        })
      },
    },
    watch: {
      manageModel(newVal) {
        if (newVal == true) {
          this.getManageData()
        }
        this.toggleModel = newVal
        return newVal
      }
    }
  }
</script>

<style scoped>

</style>
