<template>
    <div class="fly-panel fly-panel-user">
        <div class="layui-tab layui-tab-brief" lay-filter="user">
            <ul class="layui-tab-title" id="LAY_mine" :class="{'layui-tab-more':!ismore}">
                <li data-type="mine-jie" lay-id="index" :class="{'layui-this':tab==0}" @click="tab=0;publishEvent()">我的分享（<span>{{mytotal}}</span>）</li>
                <!--<li><router-link to="/addHoliday">申请请假</router-link></li>-->
            </ul>
            <div class="layui-tab-content" style="padding: 20px 0;">
                <div class="layui-tab-item layui-show" v-if="tab==0">
                    <table id="demo" lay-filter="test"></table>
                    <div class="layui-form layui-border-box layui-table-view">
                        <div class="layui-table-box">
                            <div class="layui-table-header">
                                <table cellspacing="0" cellpadding="0" border="0" class="layui-table" lay-skin="line">
                                    <thead>
                                    <tr>
                                        <th data-field="type">
                                            <div class="layui-table-cell laytable-cell-1-type"><span>类型</span></div>
                                        </th>
                                        <th data-field="starttime">
                                            <div class="layui-table-cell laytable-cell-1-starttime">
                                                <span>分享时间</span></div>
                                        </th>
                                        <th data-field="endtime">
                                            <div class="layui-table-cell laytable-cell-1-endtime">
                                                <span>分享用户</span></div>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(item,index) in holidayDate">
                                        <td data-field="type">
                                            <div class="layui-table-cell laytable-cell-1-type"><a
                                                href="javascript:;"
                                                class="layui-table-link" v-html="item.type" @click="holidayEvent(item.id)"></a></div>
                                        </td>
                                        <td data-field="starttime">
                                            <div class="layui-table-cell laytable-cell-1-starttime">{{item.time}}</div>
                                        </td>
                                        <td data-field="endtime">
                                            <div class="layui-table-cell laytable-cell-1-endtime">{{item.username}}</div>
                                        </td>

                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="block" v-show="pageShow">
                            <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-sizes="[5,10,20,30]"
                                :page-size="pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="mytotal">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                url:this.GLOBAL.baseUrl,
                ismore: true,
                tab:0,
                holidayDate:'',
                mytotal:0,
                pageSize:10,
                pageNum:1,
                pageShow:true,
                currentPage: 1
            }
        },
        methods: {
            edit(id){
                this.$router.push({
                    path: `/edit/${id}`
                })
            },
            holiday(){
                var me=this;
                me.$axios.post(me.url+"/share/my?page=" + this.pageNum + "&size=" + this.pageSize)
                    .then(function (result) {
                        console.log(result)
                          me.holidayDate=result.data.list;
                          me.mytotal=result.data.total;
                          me.holidayDate.forEach(function(index){
                            if(index.status==0){
                             index.status='未审核'
                            }
                            if(index.status==1){
                                index.status='已通过'
                            }
                            if(index.status==2){
                                index.status='未通过'
                            }
                              if(index.stime==0){
                                  index.stime='上午'
                              }
                              if(index.stime==1){
                                  index.stime='下午'
                              }
                              if(index.etime==0){
                                  index.etime='上午'
                              }
                              if(index.etime==1){
                                  index.etime='下午'
                              }
                         })
                        if(me.mytotal<1){
                            me.pageShow=false
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            handleSizeChange(val) {
                this.pageSize=val
                this.holiday();
            },
            handleCurrentChange(val) {
                this.pageNum=val
                this.holiday();
            },
            holidayEvent(id){
                this.$router.push({
                    path: `/holidayDetails/${id}`
                })
            }
        },
        mounted(){
           this.holiday()
        },
    }
</script>
<style scoped>
    .layui-table-cell{
        text-align: center;
    }
    .layui-tab-title li {
        line-height: 40px;
    }
    .el-pagination__total {
        display: none !important;
    }

    .el-pagination__sizes {
        display: none !important;
    }

    .el-pagination {
        padding: 6px 5px;
        text-align: center;
    }

    @media screen and (min-width: 768px) {

        .el-pagination__total {
            display: inline-block !important;
        }
        .el-pagination__sizes {
            display: inline-block !important;
        }
        .el-pagination {
            text-align: left;
        }
    }
    .layui-table-box {
        overflow: auto !important;
    }

    .layui-table-header {
        border-width: 0 0 1px;
        overflow: auto !important;
    }
  .laytable-cell-1-starttime,.laytable-cell-1-endtime{
      width:300px;
  }
  .laytable-cell-1-length{
      width:100px;
  }
    .laytable-cell-1-person{
        width:130px;
    }
</style>
