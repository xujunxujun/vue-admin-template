<template>
  <div class="job-container">
    <div style="display:inline-block;">
      <label class="radio-label" style="padding-left:0;">职务编码:</label>
      <el-input v-model="getdata.coding" class="job-input" placeholder="请输入职务编码" style="width:200px;" />
    </div>
    <div style="display:inline-block;">
      <label class="radio-label" style="padding-left:0;">职务名称:</label>
      <el-input v-model="getdata.name" class="job-input" placeholder="请输入职务名称" style="width:200px;" />
    </div>
    <br v-if="device==='mobile'">
    <el-button :loading="selectLoading" style="margin:0 10px;" type="primary" icon="el-icon-search" @click="handlefind">
      查询
    </el-button>
    <el-button :loading="reLoading" style="margin:0 10px;" type="primary" icon="el-icon-refresh-right" @click="reLoading_way">
      重置
    </el-button>
    <el-button :loading="reLoading" style="margin:0 10px;" type="primary" icon="el-icon-plus" @click="handleAdd">
      添加
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

            <span v-html="leveldata(scope,scope.row.level)" />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <br v-if="device==='mobile'">
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
      <el-dialog :title="dialogtitle" :visible.sync="dialogFormVisible" width="30%" :fullscreen="device==='mobile'">
        <el-form ref="jobForm" :rules="rules" :model="chosedata">
          <el-form-item label="职务编码" prop="coding">
            <el-input v-model="chosedata.coding" />
          </el-form-item>
          <el-form-item label="职务名称" prop="name">
            <el-input v-model="chosedata.name" />
          </el-form-item>
          <el-form-item label="职级" prop="level">
            <el-select v-model="chosedata.level" class="filter-item" placeholder="请选择职务等级">
              <el-option v-for="item in joblevel" :key="item.key" :label="item.display_name" :value="item.key" />
            </el-select>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">
            取消
          </el-button>
          <el-button type="primary" @click=" dialogtitle==='添加'?createData():updateData()">
            确认
          </el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { JobApi } from '@/api/xapi'
export default {
  name: 'Job',
  data() {
    return {

      selectLoading: false,
      reLoading: false,
      listLoading: false,
      list: [],
      currentPage: 1,
      pageSize: 10,
      getdata: {
        dotype: 1003,
        data: [],
        coding: '',
        name: ''

      },
      joblevel: [
        { key: 0, display_name: '访客' },
        { key: 1, display_name: '员级' },
        { key: 2, display_name: '助级' },
        { key: 3, display_name: '中级' },
        { key: 4, display_name: '副高级' },
        { key: 5, display_name: '正高级' }
      ],
      rules: {
        level: [{ required: true, message: '请选择职务等级', trigger: 'change' }],
        coding: [{ required: true, message: '请输入职务编码', trigger: 'blur' }],
        name: [{ required: true, message: '请输入职务名称', trigger: 'blur' }]
      },
      dialogFormVisible: false,
      dialogtitle: '添加',
      chosedata: {
        id: '',
        coding: '',
        name: '',
        level: ''

      }

    }
  },
  computed: {
    ...mapGetters([

      'name'
    ]),
    device() {
      return this.$store.state.app.device
    }
  },
  watch: {

  },
  created() {
    //  加载数据
    this.fetchData()
  },

  methods: {

    // 创建数据
    createData() {
      this.getdata.data = []
      this.$refs['jobForm'].validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
          this.getdata.dotype = 1001
          this.getdata.data.push(this.chosedata)

          JobApi(this.getdata).then(response => {
            this.list = this.list.concat(response.data)

            this.$notify({

              message: '添加成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    // 更新数据
    updateData() {
      this.getdata.data = []
      this.$refs['jobForm'].validate((valid) => {
        if (valid) {
          this.getdata.dotype = 1002
          this.getdata.data.push(this.chosedata)
          const temp_this = this

          JobApi(this.getdata).then(response => {
            response.data.forEach(function(v, i) {
              temp_this.list.forEach(function(o, j) {
                if (v.id === o.id) {
                  o = v
                  return
                }
              })
            })

            this.dialogFormVisible = false
            this.$notify({

              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },

    // 格式化数据
    leveldata(row, column) {
      return this.joblevel[column].display_name
    },
    // 筛选
    handlefind() {
      this.getdata.dotype = 1005
      this.fetchData()
    },
    // 重置筛选
    reLoading_way() {
      this.reLoading = true
      this.getdata.coding = ''
      this.getdata.name = ''
      this.getdata.dotype = 1003
      this.reLoading = false
      this.fetchData()
    }, fetchData() {
      this.listLoading = true

      JobApi(this.getdata).then(response => {
        this.list = response.data
        this.listLoading = false
        if (this.device === 'mobile') { this.pageSize = 5 }
      })
    }, // 编辑
    handleEdit(index, row) {
      this.dialogtitle = '修改'
      this.dialogFormVisible = true
      this.chosedata = row
    },
    // 删除
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.getdata.data = []

        this.getdata.dotype = 1004
        this.getdata.data.push(row)
        const temp_this = this

        JobApi(this.getdata).then(response => {
          response.data.forEach(function(v, i) {
            temp_this.list.forEach(function(o, j) {
              if (v.id === o.id) {
                temp_this.list.splice(j, 1)
                temp_this.$notify({

                  message: '删除成功',
                  type: 'success',
                  duration: 2000
                })
                return
              }
            })
          })
        })
      }).catch(() => {
        this.$notify({

          type: 'info',
          message: '已取消删除',
          duration: 2000
        })
      })
    },
    // 新增
    handleAdd() {
      this.chosedata = {
        id: '',
        coding: '',
        name: '',
        level: ''

      }
      this.dialogtitle = '添加'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['jobForm'].clearValidate()
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
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
