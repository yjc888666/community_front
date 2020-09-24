<template>
    <div class="fly-panel fly-panel-user">
        <div class="layui-tab layui-tab-brief" lay-filter="user">
            <ul class="layui-tab-title" id="LAY_mine" :class="{'layui-tab-more':!ismore}">
                <li data-type="mine-jie" lay-id="index" :class="{'layui-this':tab==0}" @click="tab=0;publishEvent()">{{ $t("home.myVote") }}（{{mytotal}}）</li>
                <li lay-id="collection" :class="{'layui-this':tab==1}" @click="tab=1;collectEvent()">{{ $t("home.myJoinVote") }}（{{mytotal1}}）</li>
                <li><router-link to="/addVote">{{ $t("add.vote") }}</router-link></li>
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
                                            <div class="layui-table-cell laytable-cell-1-title"><span>{{ $t("common.title") }}</span></div>
                                        </th>
                                        <th data-field="status">
                                            <div class="layui-table-cell laytable-cell-1-status">
                                                <span>{{ $t("add.status") }}</span></div>
                                        </th>
                                        <th data-field="time" style="text-align: center">
                                            <div class="layui-table-cell laytable-cell-1-time">
                                                <span>{{ $t("home.pubTime") }}</span></div>
                                        </th>
                                        <th data-field="3" style="text-align: center">
                                            <div class="layui-table-cell laytable-cell-1-3"><span>{{ $t("common.data") }}</span></div>
                                        </th>
                                        <th data-field="4">
                                            <div class="layui-table-cell laytable-cell-1-4"><span>{{ $t("common.operation") }}</span></div>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(item,index) in topicDate">
                                        <td data-field="title" data-content="" data-minwidth="210">
                                            <div class="layui-table-cell laytable-cell-1-title">
                                                <a href="javascript:;" class="layui-table-link" v-html="item.title" @click="indexThreadEvent(item.id)"></a></div>
                                        </td>
                                        <td data-field="status" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-status">
                                                <span style="color: #999;">{{item.open}}</span></div>
                                        </td>
                                        <td data-field="time" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-time">{{item.add_time}}</div>
                                        </td>
                                        <td data-field="3" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-3"><span
                                                style="font-size: 12px;">{{item.view}}{{ $t("common.read") }}</span></div>
                                        </td>
                                        <td data-field="4" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-4">
                                                <a class="layui-btn layui-btn-sm" href="javascript:;" @click="edit(item.id)">{{ $t("common.edits") }}</a>
                                            </div>

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
                <div class="layui-tab-item layui-show"  v-if="tab==1">
                    <table id="myCollection" lay-filter="test11"></table>
                    <div class="layui-form layui-border-box layui-table-view"  style=" ">
                        <div class="layui-table-box">
                            <div class="layui-table-header">
                                <table cellspacing="0" cellpadding="0" border="0" class="layui-table" lay-skin="line">
                                    <thead>
                                    <tr>
                                        <th data-field="title" >
                                            <div class="layui-table-cell laytable-cell-1-title"><span>{{ $t("common.title") }}</span></div>
                                        </th>
                                        <th data-field="status">
                                            <div class="layui-table-cell laytable-cell-1-status">
                                                <span>{{ $t("add.status") }}</span></div>
                                        </th>
                                        <th data-field="time" style="text-align: center">
                                            <div class="layui-table-cell laytable-cell-1-time">
                                                <span>{{ $t("home.pubTime") }}</span></div>
                                        </th>
                                        <th data-field="3" style="text-align: center">
                                            <div class="layui-table-cell laytable-cell-1-3"><span>{{ $t("common.data") }}</span></div>
                                        </th>
                                        <th data-field="" style="text-align: center">
                                            <div class="layui-table-cell laytable-cell-1-3"><span>{{ $t("activityDetail.endTime") }}</span></div>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr data-index="0" v-for="(item,index) in collectDate">
                                        <td data-field="title" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-title"><a
                                                href="javascript:;" class="layui-table-link" v-html="item.title" @click="indexThreadEvent(item.id)"></a>
                                            </div>
                                        </td>
                                        <td data-field="status" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-status">
                                                <span style="color: #999;">{{item.open}}</span></div>
                                        </td>
                                        <td data-field="time" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-time">{{item.add_time}}</div>
                                        </td>
                                        <td data-field="3" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-3"><span
                                                style="font-size: 12px;">{{item.view}}{{ $t("common.read") }}</span></div>
                                        </td>
                                        <td data-field="" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-3">{{item.end_time}}</div>
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
                                :total="mytotal1">
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
                    path: `/editVote/${id}`
                })
            },

            publish(){
                var me=this;
                me.$axios.post(me.url+"/vote/my?page=" + this.pageNum + "&size=" + this.pageSize+"&id="+JSON.parse(sessionStorage.getItem('vuex')).user.id)
                    .then(function (result) {
                        me.topicDate=result.data.list;
                        me.mytotal=result.data.total;
                        me.topicDate.forEach(function(index){
                            if(index.open==0){
                             index.open=me.$t("home.auditor")
                            }
                            if(index.open==1){
                                index.open=me.$t("home.normal")
                            }
                            if(index.open==2){
                                index.open=me.$t("home.noPass")
                            }
                            if(index.open==-1){
                                index.open=me.$t("home.hide")
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
//          我参与的活动
            collect(){
                var me=this;
                me.$axios.post(me.url+"/vote/myjoin?page=" + this.pageNum + "&size=" + this.pageSize+"&id="+JSON.parse(sessionStorage.getItem('vuex')).user.id)
                    .then(function (result) {
                        me.collectDate=result.data.list;
                        me.mytotal1=result.data.total;
                        me.collectDate.forEach(function(index){
                            if(index.open==0){
                                index.open=me.$t("home.auditor")
                            }
                            if(index.open==1){
                                index.open=me.$t("home.normal")
                            }
                            if(index.open==2){
                                index.open=me.$t("home.noPass")
                            }
                            if(index.open==-1){
                                index.open=me.$t("home.hide")
                            }
                        })
                        if(me.mytotal1<1){
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
                    path: `/voteDetail/${id}`
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

    .laytable-cell-1-title {
        width: 300px !important;
    }
    .laytable-cell-2-title{
        width: 350px !important;
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
        .laytable-cell-1-title {
           width: 567px !important;
        }
        .laytable-cell-2-title{
            width: 732px !important;
        }

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
</style>
