<template>
    <div class="fly-panel fly-panel-user" style="padding-top:20px;">
        <div class="fly-msg" style="margin-bottom: 20px;">
           {{ $t("my.email") }}
            <router-link to="/userset">{{ $t("my.imDeactivation") }}</router-link>
        </div>
        <div class="layui-row layui-col-space20">
            <div class="layui-col-md6">
                 <my-sign></my-sign>
            </div>
            <div class="layui-col-md6">
                <div class="fly-panel fly-panel-border">
                    <div class="fly-panel-title">
                        {{ $t("my.memberInfo") }}
                    </div>
                    <div class="fly-panel-main layui-text" style="padding: 18px 15px; height: 50px; line-height: 26px;">
                        <p>{{ $t("my.score") }}<i id="pointnum">{{points}}</i></p>
                        <p>{{ $t("my.current") }}{{memberDate.name}}</p>
                    </div>
                </div>
            </div>
            <div class="layui-col-md12" style="margin-top: -20px;">
                <div class="fly-panel fly-panel-border">
                    <div class="fly-panel-title">
                        {{ $t("my.scoreList") }}
                    </div>
                        <div class="fly-panel-main">
                            <table id="userpint"></table>
                            <div class="layui-form layui-border-box layui-table-view" lay-filter="LAY-table-1">
                                <div class="layui-table-box">
                                    <div class="layui-table-header">
                                        <table cellspacing="0" cellpadding="0" border="0" class="layui-table"
                                               lay-skin="line">
                                            <thead>
                                            <tr>
                                                <th data-field="add_time">
                                                    <div class="layui-table-cell laytable-cell-1-add_time"><span> {{ $t("common.time") }}</span></div>
                                                </th>
                                                <th data-field="title">
                                                    <div class="layui-table-cell laytable-cell-1-title">
                                                        <span>{{ $t("add.scoreXm") }}</span></div>
                                                </th>
                                                <th data-field="score">
                                                    <div class="layui-table-cell laytable-cell-1-score"><span>{{ $t("add.scoreNum") }}</span>
                                                    </div>
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr class="" v-for="(item,index) in memberList"  :key='index'>
                                                <td data-field="add_time" align="center" data-content="1541379228">
                                                    <div class="layui-table-cell laytable-cell-1-add_time">{{item.add_time}}</div>
                                                </td>
                                                <td data-field="title">
                                                    <div class="layui-table-cell laytable-cell-1-title">{{item.title}}</div>
                                                </td>
                                                <td data-field="score">
                                                    <div class="layui-table-cell laytable-cell-1-score">{{item.score}}</div>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
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
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Sign from "../../components/Sign"
    export default {
        data () {
            return {
                url:this.GLOBAL.baseUrl,
                memberDate:'',
                memberList:[],
                pageShow:true,
                currentPage:1,
                mytotal:0,
                pageSize:10,
                pageNum:1,
                points:''
            }
        },
        components: {
            'my-sign':Sign
        },
        methods: {
//            info积分信息
            info(){
                var me=this;
                me.$axios.post(me.url+"/user/info")
                    .then(function (result) {
                        me.points=result.data.point;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            page(){
                var me=this;
                me.$axios.post(me.url+"/usersign/pointnote?page=" + this.pageNum + "&size=" + this.pageSize)
                    .then(function (result) {
                        me.memberList=result.data.list
                        me.mytotal=result.data.total
                        if( me.mytotal<1||me.mytotal==undefined){
                            me.pageShow=false
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            handleSizeChange(val) {
                this.pageSize=val;
                this.page()
            },
            handleCurrentChange(val) {
                this.pageNum=val;
                this.page()
            }
        },
        mounted(){
            var me=this;
//           会员等级
            me.$axios.post(me.url+"/usersign/grade")
                .then(function (result) {
                    me.memberDate=result.data
                })
                .catch(function (error) {
                    console.log(error);
                });
//           积分明细
             me.page();
             me.info();
        }
    }
</script>
<style>
    el-table th > .cell {
        color: #666;
    }
    .layui-table-cell{
        text-align:center;
    }
    .laytable-cell-1-add_time{
        width:300px;
    }
    .laytable-cell-1-title{
        width:300px;
    }
    .laytable-cell-1-score{
        width:280px;
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
    .layui-table-header {
        overflow: auto !important;
    }
    @media screen and (min-width: 768px) {
        .el-pagination {
            text-align: left;
        }
        .el-pagination__total {
            display: inline-block !important;
        }

        .el-pagination__sizes {
            display: inline-block !important;
        }
    }
    @media screen and (max-width: 768px) {
        .laytable-cell-1-add_time{
            width:228px;
        }
        .laytable-cell-1-title{
            width:200px;
        }
        .laytable-cell-1-score{
            width:200px;
        }
    }
</style>
