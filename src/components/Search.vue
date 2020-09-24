<template>
    <div class="fly-panel fly-column">
        <div class="v-modal v-modal-enter" style="z-index: 20000;" v-show="maskShow" @click="searchClick"></div>
        <div class="layui-container">
            <ul class="layui-clear">
                <el-breadcrumb separator="">
                <el-breadcrumb-item  @click.native.prevent="indexEvent" >{{ $t("common.first") }}</el-breadcrumb-item>
                <el-breadcrumb-item  v-show="titleOneShow"><a href="javascript:;" @click="titleOneEvent">{{titleOne}}</a></el-breadcrumb-item>
                <el-breadcrumb-item  v-show="titleTwoShow"><a href="javascript:;" @click="titleTwoEvent">{{titleTwo}}</a></el-breadcrumb-item>
                </el-breadcrumb>
            </ul>
            <div class="fly-column-right">
            <span class="fly-search" @click="searchClick"><i class="layui-icon">&#xe615;</i></span>
            <!--<router-link to="/addBbs" class="layui-btn">发表新帖</router-link>-->
            <a href="javascript:;" class="layui-btn" @click="addBbs">{{ $t("add.publishPost1") }}</a>
            <div class="layui-layer-content" v-show="maskShow">
                <input autocomplete="off" :placeholder='$t("add.enter")' type="text" class="search-inp"
                       v-model="search" @keyup.enter="searchs">
            </div>
        </div>
        </div>
    </div>
</template>

<script>
    import {signout} from '@/api/getData'
    import {baseImgPath} from '@/config/env'
    import {mapActions, mapState} from 'vuex'

    export default {
        name: 'Search',
        data(){
            return {
                maskShow: false,
                search: '',
                titleOne:'',
                titleTwo:'',
                titleOneId:'',
                titleTwoId:"",
                titleOneShow:false,
                titleTwoShow:false,
            }
        },
        created(){
            this.titleOne=sessionStorage.getItem('titleOne');
            this.titleOneId=sessionStorage.getItem('titleOneId');
            this.titleTwo=sessionStorage.getItem('titleTwo');
            this.titleTwoId=sessionStorage.getItem('titleTwoId');
            if(window.location.href=='https://neibu.qklshequ.com/#/'){
                sessionStorage.removeItem('titleOne');
                sessionStorage.removeItem('titleTwo');
                this.titleOneShow=false;
                this.titleTwoShow=false;
                this.titleOne='';
                this.titleTwo='';
            }
            if(window.location.origin+'/#/indexSecond/'=='https://neibu.qklshequ.com/#/indexSecond/'){
                this.titleOneShow=true;
            }
            if(window.location.origin+'/#/noteList/'=='https://neibu.qklshequ.com/#/noteList/'){
                this.titleOneShow=true;
                this.titleTwoShow=true
            }
            if(window.location.origin+'/#/activityList/'=='https://neibu.qklshequ.com/#/activityList/'){
                this.titleOneShow=false;
                this.titleTwoShow=false;
            }

        },
        methods: {
            addBbs(){
                if(this.$store.state.user.username== undefined || this.$store.state.user.username ==''){
                    this.$message({
                        message: this.$t("common.loginP"),
                        type: 'error'
                    })
                    sessionStorage.removeItem('titleOne');
                    sessionStorage.removeItem('titleTwo');
                    this.$router.push({
                        path: `/login`
                    })
                }else{
                    this.$router.push({
                        path: `/addBbs`
                    })
                }

            },
            searchClick(){
                this.maskShow = !this.maskShow;
            },
            searchs(){
                var me = this;
                var search = me.search
                if(search!=''){
                    me.$router.push({
                        path: `/indexSearch/${search}`,
                        replace: true
                    })
                }

            },
            indexEvent(){
                this.$router.push({
                    path: `/`
                })
                sessionStorage.removeItem('titleOne');
                sessionStorage.removeItem('titleTwo');
                this.titleOneShow=false;
                this.titleTwoShow=false;
            },
            titleOneEvent(){
                this.$router.push({
                    path: `/indexSecond/${this.titleOneId}`
                })
                this.titleOneShow=true;
                this.titleTwoShow=false;
                sessionStorage.removeItem('titleTwo');
            },
            titleTwoEvent(){
                this.$router.push({
                    path: `/noteList/${this.titleTwoId}`
                })
                this.titleOneShow=true;
                this.titleTwoShow=true;
            }
        }
    }
</script>

<style scoped>
    .layui-layer-content {
        position: fixed;
        display: inline-block;
        vertical-align: middle;
        background-color: #fff;
        z-index: 20001;
        top: 50%;
        left: 50%;
        margin-left: -195px;
        margin-top: -35px;
    }

    .search-inp {
        width: 350px;
        padding: 20px;
        font-size: 20px;
        border: none 0;
        background: none;
    }
    .el-breadcrumb {
        line-height:50px;
    }
    .el-breadcrumb:nth-child(1) {
        margin-left: 20px;
    }
    .el-breadcrumb__item__inner{
        color:#333!important;
    }
    .el-breadcrumb__item__inner a{
        color: #5FB878;
    }
    @media screen and (max-width: 768px){
        .el-breadcrumb {
            line-height: 36px;
        }
    }
    .el-breadcrumb__item{
       display: block!important;
    }
</style>
