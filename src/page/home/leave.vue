<template>
    <div class="fly-panel fly-panel-user">
        <div class="layui-tab layui-tab-brief" lay-filter="user">
            <ul class="layui-tab-title" id="LAY_mine" :class="{'layui-tab-more':!ismore}">
                <li data-type="mine-jie" lay-id="index" :class="{'layui-this':tab==0}" @click="tab=0;holiday()">{{ $t("home.myremi") }}（<span>{{mytotal}}</span>）
                </li>
                <li><router-link to="/addLeave">{{ $t("add.leave") }}</router-link></li>
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
                                            <div class="layui-table-cell laytable-cell-1-type"><span>{{ $t("home.username") }}</span></div>
                                        </th>
                                        <th data-field="starttime">
                                            <div class="layui-table-cell laytable-cell-1-starttime">
                                                <span>{{ $t("common.benginTime") }}</span></div>
                                        </th>
                                        <th data-field="endtime">
                                            <div class="layui-table-cell laytable-cell-1-endtime">
                                                <span>{{ $t("common.endTime") }}</span></div>
                                        </th>
                                        <th data-field="length">
                                            <div class="layui-table-cell laytable-cell-1-length"><span>{{ $t("add.leaveLength") }}</span></div>
                                        </th>
                                        <th data-field="status">
                                            <div class="layui-table-cell laytable-cell-1-status"><span>{{ $t("add.auditorState") }}</span></div>
                                        </th>
                                        <th data-field="person">
                                            <div class="layui-table-cell laytable-cell-1-person"><span>{{ $t("add.auditor") }}</span></div>
                                        </th>
                                        <th data-field="operate">
                                            <div class="layui-table-cell laytable-cell-1-operate"><span>{{ $t("common.operation") }}</span></div>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(item,index) in holidayDate">
                                        <td data-field="type">
                                            <div class="layui-table-cell laytable-cell-1-type"><a
                                                href="javascript:;"
                                                class="layui-table-link" v-html="item.myname" ></a></div>
                                        </td>
                                        <td data-field="starttime">
                                            <div class="layui-table-cell laytable-cell-1-starttime">{{item.startdate}}{{item.stime}}</div>
                                        </td>
                                        <td data-field="endtime">
                                            <div class="layui-table-cell laytable-cell-1-endtime">{{item.enddate}}{{item.etime}}</div>
                                        </td>
                                        <td data-field="length">
                                            <div class="layui-table-cell laytable-cell-1-length">{{item.days}}{{ $t("common.day") }}</div>
                                        </td>
                                        <td data-field="status">
                                            <div class="layui-table-cell laytable-cell-1-status">{{item.status}}</div>
                                        </td>
                                        <td data-field="person" >
                                            <div class="layui-table-cell laytable-cell-1-person">{{item.exname}}</div>
                                        </td>
                                        <td data-field="operate" >
                                            <div class="layui-table-cell laytable-cell-1-person"><a
                                                class="layui-btn layui-btn-sm" href="javascript:;"
                                                @click="holidayEvent(item.id)">{{ $t("common.detail") }}</a></div>
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
//           我的请假
            holiday(){
                var me=this;
                me.$axios.post(me.url+"/rest/myRest?page=" + this.pageNum + "&size=" + this.pageSize)
                    .then(function (result) {
                          me.holidayDate=result.data.list;
                          me.mytotal=result.data.total;
                          me.holidayDate.forEach(function(index){
                            if(index.status==0){
                             index.status=me.$t("add.aud1")
                            }
                            if(index.status==1){
                                index.status=me.$t("add.aud2")
                            }
                            if(index.status==2){
                                index.status=me.$t("add.aud3")
                            }
                              if(index.stime==0){
                                  index.stime=me.$t("common.morning")
                              }
                              if(index.stime==1){
                                  index.stime=me.$t("common.afternoon")
                              }
                              if(index.etime==0){
                                  index.etime=me.$t("common.morning")
                              }
                              if(index.etime==1){
                                  index.etime=me.$t("common.afternoon")
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
                    path: `/leaveDetails/${id}`
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
      width:190px;
  }
  .laytable-cell-1-length{
      width:100px;
  }
    .laytable-cell-1-person{
        width:130px;
    }
</style>
