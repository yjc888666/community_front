<template>
    <div>
        <my-search></my-search>
        <div class="layui-container">
            <div class="layui-row layui-col-space15">
                <div class="layui-col-md8">

                    <div class="fly-panel" style="margin-bottom: 0;">

                            <ul class="fly-list" >
                                <li v-for="(items,index) in list">
                                    <a href="javascript:;" class="fly-avatar" @click="homesEvent(items.uid)">
                                        <img :src="url+items.userhead">
                                    </a>
                                    <h2>
                                        <a href="javascript:;" v-html="items.title" @click="listEvent(items.id)"></a>
                                    </h2>
                                    <div class="fly-list-info">
                                        <a href="javascript:;"><cite>{{items.username}}</cite></a>
                                        <span>{{items.add_time}}</span>
                                    <span class="fly-list-nums">
                                         <i class="iconfont icon-pinglun1" title="$t('indexSearch.reply')"></i>
                                         <em>{{items.reply}}</em>
                                    </span>
                                    </div>
                                </li>
                            </ul>
                            <div  style="text-align: center;border-top: 1px dotted #e2e2e2;padding:20px 0" v-show="pageShow">
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
                <div class="layui-col-md4">
                    <my-memo></my-memo>
                    <my-sign id="signin"></my-sign>
                    <my-replyCard></my-replyCard>
                    <!--<my-lunbocard></my-lunbocard>-->
                    <my-hot></my-hot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Search from "../components/Search"
    import Memo from "../components/Memo"
    import Hot from "../components/Hot"
    import Sign from "../components/Sign"
    import replyCard from "../components/replyCard"
    import LunboCard from "../components/Lunbocard"
    export default {
        name: 'activityList',
        data () {
            return {
                url:this.GLOBAL.baseUrl,
                pageSize:10,
                pageNum:1,
                pageShow:true,
                currentPage: 1,
                mytotal:0,
                list:[]
            }
        },
        components: {
            'my-search': Search,
            'my-memo': Memo,
            'my-hot': Hot,
            'my-sign': Sign,
            'my-replyCard': replyCard,
            'my-lunbocard': LunboCard
        },
        methods: {
            listEvent(id){
                this.$router.push({
                    path: `/voteDetail/${id}`
                })
            },
            homesEvent(id){
                this.$router.push({
                    path: `/homes/${id}`
                })
            },
            activityList(){
                var me=this;
                me.$axios.post(me.url+"/vote/foropen?page=" + this.pageNum + "&size=" + this.pageSize)
                    .then(function (result) {
                        me.list=result.data.list;
                        me.mytotal=result.data.total;
                        if(me.mytotal1<1){
                            me.pageShow=false
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            handleSizeChange(val) {
                this.pageSize=val
                this.activityList();
            },
            handleCurrentChange(val) {
                this.pageNum=val
                this.activityList();
            }
        },
        mounted(){
             var me = this;
             me.activityList();
        },


    }
</script>

<style scoped>
    .fly-footer {
        margin: 50px 0 0;
        padding: 20px 0 30px;
        line-height: 30px;
        text-align: center;
        color: #737573;
        border-top: 1px solid #e2e2e2;
    }

    .fly-footer a {
        padding: 0 6px;
        font-weight: 300;
        color: #333;
    }

    .fly-footer a:hover {
        color: #777;
    }

    .fly-union {
        margin-top: 10px;
        color: #999;
    }

    .fly-union > * {
        display: inline-block;
        vertical-align: middle;
    }

    .fly-union a[upyun] img {
        width: 80px;
    }

    .fly-union span {
        position: relative;
        top: 3px;
    }

    .fly-union span a {
        padding: 0;
        display: inline;
        color: #999;
    }

    .fly-union span a:hover {
        text-decoration: underline;
    }

    .rule li {
        line-height: 30px;
        list-style: normal;
        list-style: disc;
    }

    .rule li:nth-child(2) {
        margin-bottom: 20px;
    }

    .rule {
        margin-top: 15px;
        padding: 0 18px;
    }

    .el-dialog__headerbtn .el-dialog__close {
        color: #333;
    }

    .tabList:nth-child(4) span {
        display: none;
    }
</style>
