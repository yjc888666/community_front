<template>
    <div class="fly-panel fly-panel-user">
        <div class="layui-tab layui-tab-brief" lay-filter="user">
            <ul class="layui-tab-title" id="LAY_mine" :class="{'layui-tab-more':!ismore}">
                <li data-type="mine-jie" lay-id="index" :class="{'layui-this':tab==0}" @click="tab=0;enclosureEvent()"> {{ $t("home.enclosure") }}（{{mytotals}}）</li>
                <li data-type="mine-jie" lay-id="index" :class="{'layui-this':tab==1}" @click="tab=1;publishEvent()">{{ $t("home.downLoad") }}（{{mytotal}}）</li>
                <li lay-id="collection" :class="{'layui-this':tab==2}" @click="tab=2;collectEvent()">{{ $t("home.bug") }}（{{mytotal1}}）</li>
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
                                            <div class="layui-table-cell laytable-cell-1-time"><span>{{ $t("common.title") }}</span></div>
                                        </th>
                                        <th data-field="title">
                                            <div class="layui-table-cell laytable-cell-1-time"><span>{{ $t("home.post") }}</span></div>
                                        </th>
                                        <th data-field="status">
                                            <div class="layui-table-cell laytable-cell-1-status">
                                                <span>{{ $t("downLoad.state") }}</span></div>
                                        </th>
                                        <th data-field="status">
                                            <div class="layui-table-cell laytable-cell-1-status">
                                                <span>{{ $t("downLoad.time") }}</span></div>
                                        </th>
                                        <th data-field="time" style="text-align: center">
                                            <div class="layui-table-cell laytable-cell-1-time">
                                                <span>{{ $t("downLoad.inv") }}</span></div>
                                        </th>
                                        <th data-field="time" style="text-align: center">
                                            <div class="layui-table-cell laytable-cell-1-time">
                                                <span>{{ $t("add.score") }}</span></div>
                                        </th>
                                        <th data-field="time" style="text-align: center">
                                            <div class="layui-table-cell laytable-cell-1-time">
                                                <span>{{ $t("downLoad.num") }}</span></div>
                                        </th>
                                        <th data-field="3" style="text-align: center">
                                            <div class="layui-table-cell laytable-cell-1-3"><span>{{ $t("downLoad.size") }}</span></div>
                                        </th>
                                        <th data-field="4">
                                            <div class="layui-table-cell laytable-cell-1-4"><span>{{ $t("common.operation") }}</span></div>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(item,index) in enclosureDate">
                                        <td data-field="title" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-time"><a
                                                href="javascript:;" class="layui-table-link" v-html="item.name"></a></div>
                                        </td>
                                        <td data-field="title" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-time"><a
                                                href="javascript:;" class="layui-table-link">{{item.title}}</a></div>
                                        </td>
                                        <td data-field="status" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-status">
                                                <span style="color: #999;">{{item.status}}</span></div>
                                        </td>
                                        <td data-field="status" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-status">
                                                <span style="color: #999;">{{item.create_time }}</span></div>
                                        </td>
                                        <td data-field="time" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-time">{{item.invalid_date}}</div>
                                        </td>
                                        <td data-field="time" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-time">{{item.score}}{{ $t("common.fen") }}</div>
                                        </td>
                                        <td data-field="time" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-time">{{item.download}}{{ $t("common.ci") }}</div>
                                        </td>
                                        <td data-field="3" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-3">{{item.filesize}}</div>
                                        </td>
                                        <td data-field="4" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-4">
                                                <a class="layui-btn layui-btn-danger layui-btn-sm" href="javascript:;" @click="delfujian(item.id)">{{ $t("common.del") }}</a>
                                                <a class="layui-btn layui-btn-sm" href="javascript:;" @click="timeEvent(item.id)">{{ $t("home.invTime") }}</a>
                                            </div>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="block" v-show="pageShows">
                            <el-pagination
                                @size-change="handleSizeChanges"
                                @current-change="handleCurrentChanges"
                                :current-page="currentPages"
                                :page-sizes="[5,10,20,30]"
                                :page-size="pageSizes"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="mytotals">
                            </el-pagination>
                        </div>
                    </div>
                </div>
                <div class="layui-tab-item layui-show" v-if="tab==1">
                    <table lay-filter="test"></table>
                    <div class="layui-form layui-border-box layui-table-view">
                        <div class="layui-table-box">
                            <div class="layui-table-header">
                                <table cellspacing="0" cellpadding="0" border="0" class="layui-table" lay-skin="line">
                                    <thead>
                                    <tr>
                                        <th data-field="title">
                                            <div class="layui-table-cell laytable-cell-1-time"><span>{{ $t("common.title") }}</span></div>
                                        </th>
                                        <th data-field="time" style="text-align: center">
                                            <div class="layui-table-cell laytable-cell-1-time">
                                                <span>{{ $t("home.post") }}</span></div>
                                        </th>
                                        <!--<th data-field="time" style="text-align: center">-->
                                            <!--<div class="layui-table-cell laytable-cell-1-time">-->
                                                <!--<span>附件状态</span></div>-->
                                        <!--</th>-->
                                        <th data-field="time" style="text-align: center">
                                            <div class="layui-table-cell laytable-cell-1-time">
                                                <span>{{ $t("downLoad.time") }}</span></div>
                                        </th>
                                        <th data-field="time" style="text-align: center">
                                            <div class="layui-table-cell laytable-cell-1-time">
                                                <span>{{ $t("downLoad.inv") }}</span></div>
                                        </th>
                                        <th data-field="time" style="text-align: center">
                                            <div class="layui-table-cell laytable-cell-1-time">
                                                <span>{{ $t("add.score") }}</span></div>
                                        </th>
                                        <th data-field="time" style="text-align: center">
                                            <div class="layui-table-cell laytable-cell-1-time">
                                                <span>{{ $t("downLoad.num") }}</span></div>
                                        </th>
                                        <th data-field="3" style="text-align: center">
                                            <div class="layui-table-cell laytable-cell-1-3"><span>{{ $t("downLoad.size") }}</span></div>
                                        </th>
                                        <th data-field="4">
                                            <div class="layui-table-cell laytable-cell-1-4"><span>{{ $t("common.operation") }}</span></div>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(item,index) in topicDate">
                                        <td data-field="title" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-time"><a
                                                href="javascript:;" class="layui-table-link" v-html="item.uploadname"></a></div>
                                        </td>
                                        <td data-field="time" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-time">{{item.title}}</div>
                                        </td>
                                        <!--<td data-field="time" align="center" data-content="">-->
                                            <!--<div class="layui-table-cell laytable-cell-1-time">{{item.status}}</div>-->
                                        <!--</td>-->
                                        <td data-field="time" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-time">{{item.time}}</div>
                                        </td>
                                        <td data-field="time" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-time">{{item.invalibtime}}</div>
                                        </td>
                                        <td data-field="time" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-time">{{item.score}}{{ $t("common.fen") }}</div>
                                        </td>
                                        <td data-field="time" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-time">{{item.num}}{{ $t("common.ci") }}</div>
                                        </td>
                                        <td data-field="3" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-3">{{item.filesize}}</div>
                                        </td>
                                        <td data-field="4" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-4">
                                                <a class="layui-btn layui-btn-danger layui-btn-sm" href="javascript:;" @click="delDownload(item.id)">{{ $t("common.del") }}</a>
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
                <div class="layui-tab-item layui-show"  v-if="tab==2">
                    <table id="myCollection" lay-filter="test11"></table>
                    <div class="layui-form layui-border-box layui-table-view"  style=" ">
                        <div class="layui-table-box">
                            <div class="layui-table-header">
                                <table cellspacing="0" cellpadding="0" border="0" class="layui-table" lay-skin="line">
                                    <thead>
                                    <tr>
                                        <th data-field="title" data-minwidth="400">
                                            <div class="layui-table-cell"><span>{{ $t("common.title") }}</span></div>
                                        </th>
                                        <th data-field="username">
                                            <div class="layui-table-cell laytable-cell-2-username"><span>{{ $t("home.post") }}</span></div>
                                        </th>
                                        <th data-field="username">
                                            <div class="layui-table-cell laytable-cell-2-username"><span>{{ $t("home.buyTime") }}</span></div>
                                        </th>
                                        <th data-field="time">
                                            <div class="layui-table-cell laytable-cell-2-time" align="center">
                                                <span>{{ $t("add.score") }}</span></div>
                                        </th>
                                        <th data-field="4">
                                            <div class="layui-table-cell laytable-cell-1-4"><span>{{ $t("common.operation") }}</span></div>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr data-index="0" v-for="(item,index) in collectDate">
                                        <td data-field="title" data-content="" data-minwidth="400">
                                            <div class="layui-table-cell"><a
                                                href="javascript:;"  class="layui-table-link" v-html="item.filename"></a>
                                            </div>
                                        </td>
                                        <td data-field="username" data-content="">
                                            <div class="layui-table-cell laytable-cell-2-username"><a
                                                href="javascript:;"  class="layui-table-link">{{item.title}}</a>
                                            </div>
                                        </td>
                                        <td data-field="username" data-content="">
                                            <div class="layui-table-cell laytable-cell-2-username"><a
                                                href="javascript:;"  class="layui-table-link">{{item.add_time}}</a>
                                            </div>
                                        </td>
                                        <td data-field="time" align="center" data-content="">
                                            <div class="layui-table-cell laytable-cell-2-time">{{item.score}}{{ $t("common.fen") }}</div>
                                        </td>
                                        <td data-field="4" data-content="">
                                            <div class="layui-table-cell laytable-cell-1-4">
                                                <a class="layui-btn layui-btn-danger layui-btn-sm" href="javascript:;" @click="delEvent(item.id)">{{ $t("common.del") }}</a>
                                            </div>
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
                enclosureDate:'',
                topicDate:'',
                collectDate:'',
                pageSizes:10,
                pageSize:10,
                pageSize1:10,
                pageShows:true,
                pageShow:true,
                pageShow1:true,
                currentPages: 1,
                currentPage: 1,
                currentPage1: 1,
                mytotal:0,
                mytotal1:0,
                mytotals:0,
                pageNums:1,
                pageNum:1,
                pageNum1:1
            }
        },
        methods: {
            edit(id){
                this.$router.push({
                    path: `/edit/${id}`
                })
            },
            enclosure(){
                var me=this;
                me.$axios.post(me.url+"/forum/filepage?page=" + this.pageNums + "&size=" + this.pageSizes)
                    .then(function (result) {
                        result.data.pojo.list.forEach(function(index){
                            if(index.status==1){
                                index.status=me.$t("home.normal")
                            }
                            if(index.status==2){
                                index.status=me.$t("home.over")
                            }
                            if(index.status==3){
                                index.status=me.$t("home.stop")
                            }
                        })
                        me.enclosureDate=result.data.pojo.list;
                        me.mytotals=result.data.pojo.total;
                        if(me.mytotals<1){
                            me.pageShows=false
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            publish(){
                var me=this;
                me.$axios.post(me.url+"/forum/downbypage?page=" + this.pageNum + "&size=" + this.pageSize)
                    .then(function (result) {
                        me.topicDate=result.data.pojo.list;
                        me.mytotal=result.data.pojo.total;
                        if(me.mytotal<1){
                            me.pageShow=false
                        }
                        result.data.pojo.list.forEach(function(index){
                            if(index.status==1){
                                index.status=me.$t("home.normal")
                            }
                            if(index.status==2){
                                index.status=me.$t("home.over")
                            }
                            if(index.status==3){
                                index.status=me.$t("home.stop")
                            }
                        })
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
//          购买
            collect(){
                var me=this;
                me.$axios.post(me.url+"/forum/purchase?page=" + this.pageNum1 + "&size=" + this.pageSize1)
                    .then(function (result) {
                        me.collectDate=result.data.pojo.list;
                        me.mytotal1=result.data.pojo.total;
                        if(me.mytotal1<1){
                            me.pageShow1=false
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            enclosureEvent(){
               this.enclosure();
            },
            publishEvent(){
                this.publish()
            },
            collectEvent(){
                this.collect()
            },
            handleSizeChanges(val) {
                this.pageSizes=val
                this.enclosure();

            },
            handleCurrentChanges(val) {
                this.pageNums=val
                this.currentPages=val
                this.enclosure();
            },
            handleSizeChange(val) {
                this.pageSize=val
                this.publish();
            },
            handleCurrentChange(val) {
                this.pageNum=val
                this.currentPage=val
                this.publish();
            },
            handleSizeChange1(val) {
                this.pageSize1=val
                this.collect();

            },
            handleCurrentChange1(val) {
                this.pageNum1=val
                this.currentPage1=val
                this.collect();
            },
            delfujian(id){
                var me=this;
                me.$axios.post(me.url+"/forum/delfile?id="+id)
                    .then(function (result) {
                        if(result.data.result==true){
                            me.$message({
                                type: 'success',
                                message:result.data.msg
                            });
                            me.enclosure();
                        }
                        if(result.data.result==false){
                            me.$message({
                                type: 'error',
                                message:result.data.msg
                            });
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            delDownload(id){
                var me=this;
                me.$axios.post(me.url+"/forum/deldown?id="+id)
                    .then(function (result) {
                        if(result.data.result==true){
                            me.$message({
                                type: 'success',
                                message:result.data.msg
                            });
                            me.publish();
                        }
                        if(result.data.result==false){
                            me.$message({
                                type: 'error',
                                message:result.data.msg
                            });
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            delEvent(id){
                var me=this;
                me.$axios.post(me.url+"/forum/delpurchase?id="+id)
                    .then(function (result) {
                        if(result.data.result==true){
                            me.$message({
                                type: 'success',
                                message:result.data.msg
                            });
                            me.collect();
                        }
                        if(result.data.result==false){
                            me.$message({
                                type: 'error',
                                message:result.data.msg
                            });
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            getFilename(){
                var filename=document.getElementById("file").value;
                if(filename==undefined||filename==""){
                    document.getElementById("filename").innerHTML="点击此处上传文件";
                } else{
                    var fn=filename.substring(filename.lastIndexOf("\\")+1);
                    document.getElementById("filename").innerHTML=fn; //将截取后的文件名填充到span中
                    console.log(fn)
                }
            },
            timeEvent(id){
                this.$router.push({
                    path: `/addEnclosure/${id}`
                })
            }

        },
        mounted(){
            this.enclosure();
            this.publish()
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
