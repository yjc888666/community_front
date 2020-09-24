<template>
    <div id="app">
        <my-header id="head"></my-header>
        <!--<router-view v-if="isRouterAlive"></router-view>-->
        <router-view></router-view>
        <my-footer></my-footer>
        <ul class="layui-fixbar">
            <li class="layui-icon" lay-type="bar1" style="background-color:#009688" @click="addbbs()"></li>
            <li class="layui-icon layui-fixbar-top" lay-type="top" style="background-color: rgb(0, 150, 136); display:list-item"  @click="goAnchor('#head')"></li>
        </ul>
    </div>
</template>

<script>
    import Header from "./components/Header"
    import Footer from "./components/Footer"
    export default {
        name: 'App',
//      provide(){
//            return{
//             reload:this.reload
//            }
//        },
        data(){
        return{
//            isRouterAlive:true,
        }
     },
        components: {
            'my-header': Header,
            'my-footer': Footer,
        },
        methods: {
            addbbs(){
                if(this.$store.state.user.username== undefined || this.$store.state.user.username ==''){
                    this.$message({
                        message: "请登录",
                        type: 'error'
                    })
                    this.$router.push({
                        path: `/login`
                    })
                }else{
                    this.$router.push({
                        path: `/addBbs`
                    })
                }

            },
            goAnchor(selector) {
                var anchor = this.$el.querySelector(selector)
                document.body.scrollTop = anchor.offsetTop; // chrome
                document.documentElement.scrollTop = anchor.offsetTop; // firefox
            },
//          reload(){
//                this.isRouterAlive = false
//                this.$nextTick(function () {
//                    this.isRouterAlive = true
//                })
//            }
        },
        mounted(){
        //   this.WXConfig.wxShowMenu();
            var me=this;
            setInterval( () => {
                if(sessionStorage.getItem("vuex")){
                me.$axios.post("https://neibu.qklshequ.com/bbs/user/connect")
                    .then(function (result) {
                        me.infoDate=result.data
                        if(result.data.login==false&&sessionStorage.getItem("vuex")!=null){
                            me.$message({
                                message: '打开页面时间太长，请重新登录',
                                type: 'error'
                            })
                            sessionStorage.clear();
                            me.$router.push({path: '/login'});
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        }, 5000)
        }
    }
</script>

<style>
    #app {
        background: #F2F2F2;
    }
</style>
