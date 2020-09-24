<template>
    <div id="signin" class="fly-panel fly-signin fly-panel-border">
        <div class="fly-panel-title">{{ $t("home.sign") }}
            <i class="fly-mid"></i>
            <a href="javascript:;" class="fly-link" id="LAY_signinHelp"
               @click="dialogTableVisible = true">{{ $t("my.explain") }}</a>
            <el-dialog :title="$t('my.signExplain')" :visible.sync="dialogTableVisible" class="layui-layer-title">
                <blockquote class="layui-elem-quote">{{ $t("home.rules") }}</blockquote>
                <table class="layui-table">
                    <thead>
                    <tr>
                        <th>{{ $t("my.continuousdays") }}</th>
                        <th>{{ $t("my.every") }}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(item,index) in signRule">
                        <td>≥{{item.days}}</td>
                        <td>{{item.score}}</td>
                    </tr>
                    </tbody>
                </table>
                <ul class="rule">
                    <li style="color: #FF5722;">{{ $t("my.newyaer") }}</li>
                    <li>{{ $t("my.rul") }}</li>
                </ul>
            </el-dialog>
            <i class="fly-mid"></i>
            <a href="javascript:;" class="fly-link" id="LAY_signinTop"
               @click="dialogTableactive = true">{{ $t("my.active") }}<span
                class="layui-badge-dot"></span></a>
            <el-dialog :title="$t('my.activeT')" :visible.sync="dialogTableactive"
                       class="layui-layer-title">
                <div class="el-dialog__body" style="padding:0">
                    <div id="layer-pop-signintop" class="layui-layer-content">
                        <div class="layui-tab layui-tab-brief" style="margin: -20px 0 0 -10px">
                            <ul class="layui-tab-title">
                                <li v-for="(item,index) in list" @click="tab(index)" :class="{'layui-this':index==num}">
                                    {{item.tab}}
                                </li>
                            </ul>
                            <div class="layui-tab-content fly-signin-list" id="LAY_signin_list">
                                <ul class="layui-tab-item mar"  v-show="item.show" v-for="(item,index) in list">
                                    <li  v-for="(items,index) in item.data">
                                        <a href="javascript:;" target="_blank" @click="homeEvent(items.uid)">
                                            <img :src="url+items.userhead">
                                            <cite class="fly-link">{{items.username}}</cite>
                                        </a>
                                        <span class="fly-grey" v-show="isShow" >{{ $t("my.signIn") }} {{items.stime}}</span>
                                        <span class="fly-grey1"  v-show="!isShow">{{ $t("my.continuousSignIn") }}
                                            <i>{{items.stime}}</i>
                                            {{ $t("common.day") }}
                                        </span>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>
                </div>
            </el-dialog>
            <span class="fly-signin-days" v-show="signDayShow">{{ $t("my.continuousSignIn") }}<cite>{{signdays}}</cite>{{ $t("common.day") }}</span>
        </div>
        <div class="fly-panel-main fly-signin-main">
            <button class="layui-btn layui-btn-danger" @click="signIn" v-if="btnShow">{{ $t("activityDetail.todaySign") }}</button>
            <button class="layui-btn layui-btn-disabled"  v-if="!btnShow">{{ $t("activityDetail.todaySignIn") }}</button>
            <span>{{ $t("my.gained") }}<cite>{{score}}</cite>{{ $t("activityDetail.gold") }}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Sign',
        data () {
            return {
                url:this.GLOBAL.baseUrl,
                dialogTableVisible: false,
                dialogTableactive: false,
                btnShow:false,
                signRule:[],
                num:0,
                list:[
                    {tab:this.$t("activityDetail.new"),show:true,data:[]},
                    {tab:this.$t("activityDetail.fast"),show:false,data:[]},
                    {tab:this.$t("activityDetail.all"),show:false,data:[]}
                ],
                isShow:true,
                score:'',
                signdays:'',
                signDayShow:''
            }
        },
        methods:{
            homeEvent(id){
                this.$router.push({
                    path: `/homes/${id}`
                })
            },
            signIn(){
                var me=this;
//                1、积分签到
                if(this.$store.state.user.username== undefined || this.$store.state.user.username ==''){
                    this.$message({
                        message: this.$t("common.loginP"),
                        type: 'error'
                    })
                    this.$router.push({
                        path: `/login`
                    })
                }else{
                    me.$axios.post(me.url+"/usersign/sign")
                        .then(function (res) {
                            console.log(res)
                            me.btnShow=false;
                            me.signdays=me.signdays+1;
                            location.reload();
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }


            },
            newSign(){
                var me=this;
                me.$axios.post(me.url+"/usersign/topbytime")
                    .then(function (res) {
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            one(){
                var me=this;
                me.$axios.post(me.url+"/usersign/topbytime")
                    .then(function (res) {
                        me.list[0].data=res.data
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            two(){
                var me=this;
                me.$axios.post(me.url+"/usersign/topbytime?type=today")
                    .then(function (res) {
                        me.list[1].data=res.data
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            three(){
                var me=this;
                me.$axios.post(me.url+"/usersign/topbydays")
                    .then(function (res) {
                        me.list[2].data=res.data
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            tab:function(index){
                this.num=index;
                if(this.num==0){
                    this.isShow=true;
                    this.one()
                }
                if(this.num==1){
                    this.isShow=true;
                    this.two()
                }
                if(this.num==2){
                    this.isShow=false;
                    this.three();
                }
                for(var i=0;i<this.list.length;i++){
                    this.list[i].show=false;
                }
                this.list[index].show=true;
            }
        },
        mounted(){
            var me=this;
            if(me.$store.state.isLogin==true){
                me.signDayShow=true;
 //             2、是否已签到
                me.$axios.post(me.url+"/usersign/ifsign")
                    .then(function (res) {
                        if(res.data.result==true){
                            me.btnShow=false;

                        }
                        if(res.data.result==false){
                            me.btnShow=true;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
            if(me.$store.state.isLogin==false){
                me.signDayShow=false;
                me.btnShow=true;
            }
//          3.连续签到天数
            me.$axios.post(me.url+"/usersign/signdays")
                .then(function (res) {
                    me.signdays=res.data.days;
                    me.score=res.data.score
                })
                .catch(function (error) {
                    console.log(error);
                });
//          签到说明
            me.$axios.post(me.url+"/usersign/rule")
                .then(function (res) {
                  me.signRule=res.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
              me.one();

        }

    }
</script>

<style scoped>
 .rule li{
     line-height:30px;
 }
    .layui-tab-item {
         display: block;
    }
   .mar{
       margin-left: -20px;
       margin-right: -20px;
   }
 .layui-tab-title li {
     line-height: 50px;
 }

</style>
