<template>
    <div>
        <div class="fly-home">
            <img :src="url+infoDate.userhead" >
            <h1>{{infoDate.username}}<i class="iconfont icon-nv" v-show="infoDate.sex!=1"></i><i class="iconfont icon-nan" v-show="infoDate.sex!=0"></i></h1>
            <p class="fly-home-info">
                <i class="iconfont icon-zuichun" title="积分"></i><span style="color: #FF7200;">{{infoDate.point}}</span>
                <i class="iconfont icon-shijian"></i><span>{{infoDate.regtime}}{{ $t("my.join") }}</span>
                <i class="iconfont icon-chengshi"></i><span>{{ $t("my.china") }}</span>
            </p>
            <p class="fly-home-sign" v-show="infoDate.description==null">{{ $t("my.lan") }}</p>
            <p class="fly-home-sign" v-show="infoDate.description!=null">{{infoDate.description}}</p>
        </div>
        <div class="layui-container cont">
            <div class="layui-tab layui-tab-brief">
                <ul class="layui-tab-title" v-bind:class="{'layui-tab-more': isactive }">
                    <li v-for="(item,index) in liList" v-on:click="addClass(index);listEvent(index)" v-bind:class="{ layui_bg_gray:index==current}">
                        <a href="javascript:void(0);"><span>Ta</span>{{item.title}}</a>
                    </li>
                    <span class="layui-unselect layui-tab-bar" lay-stope="tabmore" title="" style="display: none;" v-on:click="isactive=!isactive"><i lay-stope="tabmore" class="layui-icon"></i></span>
                </ul>

                <div class="fly-panel leifeng-rank" style="padding: 20px;min-height:100px" v-if="data==0">
                    <ul class="jie-row">
                        <li v-for="(item,index) in publishData">
                            <a href="javascript:;" class="jie-title" v-html="item.title" @click="indexThreadEvent(item.id)"></a>
                            <i></i>
                            <em>{{item.time}}</em>
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
                            :total="publishtotal">
                        </el-pagination>
                    </div>
                </div>

                <div class="fly-panel leifeng-rank" style="padding:20px;min-height:100px" v-if="data==1">
                    <ul class="home-jieda">
                        <li v-for="(item,index) in commentData">
                            <p>
                                <span>{{item.time}}</span> {{ $t("common.zai") }}
                                <a href="javascript:;"  v-html="item.title" @click="indexThreadEvent(item.fid)"></a>{{ $t("my.replyZ") }}
                            </p>
                            <div class="home-dacontent" v-html="item.content"></div>
                        </li>
                    </ul>
                    <div style="text-align: center;" v-show="pageShow">
                        <el-pagination
                            @size-change="handleSizeChange1"
                            @current-change="handleCurrentChange1"
                            :current-page="currentPage"
                            :page-sizes="[5,10,20,30]"
                            :page-size="pageSize1"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="commenttotal">
                        </el-pagination>
                    </div>
                </div>

                <div class="fly-panel leifeng-rank" style="padding: 20px;min-height:100px" v-if="data==2">
                    <ul class="jie-row">
                        <li v-for="(item,index) in zanData">
                            <a href="javascript:;" class="jie-title" @click="indexThreadEvent(item.fid)" v-html="item.title"></a>
                            <i></i>
                            <!--<span data-id="56" data-type="zan" style="background:#999;padding: 0 5px;cursor:pointer;" class="quxiao" v-on:click="cancelzan(index,item.fid)"><a class="jie-user" style="color:#fff;padding:0px">取消赞</a></span>-->
                            <em><a href="javascript:;">{{item.name}}</a>{{item.time}}</em>
                        </li>
                    </ul>
                    <div style="text-align: center;" v-show="pageShow">
                        <el-pagination
                            @size-change="handleSizeChange2"
                            @current-change="handleCurrentChange2"
                            :current-page="currentPage"
                            :page-sizes="[5,10,20,30]"
                            :page-size="pageSize2"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="zantotal">
                        </el-pagination>
                    </div>
                </div>

                <div class="fly-panel leifeng-rank" style="padding: 20px;min-height:100px" v-if="data==3">
                    <dl class="fly-rank">
                        <dd style="text-align:center" v-for="(item,index) in careData">
                            <a  href="javascript:;" @click="homesEvent(item.id)">
                                <img  :src="url+item.userhead">
                                <cite>{{item.username}}</cite>
                            </a>
                            <i style="display:block;text-align: center;">{{item.fans}}{{ $t("my.fans") }}</i>
                        </dd>
                    </dl>
                </div>
                <div class="fly-panel leifeng-rank" style="padding: 20px;min-height:100px" v-if="data==4">
                    <ul class="jie-row">
                        <li v-for="(item,index) in tipsmeData">
                            <a href="javascript:;" class="home-jieda" @click="indexThreadEvent(item.fid)">{{item.name}} 在<span style="color:#4F99CF;background:#FFF" v-html="item.title"></span></a>
                            <i>{{ $t("my.rewTa") }} {{item.score}} {{ $t("activityDetail.gold") }}</i>
                            <em>{{item.time}}</em>
                        </li>
                    </ul>
                    <div style="text-align: center;" v-show="pageShow">
                        <el-pagination
                            @size-change="handleSizeChange4"
                            @current-change="handleCurrentChange4"
                            :current-page="currentPage"
                            :page-sizes="[5,10,20,30]"
                            :page-size="pageSize4"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="tipsmetotal">
                        </el-pagination>
                    </div>
                </div>

                <div class="fly-panel leifeng-rank" style="padding: 20px;min-height:100px" v-if="data==5">
                    <ul class="jie-row">
                        <li v-for="(item,index) in mytipsData">
                            <a href="javascript:;" class="home-jieda" @click="indexThreadEvent(item.fid)">Ta {{ $t("common.zai") }}<span style="color:#4F99CF;background:#FFF" v-html="item.title"></span></a>
                            <i>{{ $t("my.rewPost") }}{{item.name}} {{item.score}} {{ $t("activityDetail.gold") }}</i>
                            <em>{{item.time}}</em>
                        </li>
                    </ul>
                    <div style="text-align: center;" v-show="pageShow">
                        <el-pagination
                            @size-change="handleSizeChange5"
                            @current-change="handleCurrentChange5"
                            :current-page="currentPage"
                            :page-sizes="[5,10,20,30]"
                            :page-size="pageSize5"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="mytipstotal">
                        </el-pagination>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    export default{
        name:'home',
        data(){
            return{
                url:this.GLOBAL.baseUrl,
                current: 0,
                isactive: false,
                data: 0,
                liList: [
//                    {
//                    title: '发表的文章'
//                },
                    {title: this.$t("my.pub")},
                    {title: this.$t("my.rels")},
                    {title: this.$t("my.zan")},
                    {title: this.$t("my.care")},
                    {title: this.$t("my.rew")},
                    {title: this.$t("my.tip")}
                ],

//               个人信息
                infoDate:'',
//               Ta发表的帖子
                publishData:[],
                commentData:[],
                zanData:[],
                careData:[],
                tipsmeData:[],
                mytipsData:[],
                pageShow:false,
                currentPage: 1,
                pageSize:10,
                pageSize1:10,
                pageSize2:10,
                pageSize4:10,
                pageSize5:10,
                pageNum:1,
                pageNum1:1,
                pageNum2:1,
                pageNum4:1,
                pageNum5:1,
                publishtotal:0,
                commenttotal:0,
                zantotal:0,
                tipsmetotal:0,
                mytipstotal:0,

            }
        },
        created:function(){

        },
        watch: {
            '$route' (to, from) {
                this.$router.go(0);
            }},
        mounted:function(){
            this.publish()
            var me=this;
            var id = this.$route.params.id;
//           个人信息
            me.$axios.post(me.url+"/user/info?id="+id)
                .then(function (result) {
                    me.infoDate=result.data
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        methods:{
            addClass: function(index) {
                this.current = index;
                this.data = index;
            },
//            取消赞
           cancelzan: function(index,id) {
            var me=this;
           me.$axios.post(me.url+"/user/interact?id="+id+"&action=zan&target=forum")
            .then(function (result) {
                me.$message({
                    message: me.$t("my.cancelS"),
                    type: 'success'
                })
                me.zanData.splice(index,1);
            })
            .catch(function (error) {
                console.log(error);
            });
    },
//            Ta发表的帖子
            publish(){
                var me=this;
                var id = this.$route.params.id;
                me.$axios.post(me.url+"/forum/my?page=" + this.pageNum + "&size=" + this.pageSize+"&id="+id)
                    .then(function (result) {

                        me.publishData=result.data.list;
                        me.publishtotal=result.data.total;
                        if(me.publishtotal>1){
                            me.pageShow=true
                        }else{
                            me.pageShow=false
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
//            Ta回复的帖子
            comment(){
                var me=this;
                var id = this.$route.params.id;
                me.$axios.post(me.url+"/comment/my?page=" + this.pageNum1 + "&size=" + this.pageSize1+"&id="+id)
                    .then(function (result) {
                        me.commentData=result.data.list;
                        me.commenttotal=result.data.total;
                        if(me.commenttotal>1){
                            me.pageShow=true
                        }else{
                            me.pageShow=false
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
//            Ta点赞的帖子
            zan(){
                var me=this;
                var id = this.$route.params.id;
                me.$axios.post(me.url+"/user/zan?target=forum&page=" + this.pageNum2 + "&size=" + this.pageSize2+"&id="+id)
                    .then(function (result) {
                        me.zanData=result.data.list;
                        me.zantotal=result.data.total;
                        if(me.zantotal>1){
                            me.pageShow=true
                        }else{
                            me.pageShow=false
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
//           Ta关注的用户
            care(){
                var me=this;
                var id = this.$route.params.id;
                me.$axios.post(me.url+"/user/care?id="+id)
                    .then(function (result) {
                        me.careData=result.data;
                        me.caretotal=result.data.total;
                        if(me.caretotal>1){
                            me.pageShow=true
                        }else{
                            me.pageShow=false
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
//            Ta被打赏记录
            tipsme(){
                var me=this;
                var id = this.$route.params.id;
                me.$axios.post(me.url+"/user/tipsme?page=" + this.pageNum4 + "&size=" + this.pageSize4+"&id="+id)
                    .then(function (result) {
                        me.tipsmeData=result.data.list;
                        me.tipsmetotal=result.data.total;
                        if(me.tipsmetotal>1){
                            me.pageShow=true
                        }else{
                            me.pageShow=false
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
//            Ta的打赏记录
            mytips(){
                var me=this;
                var id = this.$route.params.id;
                me.$axios.post(me.url+"/user/mytips?page=" + this.pageNum5 + "&size=" + this.pageSize5+"&id="+id)
                    .then(function (result) {
                        me.mytipsData=result.data.list;
                        me.mytipstotal=result.data.total;
                        if(me.mytipstotal>1){
                            me.pageShow=true
                        }else{
                            me.pageShow=false
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            listEvent(index){
                if(index==0){
                    this.publish()
                }
                if(index==1){
                    this.comment()
                }
                if(index==2){
                    this.zan()
                }
                if(index==3){
                    this.care()
                }
                if(index==4){
                    this.tipsme()
                }
                if(index==5){
                    this.mytips()
                }
            },
            indexThreadEvent(id){
                this.$router.push({
                    path: `/indexThread/${id}`
                })
            },
            homesEvent(id){
                this.$router.push({
                    path: `/homes/${id}`
                })
            },
            handleSizeChange(val) {
                this.pageSize=val;
                this.publish();
            },

            handleSizeChange1(val) {
                this.pageSize1=val;
                this.comment();
            },
            handleSizeChange2(val) {
                this.pageSize2=val;
                this.zan();
            },
            handleSizeChange4(val) {
                this.pageSize4=val;
                this.tipsme();
            },
            handleSizeChange5(val) {
                this.pageSize5=val;
                this.mytips()
            },

            handleCurrentChange(val) {
                this.pageNum=val;
                this.publish();
            },
            handleCurrentChange1(val) {
                this.pageNum1=val;
                this.comment();
            },
            handleCurrentChange2(val) {
                this.pageNum2=val;
                this.zan();
            },
            handleCurrentChange4(val) {
                this.pageNum4=val;
                this.tipsme();
            },
            handleCurrentChange5(val) {
                this.pageNum5=val;
                this.mytips()
            }
        }
    }
</script>
<style>
    .layui-tab-title li{
    line-height:40px;
    }
    .layui_bg_gray{
        background-color: #eee!important;
        color: #009688!important;
        border-bottom: 2px solid #5FB878;
    }
    .layui-tab-title a:hover{
        color: #009688;
    }
    .active{
        overflow: hidden;
    }
    .cont{
        padding: 0 0px!important;
    }
    .el-pagination__total {
        display: none !important;
    }

    .el-pagination__sizes {
        display: none !important;
    }
    @media screen and (max-width: 991px){
        .layui-unselect{
            display:block!important;
        }
        .layui-tab{
            overflow: hidden;
        }
    }
    @media screen and (min-width: 768px) {
        .el-pagination__total {
            display: inline-block !important;
        }

        .el-pagination__sizes {
            display: inline-block !important;
        }
    }
</style>
