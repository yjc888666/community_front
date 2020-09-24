<template>
    <div class="fly-header layui-bg-green" style="border-bottom: 1px solid #01AAED;">
        <div class="layui-container">
            <router-link to="/" class="fly-logo" style="top: 0;">
                <img src="../assets/img/zongbu.png" style="height:60px" alt="laysns" v-show="!show">
                <img :src="url+logo" style="height:60px" alt="laysns" v-show="show">
            </router-link>
            <ul class="layui-nav fly-nav layui-hide-xs">
                <li class="layui-nav-item">
                    <!--<a href="/index" target="_self" title="">-->
                        <!--<i class="layui-icon"></i>社区首页 -->
                    <!--</a>-->
                    <router-link to="/index"></router-link>
                </li>
                <span class="layui-nav-bar" style="width: 0px; left: 70.5px; opacity: 0; top: 55px;"></span></ul>
            <div class="layui-nav fly-nav-user">
                <!-- 登录前 -->
                <ul v-show="!isLogin">
                    <li class="layui-nav-item">
                        <a href="javascript:;" target="_self" title=""></a>
                        <router-link to="/login" class="iconfont icon-touxiang layui-hide-xs" style="font-size:34px"></router-link>
                    </li>
                    <li class="layui-nav-item">
                        <router-link to="/login">{{ $t("common.login") }}</router-link>
                    </li>
                    <li class="layui-nav-item">
                        <router-link to="/step">{{ $t("register.zuce") }}</router-link>
                    </li>
                </ul>
                <!-- 登录后 -->
                <!--<el-dropdown   @command="handleCommand"  v-show="isLogin" menu-align='start' :visible-change="isLogin">-->
                <el-dropdown   @command="handleCommand"  v-show="isLogin" trigger="click">
                    <div>
                        <span style="color: rgba(255,255,255,.7);display: block;float:left;line-height:60px;margin-right:10px;margin-left:10px" >{{name}}</span>
                        <!--<i class="iconfont icon-touxiang" style="font-size:34px;color:#fff;line-height:60px"></i>-->
                        <img :src="url+userhead" alt="" style="width:36px;height:36px;border-radius:100%;line-height:60px;margin-top:12px;" >
                    </div>
                    <router-link to="/messages" class="fly-nav-msg"  v-show="message">{{message}}</router-link>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="usercenter">
                            <i class="layui-icon" style="font-size: 22px;"></i>
                            <span>{{ $t("my.personalCenter") }}</span>
                        </el-dropdown-item>
                        <el-dropdown-item command="index">
                            <i class="layui-icon" style="margin-left: 2px;font-size: 22px;"></i>
                            <span>{{ $t("my.shequ") }}</span>
                        </el-dropdown-item>
                        <el-dropdown-item command="clock">
                            <i class="layui-icon" style="margin-left: 2px;font-size: 22px;">&#xe60e;</i>
                            <span>{{ $t("my.entry") }}</span>
                        </el-dropdown-item>
                        <hr style="margin: 5px 0;">
                        <el-dropdown-item command="singout" style="text-align: center">{{ $t("common.exit") }}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>

        </div>
    </div>
</template>

<script>
    import {signout} from '@/api/getData'
    import {mapActions, mapState} from 'vuex'

    export default {
        name: 'Header',
        data(){
            return {
                url:this.GLOBAL.baseUrl,
                name:"",
                message:"",
                userhead:'',
                show:'',
                logo:""
            }
        },
        created(){
            var me = this;
            me.menuShow=false;
//            标记
            if(this.$store.state.user.username== undefined || this.$store.state.user.username ==''){

            }else{
                me.$axios.post(me.url+"/message/unread")
                    .then(function (result) {
                        if(result.data.login==false){
                            me.$router.push({path: '/login'});
                            sessionStorage.clear();
                            location.reload()
                            return;
                        }
                        me.message=result.data
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }

        },
        computed: {
            isLogin(){
                var me=this;
                this.name=this.$store.state.user.username;
                me.$axios.post(me.url+"/user/info")
                    .then(function (result) {
//                        me.userhead=result.data.userhead
                        if(result.data.userhead==undefined||result.data.userhead=='/'||result.data.userhead==''){
                            result.data.userhead=='/images/default.png'
                        }else{
                            me.userhead=result.data.userhead
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                return this.$store.state.isLogin;
            }
    },
    methods: {
         handleCommand(command){
            if (command == 'index') {
                this.$router.push('/');
            } else if (command == 'clock') {
                this.$router.push('/clock');
            }else if (command == 'usercenter') {
                this.$router.push('/usercenter');
            }
            else if (command == 'singout') {
                var me = this;
                me.$axios.post(me.url+"/user/exit")
                    .then(function (result) {
                        if (result.data.result === false) {
                            me.$message({
                                message: result.data.msg,
                                type: 'error'
                            })
                        }
                        if (result.data.result === true) {
                            sessionStorage.clear();
                            me.$store.state.isLogin=false;
                            me.$message({
                                message: me.$t("common.exitS"),
                                type: 'success'
                            })
                            me.$router.replace({path: '/login'});
                            //location.reload()
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            }
        }
    },
    mounted(){
        var me=this;
        me.$axios.post(me.url+"/seo/title")
            .then(function (res) {
                me.logo=res.data.logo
                if(res.data.logo!=''){
                   me.show=true;
                }else{
                   me.show=false;
                }
            })
            .catch(function (error) {
                console.log(error);
            });
            if(this.name== undefined || this.name ==''){
                this.$store.state.isLogin=false
            }else{
                this.$store.state.isLogin=true
            }
    }
    }
</script>
<style scoped>
    .fly-nav-user {
        position: absolute;
        top: 0;
        right: 0;
    }

    .avator {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        margin-right: 10px;
        margin-top: 12px;
    }

    .el-dropdown-menu__item {
        text-align: left;
    }
</style>
