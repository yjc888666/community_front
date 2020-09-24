<template>
    <div class="fly-panel fly-panel-user">
        <div class="layui-tab layui-tab-brief" lay-filter="user">
            <ul class="layui-tab-title" id="LAY_mine" :class="{'layui-tab-more':!ismore}">
                <li data-type="mine-jie" lay-id="index" :class="{'layui-this':tab==0}" @click="tab=0;publishEvent()">{{ $t("home.info") }}</li>
                <li lay-id="collection" :class="{'layui-this':tab==1}" @click="tab=1;collectEvent()">{{ $t("home.sarary") }}</li>
                <span class="layui-unselect layui-tab-bar" lay-stope="tabmore" title="" style="display:none"
                      v-on:click="ismore=!ismore"><i lay-stope="tabmore" class="layui-icon"></i></span>
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
                                        <th data-field="title">
                                            <div class="layui-table-cell laytable-cell-1-time"><span>{{ $t("home.username") }}</span></div>
                                        </th>
                                        <th data-field="status">
                                            <div class="layui-table-cell laytable-cell-1-status">
                                                <span>{{ $t("add.status") }}</span></div>
                                        </th>
                                        <th data-field="time" style="text-align: center">
                                            <div class="layui-table-cell laytable-cell-1-time">
                                                <span>{{ $t("home.entrydate") }}</span></div>
                                        </th>
                                        <th data-field="time" style="text-align: center">
                                            <div class="layui-table-cell laytable-cell-1-time">
                                                <span>{{ $t("home.probationdate") }}</span></div>
                                        </th>
                                        <th data-field="time" style="text-align: center">
                                            <div class="layui-table-cell laytable-cell-1-time">
                                                <span>{{ $t("home.justdate") }}</span></div>
                                        </th>
                                        <th data-field="time" style="text-align: center">
                                            <div class="layui-table-cell laytable-cell-1-time">
                                                <span>{{ $t("register.groups") }}</span></div>
                                        </th>
                                        <th data-field="time" style="text-align: center">
                                            <div class="layui-table-cell laytable-cell-1-time">
                                                <span>{{ $t("home.sar") }}</span></div>
                                        </th>
                                        <th data-field="time" style="text-align: center">
                                            <div class="layui-table-cell laytable-cell-1-time">
                                                <span>{{ $t("home.remDay") }}</span></div>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td data-field="title">
                                            <div class="layui-table-cell"><a
                                                href="javascript:;"
                                                class="layui-table-link" v-html="topicDate.username"></a></div>
                                        </td>
                                        <td data-field="status" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-time">
                                                <span style="color: #999;">{{topicDate.status}}</span></div>
                                        </td>
                                        <td data-field="time" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-time">{{topicDate.entrydate}}</div>
                                        </td>
                                        <td data-field="time" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-time">{{topicDate.tryoutdate}}</div>
                                        </td>
                                        <td data-field="time" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-time">{{topicDate.justdate}}</div>
                                        </td>
                                        <td data-field="time" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-time">{{topicDate.title}}</div>
                                        </td>
                                        <td data-field="time" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-time">{{topicDate.salary}}</div>
                                        </td>
                                        <td data-field="time" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-time">{{topicDate.rest_days}}</div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="layui-tab-item layui-show"  v-if="tab==1">
                    <table id="myCollection" lay-filter="test11"></table>
                    <div class="layui-form layui-border-box layui-table-view"  style=" ">
                        <div class="layui-table-box">
                            <div class="layui-table-header">
                                <table cellspacing="0" cellpadding="0" border="0" class="layui-table" lay-skin="line">
                                    <thead>
                                    <tr>
                                        <th data-field="title" >
                                            <div class="layui-table-cell laytable-cell-1-title"><span>{{ $t("home.dates") }}</span></div>
                                        </th>
                                        <th data-field="title" >
                                            <div class="layui-table-cell laytable-cell-1-status"><span>{{ $t("home.username") }}</span></div>
                                        </th>
                                        <th data-field="title" >
                                            <div class="layui-table-cell laytable-cell-1-status"><span>{{ $t("home.wages") }}</span></div>
                                        </th>
                                        <th data-field="title" >
                                            <div class="layui-table-cell laytable-cell-1-status"><span>{{ $t("home.real") }}</span></div>
                                        </th>
                                        <th data-field="title" >
                                            <div class="layui-table-cell laytable-cell-1-status"><span>{{ $t("home.wagesday") }}</span></div>
                                        </th>
                                        <th data-field="title" >
                                            <div class="layui-table-cell laytable-cell-1-status"><span>{{ $t("home.realday") }}</span></div>
                                        </th>
                                        <th data-field="title" >
                                            <div class="layui-table-cell laytable-cell-1-status"><span>{{ $t("home.leave") }}</span></div>
                                        </th>
                                        <th data-field="title" >
                                            <div class="layui-table-cell laytable-cell-1-status"><span>{{ $t("home.kuang") }}</span></div>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr data-index="0" v-for="(item,index) in collectDate">
                                        <td data-field="title" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-title"><a
                                                href="javascript:;"  class="layui-table-link">{{item.year}}-{{item.month}}</a>
                                            </div>
                                        </td>
                                        <td data-field="status" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-status">
                                                <span style="color: #999;">{{item.username}}</span></div>
                                        </td>
                                        <td data-field="time" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-status">{{item.ought_salary}}{{ $t("common.yuan") }}</div>
                                        </td>
                                        <td data-field="time" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-status">{{item.practical_salary}}{{ $t("common.yuan") }}</div>
                                        </td>
                                        <td data-field="time" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-status">{{item.ought_number}}{{ $t("common.day") }}</div>
                                        </td>
                                        <td data-field="time" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-status">{{item.practical_number}}{{ $t("common.day") }}</div>
                                        </td>
                                        <td data-field="time" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-status">{{item.leave_days}}{{ $t("common.day") }}</div>
                                        </td>
                                        <td data-field="time" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-status">{{item.absenteeism_days}}{{ $t("common.day") }}</div>
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
                topicDate:'',
                collectDate:'',
                mytotal:0,
                pageSize:10,
                pageNum:1,
                pageShow:true,
                currentPage: 1,
                mytotal1:0
            }
        },
        methods: {
            edit(id){
                this.$router.push({
                    path: `/editActivity/${id}`
                })
            },
//           取消
            cancel(id){
                var me=this;
                me.$axios.post(me.url+"/activity/cancel?id="+id)
                    .then(function (result) {
                        if(result.data.result==true){
                            me.$message.success(result.data.msg);
                            me.publish();
                        }
                        if(result.data.result==false){
                            me.$message.error(result.data.msg);
                        }
                    })
                    .catch(function (error) {

                    });
            },
//           我发表的活动
            publish(){
                var me=this;
                me.$axios.post(me.url+"/staffMessage/getStaffMessage?uid="+JSON.parse(sessionStorage.getItem('vuex')).user.id)
                    .then(function (result) {
                        me.topicDate=result.data;
                        if(me.topicDate.status==0){
                            me.topicDate.status=me.$t("home.tryOut")
                        }
                        if(me.topicDate.status==1){
                            me.topicDate.status=me.$t("home.worker")
                        }
                        if(me.topicDate.status==2){
                            me.topicDate.status=me.$t("home.quit")
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            collect(){
                var me=this;
                me.$axios.post(me.url+"/monthlyAssess/myMonthlyAssess?page=" + this.pageNum + "&size=" + this.pageSize+"&uid="+JSON.parse(sessionStorage.getItem('vuex')).user.id)
                    .then(function (result) {
                        me.collectDate=result.data.list;
                        me.mytotal=result.data.total;
                        if(me.mytotal<1){
                            me.pageShow=false
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            publishEvent(){
                this.publish()
            },
            collectEvent(){
                this.collect()
            },
            handleSizeChange(val) {
                this.pageSize=val
                this.publish();
                this.collect();

            },
            handleCurrentChange(val) {
                this.pageNum=val
                this.publish();
                this.collect();
            },
            indexThreadEvent(id){
                this.$router.push({
                    path: `/homes/${id}`
                })
            }

        },
        mounted(){
//           我发表的活动
            this.publish();
            this.collect();
        },
    }
</script>
<style scoped>
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
    .laytable-cell-1-title{
        width:150px;
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

    @media screen and (max-width: 410px) {
        .layui-tab-bar {
            display: block !important;
        }

        .layui-tab-title {
            overflow: hidden !important;
        }
    }

    .layui-table-box {
        overflow: auto !important;
    }

    .layui-table-header {
        border-width: 0 0 1px;
        overflow: auto !important;
    }
    .laytable-cell-1-title{
        float:left!important;
    }
    .layui-table-view .layui-table td, .layui-table-view .layui-table th{
        padding:0px 12px!important;
    }
</style>
