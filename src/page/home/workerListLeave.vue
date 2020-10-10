<template>
    <div class="" style="padding-top: 5px;">
        <div class="layui-tab layui-tab-brief" lay-filter="user">
            <ul class="layui-tab-title">
                <li><router-link to="/holiday">我要请假</router-link></li>
                <li><router-link to="/outwork">申请外出</router-link></li>
                 <li class="layui-this">员工请假列表</li>
            </ul>
       <el-table
                    :data="data_list"
                    stripe
                    style="width: 100%;margin-top:20px"
                    header-align="center"
                >
                    <el-table-column
                        type="index"
                        label="ID"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="myname"
                        label="请假人"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                      <el-table-column
                        prop="startdate"
                        label="开始时间"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                         <el-table-column
                        prop="enddate"
                        label="结束时间"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                         <el-table-column
                        prop="type"
                        label="请假类型"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                        :formatter="typeFormat"
                    ></el-table-column>
                          <el-table-column
                        prop="days"
                        label="请假时长"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                          <el-table-column
                        prop="exname"
                        label="审核人"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                    
                    <el-table-column
                        prop="status"
                        label="请假状态"
                        width="120
                        px"
                        show-overflow-tooltip
                        align="center"
                    >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status==0" type="info">未审核</el-tag>
          <el-tag v-if="scope.row.status==1" type="success">审核通过</el-tag>
          <el-tag v-if="scope.row.status==2" type="danger">审核未通过</el-tag>
          <el-tag v-if="scope.row.status==3" type="warning">上级审核</el-tag>
        </template>
                    </el-table-column>
                    <el-table-column
                        prop="reason"
                        label="请假原因"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                    <el-table-column label="操作" align="center" fixed="right" width="100px">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="primary"
                                :disabled="scope.row.status==1||scope.row.status==2"
                                @click="audit(scope.$index, scope.row)"
                                >审核</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
                 <div class="block"  v-show="pageShow">
                                    <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="currentPage"
                                        :page-sizes="[5, 10, 15, 20]"
                                        :page-size="pageSize"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="mytotal">
                                    </el-pagination>
                  </div>
                <el-dialog
                        title="请假审核"
                        :visible.sync="dialogFormVisible"
                        class="dia"
                        width="20%"
                        :modal-append-to-body="false"
                    >
                        <el-form
                            :model="forms"
                            status-icon
                            :rules="rule"
                            ref="forms"
                            label-width="80px"
                            class="demo-ruleForm mars"
                        >
                           
                            <el-form-item label="审核状态" prop="status">
                               <el-radio-group v-model="forms.status">
                                            <el-radio  :label="1"  @click.native.prevent="clickitem(1)">通过</el-radio>
                                            <el-radio  :label="2"  @click.native.prevent="clickitem(2)">不通过</el-radio>
                               </el-radio-group>
                            </el-form-item>

                             <el-form-item label="上级领导" prop="z_exuid" v-if="days>=3&&reason==false&&leader==true" >
                                  <el-select v-model="forms.z_exuid" placeholder="请输入上级领导">
                                           <el-option
                                                v-for="item in optionsUser"
                                                :key="item.id"
                                                :label="item.username"
                                                :value="item.id">
                                            </el-option>
                                        </el-select>
                            </el-form-item>
                              <el-form-item label="理由" prop="message" v-if="reason" >
                                <el-input
                                    size="small"
                                    v-model.trim="forms.message"
                                ></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button
                                @click="dialogFormVisible = false"
                                
                            >
                                取消
                            </el-button>
                            <el-button
                                type="primary"
                                @click="submitForms('forms')"
                               
                                style="background-color: 1aa094"
                                >确定</el-button
                            >
                        </div>
                    </el-dialog>
          </div>       
  </div>
</template>
<script>
export default {
  data(){
    return{
       url:this.GLOBAL.baseUrl,
      data_list:[],
      optionsUser:[],
      page:'',
      size:'',
       pageShow:true,
      currentPage:1,
      mytotal:0,
      pageSize:10,
      pageNum:1,
      leader:true,
      dialogFormVisible:false,
      reason:false,
      forms:{
        id:'',
        status:1,
        z_exuid:'',
        message:'',
      },
      days:'',
      rule:{
        // status:[{required:true,message:'请选择审核状态',trigger:'blur'}],
        // z_exuid:[{required:true,message:'请输入上级领导',trigger:'blur'}],
        message:[{required:true,message:'请描述不通过原因',trigger:'blur'}],
      }
    }
  },
  created(){
    this.leavetype();
    this.viewList();
    this.getAuditor();
  },
  methods:{
   //审核的弹出框
    audit(index,row){
      this.forms.z_exuid='';
      this.forms.message='';
      // this.forms.status=1;
     this.forms.id=row.id;
     this.days=row.days
     this.dialogFormVisible=true
    },
    //获取请假审核人列表
    async getAuditor(){
      const result=await this.$axios.post(this.url+'/leave/auditor')
     this.optionsUser=result.data
     if(this.optionsUser.length==0){
        this.forms.z_exuid=0
        this.leader=false;
     }
    },
    //审核的具体操作
    submitForms(formName){
        this.$refs[formName].validate((valid) => {
                if (valid) {
        this.$axios.post(this.url+'/leave/audit',this.forms) 
        .then(res=>{
          if(res.data.result==true){
            this.dialogFormVisible=false
            this.viewList()
            this.$message.success("审核成功");
          }
          else {
              this.$message.error("审核失败");
          }
        })
        .catch(err=>{
          console.log(err)
        })
                }
        })
    },

     clickitem(val){
      
               this.forms.status=val
                if(val=='2'){
                  this.reason=true;
                }
                if(val=='1'){
                  this.reason=false;
                }
           },
     //员工请假列表接口
        async viewList(){
           let fordata = new FormData();
            fordata.append('page',this.pageNum)
            fordata.append('size',this.pageSize)
           const result= await this.$axios.post(this.url+'/leave/deptLeave',fordata)
          this.data_list=result.data.pojo.list
          this.mytotal=result.data.pojo.total
          if( this.mytotal<1||this.mytotal==undefined){
                            this.pageShow=false
                        }
         },
         //获取请假类型数据
        async  leavetype(){
                var me=this;
                const result= await me.$axios.post(me.url+"/leave/leaveType")
                 me.option=result.data
            },
            //请假类型的转换
            typeFormat(row,column){
             for(var i=0,l=this.option.length;i<l;i++){
              if(row.type==this.option[i].id){
              return this.option[i].type
              }
              }
            },

             handleSizeChange(val) {
                this.pageSize=val;
                this.viewList()
            },
            handleCurrentChange(val) {
                this.pageNum=val;
                this.viewList()
            }
  }
}
</script>
<style  scoped>
 /* /deep/ .el-dialog__headerbtn {
  font-size: 12px!important;
} */
.el-radio__inner{
  width: 10px!important;
  height: 10px!important;
}
</style>