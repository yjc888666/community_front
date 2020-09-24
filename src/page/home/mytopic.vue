<template>
    <div class="fly-panel fly-panel-user">
        <div class="layui-tab layui-tab-brief" lay-filter="user">
            <ul class="layui-tab-title" id="LAY_mine" :class="{'layui-tab-more':!ismore}">
                <li data-type="mine-jie" lay-id="index" :class="{'layui-this':tab==0}" @click="tab=0;publishEvent()">{{ $t("my.postPub") }}（{{mytotal}}）</li>
                <li lay-id="collection" :class="{'layui-this':tab==1}" @click="tab=1;collectEvent()">{{ $t("my.postCollect") }}（{{mytotal1}}）</li>
                <li><router-link to="/addBbs">{{ $t("add.publishPost1") }}</router-link></li>
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
                                        <td data-field="title" data-content="" data-minwidth="200">
                                            <div class="layui-table-cell laytable-cell-1-title"><a
                                                href="javascript:;"
                                                class="layui-table-link" v-html="item.title" @click="indexThreadEvent(item.id)"></a></div>
                                        </td>
                                        <td data-field="status" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-status">
                                                <span style="color: #999;">{{item.open}}</span></div>
                                        </td>
                                        <td data-field="time" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-time">{{item.time}}</div>
                                        </td>
                                        <td data-field="3" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-3"><span
                                                style="font-size: 12px;">{{item.view}}{{ $t("common.read") }}/{{item.reply}}{{ $t("common.auditor") }}</span></div>
                                        </td>
                                        <td data-field="4" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-4"><a
                                                class="layui-btn layui-btn-sm" href="javascript:;" @click="edit(item.id)">{{ $t("common.edits") }}</a></div>
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
                                        <th data-field="title" data-minwidth="120">
                                            <div class="layui-table-cell laytable-cell-2-title"><span>{{ $t("common.title") }}</span></div>
                                        </th>
                                        <th data-field="username">
                                            <div class="layui-table-cell laytable-cell-2-username"><span>{{ $t("common.author") }}</span></div>
                                        </th>
                                        <th data-field="time">
                                            <div class="layui-table-cell laytable-cell-2-time" align="center">
                                                <span>{{ $t("activityDetail.collectTime") }}</span></div>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr data-index="0" v-for="(item,index) in collectDate">
                                        <td data-field="title" data-content="" data-minwidth="120">
                                            <div class="layui-table-cell laytable-cell-2-title"><a
                                                href="javascript:;" class="layui-table-link" v-html="item.title" @click="indexThreadEvent(item.fid)"></a>
                                            </div>
                                        </td>
                                        <td data-field="username" data-content="">
                                            <div class="layui-table-cell laytable-cell-2-username"><a
                                                href="javascript:;" class="layui-table-link" @click="homeEvent(item.fid)">{{item.name}}</a>
                                            </div>
                                        </td>
                                        <td data-field="time" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-2-time">{{item.time}}</div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="block" v-show="pageShow1">
                            <el-pagination
                                @size-change="handleSizeChange1"
                                @current-change="handleCurrentChange1"
                                :current-page="currentPage1"
                                :page-sizes="[5,10,20,30]"
                                :page-size="pageSize1"
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
                currentPage4: 4,
                tab:0,
                topicDate:'',
                collectDate:'',
                mytotal:0,
                pageSize:10,
                pageNum:1,
                pageSize1:10,
                pageNum1:1,
                currentPage1:1,
                pageShow:true,
                pageShow1:true,
                currentPage: 1,
                mytotal1:0
            }
        },
        methods: {
            edit(id){
                this.$router.push({
                    path: `/edit/${id}`
                })
            },
//           我发表的帖子
            publish(){

                var me=this;
                me.$axios.post(me.url+"/forum/my?page=" + this.pageNum + "&size=" + this.pageSize)
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
                        }else{
                            me.pageShow=true
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
//          我收藏的帖子
            collect(){
                var me=this;
                me.$axios.post(me.url+"/user/collect?target=forum&page=" + this.pageNum1 + "&size=" + this.pageSize1)
                    .then(function (result) {
                        me.collectDate=result.data.list;
                        me.mytotal1=result.data.total;
                        if(me.mytotal1<1){
                            me.pageShow1=false
                        }else{
                            me.pageShow1=true
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
            },
            handleCurrentChange(val) {
                this.pageNum=val
                this.publish();
            },
            handleSizeChange1(val) {
                this.pageSize1=val
                this.collect();

            },
            handleCurrentChange1(val) {
                this.pageNum1=val
                this.collect();
            },
            indexThreadEvent(id){
                this.$router.push({
                    path: `/indexThread/${id}`
                })
            },
            homeEvent(){
                this.$router.push({
                    path: `/homes/${id}`
                })
            }

        },
        mounted(){
//           我发表的帖子
           this.publish();
           this.collect()
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
