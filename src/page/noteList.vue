<template>
    <div>
        <my-search></my-search>
        <div class="layui-container">
            <div class="layui-row layui-col-space15">
                <div class="layui-col-md8">
                    <div class="fly-panel" v-show="settopShow">
                        <div class="fly-panel-title fly-filter">
                            <a>{{ $t("noteList.settop") }}</a>
                            <a href="#signin" class="layui-hide-sm layui-show-xs-block fly-right" id="LAY_goSignin"
                               style="color: #FF5722;">{{ $t("noteList.sign") }}</a>

                        </div>
                        <ul class="fly-list">
                            <li v-for="(settopItem,index) in settop">
                                <a href="javascript:;" class="fly-avatar" @click="homesEvent(settopItem.uid)">
                                    <img :src="url+settopItem.userhead" alt="">
                                </a>
                                <h2>
                                    <a class="layui-badge" v-html="settopItem.tname"></a>
                                    <a href="javascript:;" v-html="settopItem.title" @click="settopEvent(settopItem.id)"></a>
                                </h2>
                                <div class="fly-list-info">
                                    <a href="home.html" link>
                                        <cite>{{settopItem.username}}</cite>
                                    </a>
                                    <span>{{settopItem.time}}</span>
                                    <span class="fly-list-nums">
                                         <i class="iconfont icon-pinglun1" title="$t('indexSearch.reply')"></i>
                                         <em>{{settopItem.reply}}</em>
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="fly-panel" style="margin-bottom: 0;">
                        <div class="fly-panel-title fly-filter">
                            <span v-for="(item,index) in list" @click="tab(index,item.type)" class="tabList">
                                <a href="javascript:;" :class="{'layui-this':index==num}"> {{item.tab}}</a>
                                <span class="fly-mid"></span>
                            </span>
                        </div>

                            <ul class="fly-list" v-show="item.show" v-for="(item,index) in list">
                                <li v-for="(items,index) in item.datas.list">
                                    <a href="javascript:;" class="fly-avatar" @click="homesEvent(items.uid)">
                                        <img :src="url+items.userhead">
                                    </a>
                                    <h2>
                                        <a class="layui-badge" v-html="items.tname"></a>
                                        <a href="javascript:;" v-html="items.title" @click="listEvent(items.id)"></a>
                                    </h2>
                                    <div class="fly-list-info">
                                        <a href="javascript:;"><cite>{{items.username}}</cite></a>
                                        <span>{{items.time}}</span>
                                    <span class="fly-list-nums">
                                         <i class="iconfont icon-pinglun1" title="$t('indexSearch.reply')"></i>
                                         <em>{{items.reply}}</em>
                                    </span>
                                    </div>
                                    <div class="fly-list-badge"><span class="layui-badge layui-bg-red" v-show="items.choice">{{ $t("noteList.choice") }}</span></div>
                                    <div class="fly-list-badge"><span class="layui-badge layui-bg-black" v-show="items.settop">{{ $t("noteList.settop") }}</span></div>
                                </li>
                            </ul>
                            <div  style="text-align: center;border-top: 1px dotted #e2e2e2;padding:20px 0" v-show="pageshow">
                                <el-pagination
                                    @size-change="handleSizeChange"
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
                    <my-sign id="signin"></my-sign>
                    <!--<my-replyCard></my-replyCard>-->
                    <my-lunbocard></my-lunbocard>
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
        name: 'noteList',
        data () {
            return {
                url:this.GLOBAL.baseUrl,
                settop:[],
                list: [
                    {tab: this.$t("noteList.newPosts"), show: true, id: 1, data: [],type:"",datas:[]},
                    {tab:  this.$t("noteList.newreply"), show: false, id: 2, data: [],type:'newreply',datas:[]},
                    {tab: this.$t("noteList.hot"), show: false, id: 3, data: [],type:'hot',datas:[]},
                    {tab: this.$t("noteList.choice"), show: false, id: 4, data: [],type:'choice',datas:[]}
                ],
                num: 0,
                settopShow:true,
//               <!--当前页数-->
                currentPage:1,
//                <!--每页条数-->
                pageSize:15,
                totalCount:0,
                pageshow:true,
                type:''
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
        mounted(){
            var me = this;
//            新帖的列表
             me.getUser(0,'');
//            置顶
            me.$axios.post(me.url+"/forum/bypage?settop=1")
                .then(function (result) {
                    me.settop = result.data.list;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        methods: {
            homesEvent(id){
                this.$router.push({
                    path: `/homes/${id}`
                })
            },
            getUser: function (a,b) {
                var id = this.$route.params.id;
                var me=this;
                me.$axios.post(me.url+"/forum/bypage?tid=" + id + "&type="+b + "&page=" + parseInt(this.currentPage) + "&size=" + this.pageSize)
                    .then(function (result) {

                        me.list[a].datas=result.data
                        me.totalCount=result.data.total
                        me.list[a].data = result.data.list;
                       if((me.totalCount)<1){
                            me.pageshow=false
                        }
                       else{
                           me.pageshow=true
                       }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            tab: function (index, type) {

                this.type=type;
                this.currentPage=1;
                this.settopShow = false
                var id = this.$route.params.id
                this.num = index;
                this.type = type;
                for (var i = 0; i < this.list.length; i++) {
                    this.list[i].show = false;
                }
                this.list[index].show = true;
                var me = this;
                me.getUser(index,type);

            },
             settopEvent(id){
                    this.$router.push({
                        path: `/indexThread/${id}`
                    })
                },
            listEvent(id){
                this.$router.push({
                    path: `/indexThread/${id}`
                })
            },
            handleSizeChange(val) {
//                console.log(`每页 ${val} 条`);
            },
//            当前第几页
            handleCurrentChange(val) {
//                console.log(`当前页: ${val}`);
                this.currentPage = val;
                var id = this.$route.params.id;
                var me=this;
                var newType=me.type;
                me.getUser(me.num,newType);
            }
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

    .tabList:nth-child(4) span {
        display: none;
    }
</style>
