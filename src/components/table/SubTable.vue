<!--数据表格组件-->
<template>
  <!--              表格-->
  <el-table class="margin-top-sm" :data="tableData" style="width: 100%" max-height="400"
            ref="multipleTable"
            tooltip-effect="dark"
            :stripe="true"
            lazy
            border

  >
    <!--  可勾选-->
    <!--                <el-table-column-->
    <!--                  type="selection"-->
    <!--                  width="55">-->
    <!--                </el-table-column>-->
    <!--    arr为自定义表头数据-->
    <template v-for="(item,index) in arr">

      <el-table-column :prop="item.prop" :label="item.label" :key="index" :width="index==0?60:''"
                       v-if="item.type==='normal'" resizable
                       show-overflow-tooltip>

      </el-table-column>
      <el-table-column slot-scope="scope"></el-table-column>
    </template>
    <!--    <el-table-column-->
    <!--      fixed="right"-->
    <!--      label="操作"-->
    <!--      width="100">-->
    <!--      <template slot-scope="scope">-->
    <!--        <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>-->
    <!--        &lt;!&ndash;            <el-button type="text" size="small">编辑</el-button>&ndash;&gt;-->
    <!--      </template>-->
    <!--    </el-table-column>-->
  </el-table>
</template>

<script>
  export default {
    name: "subTable",
    data() {
      return {
        sortable: '',
      }
    },
    props: {
      tableData: {
        type: Array,
        default: []
      },
      arr: {
        type: Array,
        default: []
      },
      // sorts: {
      //   type: String,
      //   default: ''
      // }

    },


    mounted() {
      // 例子
      // console.log(this.sorts)
      // this.sorts = 'date';//决定控制列的排序

    }
  }
</script>

<style scoped>

</style>
