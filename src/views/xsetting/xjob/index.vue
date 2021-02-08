<template>
  <div class="job-container">
    <div style="display:inline-block;">
      <label class="radio-label" style="padding-left:0;">职务编码:</label>
      <el-input v-model="selectnumber" class="job-input" placeholder="请输入职务编码" style="width:150px;" />
    </div>
    <div style="display:inline-block;">
      <label class="radio-label" style="padding-left:0;">职务名称:</label>
      <el-input v-model="selectname" class="job-input" placeholder="请输入职务名称" style="width:150px;" />
    </div>
    <el-button :loading="selectLoading" style="margin:0 20px;" type="primary" icon="el-icon-search" @click="handlefind">
      查询
    </el-button>
    <el-button :loading="reLoading" style="margin:0 20px;" type="primary" icon="el-icon-refresh-right" @click="reLoading_way">
      重置
    </el-button>
    <div class="job-table">
      <el-table
        v-loading="listLoading"
        :data="list.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column
          type="selection"
          width="40"
        />
        <el-table-column align="center" label="#" width="95">
          <template slot-scope="scope">
            {{ scope.$index }}
          </template>
        </el-table-column>
        <el-table-column label="职务编号" align="center">
          <template slot-scope="scope">
            {{ scope.row.coding }}
          </template>
        </el-table-column>
        <el-table-column label="职务名称" align="center">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column label="职务等级" align="center">
          <template slot-scope="scope">
            {{ scope.row.level }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        :current-page="currentPage"
        :page-sizes="[5,10,15]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="list.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />

    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { JobApi } from '@/api/table'
export default {
  name: 'Job',
  data() {
    return {
      selectnumber: '',
      selectname: '',
      selectLoading: false,
      reLoading: false,
      listLoading: false,
      list: [],
      currentPage: 1,
      pageSize: 10,
      getdata: {
        dotype: 1003

      }

    }
  },
  computed: {
    ...mapGetters([

      'name'
    ])
  },
  watch: {

  },
  created() {
    this.fetchData()
  },

  methods: {
    // 筛选
    handlefind() {

    },
    // 重置
    reLoading_way() {
      this.reLoading = true
      this.selectnumber = ''
      this.selectname = ''
      this.reLoading = false
    }, fetchData() {
      this.listLoading = true

      JobApi(this.getdata).then(response => {
        this.list = response.data
        this.listLoading = false
      })
    }, // 编辑
    handleEdit(index, row) {
      debugger
    },
    // 删除
    handleDelete(index, row) {

    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
    }

  }
}
</script>
<style lang="scss" scoped>
.job {
  &-container {
    margin: 10px;
  }
  &-input{
      margin-right: 10px;

  }
  &-table{
margin-top: 10px;

  }

}
.radio-label {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 30px;
}
</style>
