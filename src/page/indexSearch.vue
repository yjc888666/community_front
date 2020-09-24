<template>
    <div>
        <my-search></my-search>
        <div class="layui-container">
            <div class="layui-row layui-col-space15">
                <div class="layui-col-md8">
                    <div class="fly-panel">
                        <div class="fly-panel-title fly-filter" id='test1'>
                            <a> {{ $t("common.keywords") }}：<span style='color:red'>{{search}}</span> {{ $t("indexSearch.result") }}</a>
                        </div>

                        <div style="padding:10px 15px 0 15px"  v-for="(item, index) in searchList.list">
                            <p class="title"><a href="javascript:;" @click="indexThreadEvent(item.id)" v-html="item.title"></a></p>
                            <!-- <div class="div-a"></div> -->
                            <div class="div-b">
                                <div class="content" v-html="item.description">
                                </div>
                                <p class="link">
                                    <span class="fly-list-hint">
                                         <i class="iconfont" title="$t('indexSearch.reply')"></i>
                                         <em>{{item.reply}}</em>
                                         <i class="iconfont" title="$t('indexSearch.popularity')"></i>
                                         <em>{{item.view}}</em>
                                    </span>
                                    <span class="quick"><a href="javaScript:;" style="text-decoration:underline" @click="indexThreadEvent(item.id)">{{ $t("indexSearch.read") }}</a></span>
                                </p>
                            </div>
                            <div style="clear:both"></div>
                        </div>
                        <div style="border-top: 1px dotted #e2e2e2; text-align: center;" v-show="pageShow">
                            <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-size="pageSize"
                                layout="total, prev, pager, next"
                                :total="mytotal">
                            </el-pagination>
                        </div>
                    </div>
                </div>
                <div class="layui-col-md4">
                    <my-memo></my-memo>
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
    export default {
        name: 'indexSearch',
        data () {
            return {
                url:this.GLOBAL.baseUrl,
                search:'',
                searchList:[],
                currentPage:1,
                pageSize:10,
                mytotal:0,
                pageNum:1,
                pageShow:false
            }
        },
        components: {
            'my-search': Search,
            'my-memo': Memo,
            'my-hot': Hot,
        },
        watch: {
            '$route' (to, from) {
                this.$router.go(0);
            }},
        mounted(){
            this.searchEvent()
        },
        methods:{
            searchEvent(){
                var search=this.$route.params.search;
                this.search=search;
                var me = this;
                me.$axios.post(me.url+"/forum/findbykey?key="+search+"&page=" + parseInt(this.pageNum))
                    .then(function (res) {
                        me.searchList=res.data;
                        me.mytotal=res.data.total;
                        if( me.mytotal>1){
                          me.pageShow=true
                        }else{
                            me.pageShow=false
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            indexThreadEvent(id){
                console.log(id)
                this.$router.push({
                    path: `/indexThread/${id}`
                })
            },
            handleSizeChange(val) {
                this.pageSize=val;

            },
            handleCurrentChange(val) {
                this.pageNum=val;

                this.searchEvent()
            },
        }
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
    .el-pagination {
        padding: 30px 0;
    }
    .title{
        line-height: 1.54;
        padding-bottom: 0px;
        font-size: 16px;
        font-weight: 400;
        cursor: auto;
        text-decoration: underline;
    }
    .title a {
        color: blue;
    }
</style>
