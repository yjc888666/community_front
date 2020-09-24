<template>
    <div>
        <my-search></my-search>
        <div class="layui-container">
            <div class="layui-row layui-col-space15">
                <div class="layui-col-md8 content detail">
                    <div class="fly-panel detail-box">
                        <h1 v-html="data.title"></h1>
                        <div class="fly-detail-info">
                        <span class="layui-bg-orange" :class="{'layui-badge':data.myself}">
                            <a style="color:#fff;" href="javascript:;" @click="edit(data.id)" v-show="data.myself">{{ $t("common.edits") }}</a>
                        </span>
                            <div class="fly-admin-box" data-id="437"></div>
                    <span class="fly-list-nums">
                         <i class="iconfont" title="$t('indexSearch.popularity')"></i>
                        <em>{{data.view}}</em>
                    </span>
                        </div>
                        <div class="detail-about">
                            <a class="fly-avatar" href="javascript:;" @click="homeEvent(data.uid)">
                                <img :src="url+data.userhead" alt=""> </a>
                            <div class="fly-detail-user">
                                <a href="javascript:;" class="fly-link" @click="homeEvent(data.uid)">
                                    <cite>{{data.username}}</cite>
                                </a>
                            </div>
                            <div class="detail-hits" id="LAY_jieAdmin">
                                <span>{{data.add_time}}</span>
                            </div>
                        </div>
                        <div class="detail-body photos">
                            <div class="wangEditor-container cl" style="border: 0px solid #e6e6e6;">
                                <div class="wangEditor-txt" style="padding: 0;margin-top: 0;">
                                    <p v-html="data.content"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="fly-panel detail-box" style="text-align:center">

                        <div class="layui-btn-container comp"  >
                            <ul>
                                <div class="enlist" style="float:left;">
                                    <div><strong>{{ $t("add.votedeadline") }}:<i style="color:#FF5722">{{data. end_time }}</i></strong></div>
                                </div>
                                <li v-for="(item,index) in competitor" class="comp">
                                    <input type="checkbox" v-model="checkModel" :value="item.id">
                                    <span class="voteContent"> {{item.optionname}}</span>
                                    <span class="voteNum">{{item.peoples}}{{ $t("common.piao") }}</span>
                                </li>
                            </ul>
                        </div>
                        <button class="layui-btn layui-btn-danger" @click="state = !state,nimingEvent(state ? '0' : '1')">{{state ? '匿名' : '实名'}}</button>
                        <button class="layui-btn layui-btn-danger" @click="doVote" v-if="data.multiselect!=0">{{ $t("common.Single") }}{{ $t("add.toppiao") }}</button>
                        <button class="layui-btn layui-btn-danger" @click="doVote" v-if="data.multiselect!=1">{{ $t("common.multiple") }}{{ $t("add.toppiao") }}</button>
                    </div>

                    <div class="fly-panel detail-box" id="flyReply">
                        <div id="comment" > </div>
                        <fieldset class="layui-elem-field layui-field-title" style="text-align: center;">
                            <legend>{{ $t("add.record") }}</legend>
                        </fieldset>

                        <ul class="jieda">
                            <li  class="jieda-daan" v-for="(item,index) in recordList">
                                <div class="detail-about detail-about-reply" v-show="item.anonymity!=1">
                                    <a class="fly-avatar" href="javascript:;" @click="homeEvent(item.uid)">
                                        <img :src="url+item.userhead" @click="homeEvent(item.uid)">
                                    </a>
                                    <div class="fly-detail-user">
                                        <a href="javascript:;" class="fly-link">
                                            <cite class="username" v-show="!item.myself">{{item.username}}<i v-show="item.louzhu">{{ $t("activityDetail.louzhu") }} </i></cite>
                                            <cite class="username" v-show="item.myself">{{ $t("common.mine") }}<i v-show="item.louzhu"> {{ $t("activityDetail.louzhu") }}</i></cite>
                                        </a>
                                    </div>
                                    <div class="detail-hits">
                                        <span>{{item.time}}</span>
                                    </div>
                                </div>
                                <div class="detail-about detail-about-reply" v-show="item.anonymity!=0">
                                    <a class="fly-avatar" href="javascript:;" >
                                        <img src="https://neibu.qklshequ.com/bbs/images/default.png">
                                    </a>
                                    <div class="fly-detail-user">
                                        <a href="javascript:;" class="fly-link">
                                            <cite class="username">{{ $t("common.name") }}</cite>
                                        </a>
                                    </div>
                                    <div class="detail-hits">
                                        <span>{{item.time}}</span>
                                    </div>
                                </div>
                                <div class="detail-body jieda-body photos">
                                    <p></p><p>{{item.content}}</p><p></p>
                                </div>
                            </li>
                        </ul>


                        <div v-show="pageShow">
                            <el-pagination
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-sizes="[5,10,20,30]"
                                :page-size="pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="totalCount">
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
    export default {
        name: 'voteDetail',
        data () {
            return {
                url:this.GLOBAL.baseUrl,
                data: '',
                competitor:[],
                content: '<h3></h3>',
                totalCount:0,
//                <!--当前页数-->
                currentPage:1,
//                <!--每页条数-->
                pageSize:10,
                pageNum:1,
                pageShow:false,
                ids:[],
                checkModel:[],
                checkAll:false,
                recordList:[],
                state: true,
                anonymity:""

            }
        },
        components: {
            'my-search': Search,
            'my-memo': Memo,
            'my-hot': Hot,
        },
        watch:{
            checkModel: {
                handler () {
                    if(this.checkModel.length==this.competitor.length){
                        this.checkAll=true;
                    }else{
                        this.checkAll=false;
                    }
                },
                deep: true
            },
        },
        methods: {
            handleSizeChange(val) {
               this.pageSize=val;
                this.record()
            },
            handleCurrentChange(val) {
                this.pageNum=val;
                this.record()
            },
            edit(id){
                this.$router.push({
                    path: `/editVote/${id}`
                })
            },
            homeEvent(id){
                this.$router.push({
                    path: `/homes/${id}`
                })
            },
            nimingEvent(val){
                this.anonymity=val;
            },
            vote(){
                var id = this.$route.params.id
                var me = this;
                me.$axios.post(me.url+"/vote/info?id="+id)
                    .then(function (result){
                        if(result.data.result==true){
                            me.data = result.data.pojo.vote;
                            me.competitor=result.data.pojo.optionnames
                        }
                        if(result.data.result==false){
                            if(result.data.login==false){
                                me.$message.error(me.$t("common.noLogin"));
                                me.$router.push({path: '/login'});
                            }
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            doVote(){
                var para={
                    id: this.$route.params.id,
                    ids:this.checkModel,
                    anonymity:this.anonymity
                }
                var me = this;
                if(this.checkModel.length==0){
                    me.$message.error(me.$t("add.chooseVote"))
                }else{

                    me.$axios.post(me.url+"/vote/do",para)
                        .then(function (result){
                            if(result.data.result==true){
                                me.$message.success(me.$t("add.voteSuccess"))
                                me.vote();
                                me.record();
                            }
                            if(result.data.result==false){
                                me.$message.error(result.data.msg)
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        })
                }

            },
            record(){
                var id = this.$route.params.id
                var me = this;
                me.$axios.post(me.url+"/vote/peoplelist?id="+id+"&page=" + this.pageNum + "&size=" + this.pageSize)
                    .then(function (result){
                        me.recordList=result.data.list;
                        me.totalCount=result.data.total;
                        if(me.totalCount>1){
                            me.pageShow=true
                        }else{
                            me.pageShow=false
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        mounted(){
             var me=this;
              me.anonymity=0
              me.vote();
              me.record();
        }
    }
</script>

<style >
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
    .jieda li:last-child{
        border-bottom: 0;
    }
    .edit_container{
        margin-top:25px;
    }
    .ql-editor {
        min-height: 120px!important;
    }
    .reward {
        width: 320px;
        height: 363px;
        border-radius: 14px;
        padding: 0 40px;
    }
    .close_reward {
        width: 46px;
        height: 46px;
        position: absolute;
        right: 1px;
        cursor: pointer;
    }
    div#reward_form {
        text-align: center;
        margin: 40px 0 0;
    }
    .reward_btn {
        background: #f1bc78;
        position: absolute;
        bottom: 40px;
        font-size: 30px;
        color: #d3454e;
        width: 320px;
        text-align: center;
        line-height: 60px;
        border-radius: 5px;
        cursor: pointer;
    }
    .reward_name {
        text-align: center;
        margin: 10px;
        font-size: 20px;
        color: #fff;
    }
    .reward_avatar {
        text-align: center;
    }
    .reward_avatar img {
        border-radius: 100px;
        width: 92px;
        height: 92px;
        margin-top: -45px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.46);
    }
    div#reward_form input {
        background: 0;
        border: 0;
        color: #FBD776;
        font-size: 70px;
        text-align: center;
        width: 155px;
    }
    div#reward_form i {
        color: #FBD776;
        font-style: normal;
        margin-left: 10px;
        font-size: 20px;
    }
    .layui-layer-page .layui-layer-content {
        position: relative;
    }
    .layui-layer-shade {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        position: fixed;
    }
    .wangEditor-txt{
        overflow: hidden;
    }
    .w-e-text-container{
       z-index:90!important;
    }
    .enlist div{
        line-height:22px;
        font-size:14px;
    }
    .comp input{
        margin-top:6px;
    }
    .comp{
        width:100%;
        overflow: hidden;
    }
   .comp span {
       font-size:18px;
   }
   .comp input{
       float:left;
   }
   .voteContent{
       float:left;
   }
    .voteNum{
        float:right;
    }
    .detail-box{
        overflow: hidden;
    }
</style>
