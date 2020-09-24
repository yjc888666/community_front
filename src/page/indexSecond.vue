<template>
    <div>
        <my-search></my-search>
        <div class="layui-container">
            <div class="layui-row layui-col-space15">
                <div class="layui-col-md8">
                    <div class="fly-panel" style="margin-bottom: 0;">
                        <ul class="fly-list Hheight">
                            <li v-for="(item,index) in navigation" @click="secondValue(item.name,item.id)"><a href="javascript:;" class="layui-this">{{index+1}}、{{item.name}}</a>
                            </li>
                        </ul>
                        <div style="border-top: 1px dotted #e2e2e2; text-align: center;padding:10px 0" v-show="pageShow">
                            <el-pagination
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-size="pageSize"
                                layout="total, prev, pager, next"
                                :total="totalCount">
                            </el-pagination>
                        </div>
                    </div>
                </div>
                <div class="layui-col-md4">
                    <my-memo></my-memo>
                    <!--<my-lunbo></my-lunbo>-->
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
    import Lunbo from "../components/Lunbo"
    export default {
        name: 'indexSecond',
        data () {
            return {
                url:this.GLOBAL.baseUrl,
                navigation: [],
                currentPage: 1,
//                <!--每页条数-->
                pageSize: 10,
                pageShow: false,
                totalCount:0
            }
        },
        components: {
            'my-search': Search,
            'my-memo': Memo,
            'my-hot': Hot,
            'my-lunbo':Lunbo
        },
        created(){
            this.list(parseInt(this.currentPage))
        },
        methods:{
            secondValue(res,id){
                sessionStorage.setItem('titleTwo',res)
                sessionStorage.setItem('titleTwoId',id)
                this.$router.push({
                    path: `/noteList/${id}`
                })
            },
            list(mypages){
                var id=this.$route.params.id
                var me = this;
                me.$axios.post(me.url+"/forumcate?id="+id+"&page=" + mypages + "&size=" + this.pageSize)
                    .then(function (result) {
                        me.navigation = result.data.list;
                        me.totalCount=result.data.total;
                        if( me.totalCount>10){
                            me.pageShow=true;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            handleCurrentChange(val) {
                var me = this;
                me.list(val);
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
</style>
