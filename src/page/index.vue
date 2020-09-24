<template>
    <div>
        <my-search></my-search>
        <div class="layui-container">
            <div class="layui-row layui-col-space15">
                <div class="layui-col-md8">
                    <!--<el-row>-->
                        <!--<el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8"><div class="grid-content bg-purple">倒计时:{{countDownList}}</div></el-col>-->
                        <!--<el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8"><div class="grid-content bg-purple-light"></div></el-col>-->
                        <!--<el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8"><div class="grid-content bg-purple"></div></el-col>-->
                        <!--<el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8"><div class="grid-content bg-purple"></div></el-col>-->
                        <!--<el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8"><div class="grid-content bg-purple-light"></div></el-col>-->
                        <!--<el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8"><div class="grid-content bg-purple"></div></el-col>-->
                        <!--<el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8"><div class="grid-content bg-purple"></div></el-col>-->
                        <!--<el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8"><div class="grid-content bg-purple-light"></div></el-col>-->
                        <!--<el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8"><div class="grid-content bg-purple"></div></el-col>-->
                    <!--</el-row>-->
                    <div class="fly-panel" style="margin-bottom: 0;margin-top:15px;">
                        <ul class="fly-list Hheight">
                            <li v-for="(item,index) in navigation"   @click="newPage(item.id,item.name)">
                                <a href="javascript:;" class="layui-this">{{index+1}}、{{item.name}}</a>
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
                    <my-sign></my-sign>
                    <my-replyCard></my-replyCard>
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
        name: 'Index',
        data () {
            return {
                navigation: [],
                url:this.GLOBAL.baseUrl,
                APPID : "wx24d67558ce36e84e",
                countDownList: '',
                actEndTime: '2019-05-30 9:29:00',
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
            'my-sign':Sign,
            'my-replyCard':replyCard
        },
        created(){
            this.countDown();
            this.list(parseInt(this.currentPage))
        },
        mounted(){
            var me=this;
            var url = window.location.href;
            var reg = new RegExp("token=jingweishequ");
            if(reg.test(url)){
                var code =url.match(/code=(\S*)&state/);
                if(!code){
                    window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+me.APPID
                        + "&redirect_uri="+"http%3A%2F%2Fydbbs.yinlingfuwu.com%3Ftoken%3Djingweishequ"
                        + "&response_type=code"
                        + "&scope=snsapi_userinfo"
                        + "&state=STATE#wechat_redirect";
                }else{
                    me.$axios.post(me.url+"/wx/callBack?code="+code[1])
                        .then(function (result) {
                            console.log(result)
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            }
        },
        methods:{
            newPage(id,res){
                sessionStorage.setItem('titleOne',res)
                sessionStorage.setItem('titleOneId',id)
                this.$router.push({
                    path: `/indexSecond/${id}`,
                    params: { name: res }
             })
            },
            list(mypages){
                var me = this;
                me.$axios.post(me.url + "/forumcate?page=" + mypages + "&size=" + this.pageSize)
                    .then(function (result) {
                        me.navigation = result.data.list;
                        me.totalCount=result.data.total;
                        if( me.totalCount>10 ){
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
            timeFormat(param) {
                return param < 10 ? '0' + param : param;
            },
            countDown(it) {
                var interval = setInterval(() => {
            
               let newTime = new Date().getTime();
                
                let endTime = new Date(this.actEndTime).getTime();
                let obj = null;
               
                if (endTime - newTime > 0) {
                    let time = (endTime - newTime) / 1000;
                  
                    let day = parseInt(time / (60 * 60 * 24));
                    let hou = parseInt(time % (60 * 60 * 24) / 3600);
                    let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
                    let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
                    obj = {
                        day: this.timeFormat(day),
                        hou: this.timeFormat(hou),
                        min: this.timeFormat(min),
                        sec: this.timeFormat(sec)
                    };
                } else { // 活动已结束，全部设置为'00'
                    obj = {
                        day: '00',
                        hou: '00',
                        min: '00',
                        sec: '00'
                    };
                    clearInterval(interval);
                }
                this.countDownList = obj.day + '天' + obj.hou + '时' + obj.min + '分' + obj.sec + '秒';
                if(this.countDownList=='00天00时00分00秒'){
                    this.show=true;
                }
            }, 1000);
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
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        min-height:100px;
        line-height:100px;
        text-align: center;
    }
</style>
