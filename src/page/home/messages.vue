<template>
    <div class="fly-panel fly-panel-user">
        <div class="layui-tab layui-tab-brief" lay-filter="user" id="LAY_msg" style="margin-top: 15px;">


            <div id="LAY_minemsg" >

                <button class="layui-btn layui-btn-primary "  @click="markAll">{{ $t("my.mark") }}</button>

                <button class="layui-btn layui-btn-danger read_del"  @click="delAll">{{ $t("my.delMessage") }}</button>

                <button class="layui-btn layui-btn-primary read_del"  @click="marksAll">{{ $t("my.maskAll") }}</button>

                <button class="layui-btn layui-btn-danger read_del"  @click="delsAll">{{ $t("my.delAllMessage") }}</button>

                <ul class="mine-msg">
                    <li class="messagelist" v-for="(item,index) in messageDate">
                        <blockquote class="layui-elem-quote"  v-show="item.type==2">
                            <a href="javascript:;"  @click="homeEvent(item.uid)"><cite>{{item.username}}</cite></a>{{ $t("my.repPost") }}<a href="javascript:;"><cite v-html="item.title"></cite></a>
                        </blockquote>
                        <blockquote class="layui-elem-quote"  v-show="item.type==3">
                            <a href="javascript:;"  @click="homeEvent(item.uid)"><cite>{{item.username}}</cite></a>{{ $t("my.repPost1") }}<a href="javascript:;"><cite v-html="item.title"></cite></a>{{ $t("my.comment") }}
                        </blockquote>
                        <blockquote class="layui-elem-quote"  v-show="item.type==1">{{ $t("my.sysInfo") }}{{item.title}}</blockquote>
                        <blockquote class="layui-elem-quote"  v-show="item.type==4">
                            <a href="javascript:;"  @click="homeEvent(item.uid)"><cite>{{item.username}}</cite></a>{{ $t("my.holidPub") }}<a href="javascript:;"><cite v-html="item.title"></cite></a>
                        </blockquote>
                        <blockquote class="layui-elem-quote"  v-show="item.type==5">
                            <a href="javascript:;"  @click="homeEvent(item.uid)"><cite>{{item.username}}</cite></a>{{ $t("my.audiPub") }}<a href="javascript:;"><cite v-html="item.title"></cite></a>
                        </blockquote>
                        <p><span>{{item.time}}</span>
                            <a href="javascript:;"
                               class=" elementread layui-btn layui-btn-sm layui-btn-primary fly-delete" @click="mark(item.id,index)" v-show="item.status==1">{{ $t("my.marks") }}</a>
                            <a href="javascript:;"
                               class=" elementdel layui-btn layui-btn-sm layui-btn-danger fly-delete" @click="del(item.id,index)">{{ $t("common.del") }}</a>
                        </p>
                    </li>
                </ul>
                <div style="text-align: center;" v-show="pageShow">
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
</template>
<script>
    export default {
        data () {
            return {
                url:this.GLOBAL.baseUrl,
                messageDate:[],
                currentPage:1,
                mytotal:0,
                pageSize:5,
                pageNum:1,
                pageShow:false,

            }
        },
        methods: {
            homeEvent(id){
                this.$router.push({
                    path: `/homes/${id}`
                })
            },
            page(){
                var me=this;
                me.$axios.post(me.url+"/message/my?page=" + this.pageNum + "&size=" + this.pageSize)
                    .then(function (result) {
                        me.messageDate=result.data.list
                        me.mytotal=result.data.total
                        if(me.mytotal>1){
                            me.pageShow=true;
                        }
                        else{
                            me.pageShow=false;
                        }
                    })
                    .catch(function (error) {

                    });
            },
            handleSizeChange(val) {
                this.pageSize=val;
                this.page()
            },
            handleCurrentChange(val) {
                this.pageNum=val;
                this.page()
            },
            mark(id,index){
                var me=this;
                me.$axios.post(me.url+"/message/unsign?ids="+id)
                    .then(function (result) {
                        me.messageDate[index].status=2
                        me.$message({
                            message:me.$t("my.markS"),
                            type: 'success'
                        })
                        me.page();
                    })
                    .catch(function (error) {

                    });

            },
            del(id,index){
                var me=this;
                me.$axios.post(me.url+"/message/delete?ids="+id)
                    .then(function (result) {
                        me.messageDate.splice(index,1)
                        me.$message({
                            message:me.$t("my.delS"),
                            type: 'success'
                        })
                        me.page();
                    })
                    .catch(function (error) {

                    });
            },
            markAll(){
                this.$confirm(this.$t("my.maskContent"), this.$t("common.warn"), {
                    confirmButtonText: this.$t("common.determine"),
                    cancelButtonText: this.$t("common.cancle"),
                    type: 'warning'
                }).then(() => {
                   var me=this;
                   var id=[];
                    me.messageDate.forEach(function(index){
                       id.push(index.id)
                   })
                    me.$axios.post(me.url+"/message/unsign?ids="+id)
                    .then(function (result) {
                        location.reload()
                        me.$message({
                            type: 'success',
                            message: me.$t("my.markS"),
                        });
                    })
                    .catch(function (error) {

                    });
            }).catch(() => {
                    this.$message({
                    type: 'info',
                    message: this.$t("my.noDelS")
                });
            });
            },
            delAll(){
                this.$confirm(this.$t("my.maskContent1"), this.$t("common.warn"), {
                    confirmButtonText: this.$t("common.determine"),
                    cancelButtonText: this.$t("common.cancle"),
                    type: 'warning'
                }).then(() => {
                var me=this;
                var id=[];
                me.messageDate.forEach(function(index){
                    id.push(index.id)
                })
                me.$axios.post(me.url+"/message/delete?ids="+id)
                    .then(function (result) {
                        me.messageDate=[]
                        me.pageShow=false;
                        me.$message({
                            type: 'success',
                            message:me.$t("my.delS")
                        });
                        me.page();
                    })
                    .catch(function (error) {

                    });
            }).catch(() => {
                    this.$message({
                    type: 'info',
                    message:  this.$t("my.noDelS")
                });
            });
            },
            marksAll(){
                this.$confirm(this.$t("my.maskContent2"), this.$t("common.warn"), {
                    confirmButtonText: this.$t("common.determine"),
                    cancelButtonText: this.$t("common.cancle"),
                    type: 'warning'
                }).then(() => {
                var me=this;
                me.$axios.post(me.url+"/message/unsign?ids=")
                    .then(function (result) {
                        location.reload()
                        me.$message({
                            type: 'success',
                            message: me.$t("my.markS")
                        });
                    })
                    .catch(function (error) {

                    });
            }).catch(() => {
                    this.$message({
                    type: 'info',
                    message: this.$t("my.noDelS")
                });
            });
            },
            delsAll(){
                this.$confirm(this.$t("my.maskContent3"), this.$t("common.warn"), {
                    confirmButtonText: this.$t("common.determine"),
                    cancelButtonText: this.$t("common.cancle"),
                    type: 'warning'
                }).then(() => {
                var me=this;
                me.$axios.post(me.url+"/message/delete?ids=")
                    .then(function (result) {
                        me.messageDate=[]
                        me.pageShow=false;
                        me.$message({
                            type: 'success',
                            message: me.$t("my.delS")
                        });
                    })
                    .catch(function (error) {

                    });
            }).catch(() => {
                    this.$message({
                    type: 'info',
                    message: this.$t("my.noDelS")
                });
            });
            }

        },
        mounted(){
//            我的消息的详细信息
            var me=this;
             me.page();
        },

    }
</script>
<style>
    .el-pagination__total {
        display: none !important;
    }
    .el-pagination__jump{
        display: none !important;
    }
    .el-pagination__sizes {
        display: none !important;
    }
    @media screen and (min-width: 768px) {
        .el-pagination__total {
            display: inline-block !important;
        }

        .el-pagination__sizes {
            display: inline-block !important;
        }
        .el-pagination__jump{
            display: inline-block !important;
        }
    }
    .layui-btn{
        padding: 0 15px!important;
        margin-bottom: 10px!important;
    }
</style>
