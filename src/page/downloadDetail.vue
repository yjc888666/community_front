<template>
    <div>
        <my-search></my-search>
        <div class="layui-container">
            <div class="layui-row layui-col-space15">
                <div class="layui-col-md8 content detail">
                    <div class="fly-panel detail-box">
                        <h1 v-html="data.name"></h1>
                        <div class="fly-detail-info">
                             <span class="layui-hide-xs">
                        <a style="color:#fff;" class="layui-badge layui-bg-green fly-detail-column"
                           href="javascript:;" @click="notelistEvent(data.tid)">{{data.title}}</a>
                        </span>
                            <div class="fly-admin-box"></div>
                    <span class="fly-list-nums">
                    <a href="javascript:void(0)">
                        <i class="iconfont"  title="$t('indexSearch.reply')"></i>
                        <em>{{data.reply}}</em>
                    </a>
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
                            <div class="enlist">
                                <div><strong>{{ $t("downLoad.file") }}:{{data. create_time}}</strong>  </div>
                                <div><strong>{{ $t("add.failureTime") }}:{{data. invalid_date }}</strong></div>
                                <div><strong>{{ $t("add.score") }}:{{data. score }}</strong></div>
                                <div><strong>{{ $t("downLoad.num") }}:{{data. download }}</strong></div>
                                <div><strong>{{ $t("downLoad.state") }}:{{data. status }}</strong></div>
                                <div><strong>{{ $t("downLoad.size") }}:{{data. size }}</strong></div>
                            </div>
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
        name: 'downloadDetail',
        data () {
            return {
                url:this.GLOBAL.baseUrl,
                data: '',
                content: '<h3></h3>',
                editorOption: {},
                payShow:true,
                replyData:[],
                totalCount:0,
//                <!--当前页数-->
                currentPage:1,
//                <!--每页条数-->
                pageSize:10,
                pageShow:false,
                replyShow:"",
                tipsShow:false,
//               打赏
                reward:'',
                louzuShow:true,
                louzuData:[],
                seeShow:false,
                seeNr:'只看楼主',
                huifuShow:false,
                huifuName:"",
                tid:'',
                replyid:'',
                replyItemShow:'',
                isClear: false,
                zldata: {
                    info:'',
                },
            }
        },
        components: {
            'my-memo': Memo,
            'my-hot': Hot,
            'my-search':Search
        },
        methods: {


        },
        mounted(){
            var me=this;
            var id = this.$route.params.id;
            me.$axios.post(me.url+"/file/detail?id="+id)
                .then(function (result) {
                    me.data=result.data
                    if(result.data.status==1){
                        result.data.status=='正常'
                    }
                    if(result.data.status==2){
                        result.data.status=='过期'
                    }
                    if(result.data.status==3){
                        result.data.status=='停用'
                    }
                   console.log(me.data)
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

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

</style>
