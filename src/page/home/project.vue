<template>
    <div class="fly-panel fly-panel-user">
        <div class="layui-tab layui-tab-brief" lay-filter="user" v-show="modelShow">
            <ul class="layui-tab-title" id="LAY_mine" :class="{'layui-tab-more':!ismore}">
                <li data-type="mine-jie" lay-id="index" :class="{'layui-this':tab==0}" @click="tab=0;publishEvent()">{{ $t("my.model") }}（{{mytotal}}）</li>
                <span class="layui-unselect layui-tab-bar" lay-stope="tabmore" title="" style="display:none"
                      v-on:click="ismore=!ismore"><i lay-stope="tabmore" class="layui-icon"></i></span>
            </ul>
            <div class="layui-tab-content" style="padding: 20px 0;">
                <div class="layui-tab-item layui-show" v-if="tab==0">
                    <div class="layui-form layui-border-box layui-table-view">
                        <div class="layui-table-box">
                            <div class="layui-table-header">
                                <table cellspacing="0" cellpadding="0" border="0" class="layui-table" lay-skin="line">
                                    <thead>
                                    <tr>
                                        <th data-field="title">
                                            <div class="layui-table-cell laytable-cell-1-title"><span>{{ $t("my.name") }}</span></div>
                                        </th>
                                        <th data-field="status">
                                            <div class="layui-table-cell laytable-cell-1-status">
                                                <span>{{ $t("add.status") }}</span></div>
                                        </th>
                                        <th data-field="status">
                                            <div class="layui-table-cell laytable-cell-1-status">
                                                <span>{{ $t("common.developer") }}</span></div>
                                        </th>
                                        <th data-field="time" style="text-align: center">
                                            <div class="layui-table-cell laytable-cell-1-time">
                                                <span>{{ $t("common.progress") }}</span></div>
                                        </th>
                                        <th data-field="time" style="text-align: center">
                                            <div class="layui-table-cell laytable-cell-1-time">
                                                <span>{{ $t("activityDetail.days") }}</span></div>
                                        </th>
                                        <th data-field="time" style="text-align: center">
                                            <div class="layui-table-cell laytable-cell-1-time">
                                                <span>{{ $t("activityDetail.startTime") }}</span></div>
                                        </th>
                                        <th data-field="time" style="text-align: center">
                                            <div class="layui-table-cell laytable-cell-1-time">
                                                <span>{{ $t("activityDetail.endTime") }}</span></div>
                                        </th>
                                        <th data-field="time" style="text-align: center">
                                            <div class="layui-table-cell laytable-cell-1-time">
                                                <span>{{ $t("activityDetail.items") }}</span></div>
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
                                                class="layui-table-link" v-html="item.name"></a></div>
                                        </td>
                                        <td data-field="status" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-status">
                                                <span style="color: #999;">{{item.status}}</span></div>
                                        </td>
                                        <td data-field="time" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-time">{{item.developers}}</div>
                                        </td>
                                        <td data-field="time" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-time">{{item.progress}}%</div>
                                        </td>
                                        <td data-field="time" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-time">{{item.etime}}{{ $t("common.day") }}</div>
                                        </td>
                                        <td data-field="time" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-time">{{item.stime}}</div>
                                        </td>
                                        <td data-field="time" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-time">{{item.ctime}}</div>
                                        </td>
                                        <td data-field="time" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-time">{{item.pname}}</div>
                                        </td>
                                        <td data-field="4" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-4"><a
                                                class="layui-btn layui-btn-sm"  @click="interfaces(item.id)">{{ $t("common.interface") }}</a></div>
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
        <div class="layui-tab layui-tab-brief" lay-filter="user" v-show="interfaceShow">
            <ul class="layui-tab-title"  :class="{'layui-tab-more':!ismore}">
                <li data-type="mine-jie" lay-id="index" :class="{'layui-this':tab==0}" @click="tab=0;collectEvent()">{{ $t("my.myInter") }}（{{mytotal1}}）</li>
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
                                            <div class="layui-table-cell laytable-cell-1-title"><span>{{ $t("my.name") }}</span></div>
                                        </th>
                                        <th data-field="status">
                                            <div class="layui-table-cell laytable-cell-1-status">
                                                <span>{{ $t("add.status") }}</span></div>
                                        </th>
                                        <th data-field="status">
                                            <div class="layui-table-cell laytable-cell-1-status">
                                                <span>{{ $t("common.desc") }}</span></div>
                                        </th>
                                        <th data-field="time" style="text-align: center">
                                            <div class="layui-table-cell laytable-cell-1-time">
                                                <span>{{ $t("activityDetail.days") }}</span></div>
                                        </th>
                                        <th data-field="time" style="text-align: center">
                                            <div class="layui-table-cell laytable-cell-1-time">
                                                <span>{{ $t("activityDetail.endTime") }}</span></div>
                                        </th>
                                        <th data-field="time" style="text-align: center">
                                            <div class="layui-table-cell laytable-cell-1-time">
                                                <span>{{ $t("activityDetail.endNote") }}</span></div>
                                        </th>
                                        <th data-field="time" style="text-align: center">
                                            <div class="layui-table-cell laytable-cell-1-time">
                                                <span>{{ $t("activityDetail.items") }}</span></div>
                                        </th>
                                        <th data-field="time" style="text-align: center">
                                            <div class="layui-table-cell laytable-cell-1-time">
                                                <span>{{ $t("activityDetail.subModel") }}</span></div>
                                        </th>
                                        <th data-field="4">
                                            <div class="layui-table-cell laytable-cell-1-4"><span>{{ $t("common.operation") }}</span></div>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(item,index) in collectDate">
                                        <td data-field="title" data-content="" data-minwidth="200">
                                            <div class="layui-table-cell laytable-cell-1-title">
                                                <a href="javascript:;" class="layui-table-link" v-html="item.name"></a>
                                            </div>
                                        </td>
                                        <td data-field="status" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-status">
                                                <span style="color: #999;">{{item.status}}</span></div>
                                        </td>
                                        <td data-field="time" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-time" v-html="item.descri"></div>
                                        </td>
                                        <td data-field="time" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-time">{{item.etime}}{{ $t("common.day") }}</div>
                                        </td>
                                        <td data-field="time" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-time">{{item.ctime}}</div>
                                        </td>
                                        <td data-field="time" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-time">{{item.note}}</div>
                                        </td>
                                        <td data-field="time" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-time">{{item.proname}}</div>
                                        </td>
                                        <td data-field="time" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-time">{{item.modname}}</div>
                                        </td>
                                        <td data-field="4" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-4">
                                                <a class="layui-btn layui-btn-sm "  @click="fanhui()">{{ $t("common.back") }}</a>
                                                <a class="layui-btn layui-btn-sm layui-btn-danger"  @click="finishEvent(item.id)" v-show="item.status!='已完成'">{{ $t("common.finish") }}</a>
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
                pageShow:true,
                currentPage: 1,
                mytotal1:0,
                modelShow:true,
                interfaceShow:false,
                modelId:'',
            }
        },
        methods: {
            fanhui(){
                this.interfaceShow=false;
                this.modelShow=true;
                location.reload();
            },
            finishEvent(id){
                var me=this;
                var para={
                    id:this.modelId,
                    inid:[id]
                }
                me.$axios.post(me.url+"/work/submit",para)
                    .then(function (result) {
                       if(result.data.result==true){
                           me.$message({
                               message: result.data.msg,
                               type: 'success'
                           })
//                           me.interfaces();
                           me.collect();
                       }
                       if(result.data.result==false){
                           me.$message({
                               message: result.data.msg,
                               type: 'error'
                           })
                       }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            interfaces(id){
                this.modelId=id;
                this.interfaceShow=true;
                this.modelShow=false;
                var me=this;
//                var para={
//                    page:this.pageNum,
//                    size:this.pageSize,
//                    id:id
//                }
                me.$axios.post(me.url+"/work/interface?page=" + this.pageNum + "&size=" + this.pageSize+"&id="+id)
                    .then(function (result) {
                        me.collectDate=result.data.pojo.list;
                        me.mytotal1=result.data.pojo.total;
                        me.collectDate.forEach(function(index){
                            if(index.status==0){
                                index.status='可加入'
                            }
                            if(index.status==1){
                                index.status='未完成'
                            }
                            if(index.status==2){
                                index.status='已完成'
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
            publish(){
                var me=this;
                var para={
                    page:this.pageNum,
                    size:this.pageSize
                }
                me.$axios.post(me.url+"/work/bypage",para)
                    .then(function (result) {
                        me.topicDate=result.data.pojo.list;
                        me.topicDate.forEach(function(index){
                            if(index.status==0){
                                index.status='可加入'
                            }
                            if(index.status==1){
                                index.status='未完成'
                            }
                            if(index.status==2){
                                index.status='已完成'
                            }
                        })
                        me.mytotal=result.data.pojo.total;
                        if(me.mytotal<1){
                            me.pageShow=false
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            collect(){
                var me=this;
                me.$axios.post(me.url+"/work/interface?page=" + this.pageNum + "&size=" + this.pageSize+"&id="+this.modelId)
                    .then(function (result) {
                        me.collectDate=result.data.pojo.list;
                        me.mytotal1=result.data.pojo.total;
                        me.collectDate.forEach(function(index){
                            if(index.status==0){
                                index.status='可加入'
                            }
                            if(index.status==1){
                                index.status='未完成'
                            }
                            if(index.status==2){
                                index.status='已完成';
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
           this.publish()
        },
    }
</script>
<style scoped>
    .layui-tab-title li {
        line-height: 40px;
    }

    .laytable-cell-1-title {
        width: 182px !important;
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
            width: 182px !important;
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
