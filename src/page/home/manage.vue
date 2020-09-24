<template>
    <div>
        <div class="layui-container fly-marginTop fly-user-main">
            <ul class="layui-nav layui-nav-tree layui-inline" lay-filter="user" :class="{ 'user': mask, 'users': !mask }"  @click="listBtn">
                <li class="layui-nav-item">
                    <router-link to="/home" active-class="layui-this">
                        <i class="layui-icon">&#xe68e;</i> {{ $t("my.home") }}
                    </router-link>
                </li>
                <li class="layui-nav-item">
                    <router-link to="/usercenter" active-class="layui-this">
                        <i class="layui-icon"></i> {{ $t("my.base") }}
                    </router-link>
                </li>
                <li class="layui-nav-item">
                    <router-link to="/userset" active-class="layui-this">
                        <i class="layui-icon"></i> {{ $t("my.base") }}
                    </router-link>
                </li>
                <li class="layui-nav-item">
                    <router-link to="/information" active-class="layui-this">
                        <i class="layui-icon">&#xe66f;</i> {{ $t("my.info") }}
                    </router-link>
                </li>
                <li class="layui-nav-item">
                    <router-link to="/mytopic" active-class="layui-this">
                        <i class="layui-icon"></i> {{ $t("my.post") }}
                    </router-link>
                </li>
                 <li class="layui-nav-item">
                     <router-link to="/myactivity" active-class="layui-this">
                         <i class="layui-icon">&#xe634;</i>{{ $t("my.activity") }}
                     </router-link>
                </li>
                <li class="layui-nav-item">
                    <router-link to="/vote" active-class="layui-this">
                        <i class="layui-icon">&#xe628;</i>{{ $t("my.vote") }}
                    </router-link>
                </li>
                <li class="layui-nav-item">
                    <router-link to="/reply" active-class="layui-this">
                        <i class="layui-icon"></i> {{ $t("my.reply") }}
                    </router-link>
                </li>
                <li class="layui-nav-item">
                    <router-link to="/messages" active-class="layui-this">
                        <i class="layui-icon"></i> {{ $t("my.meaasge") }}
                    </router-link>
                </li>
                <li class="layui-nav-item">
                    <router-link to="/clock" active-class="layui-this">
                        <i class="layui-icon"></i> {{ $t("my.sign") }}
                    </router-link>
                 </li>
                <li class="layui-nav-item">
                    <router-link to="/attendance" active-class="layui-this">
                        <i class="layui-icon">&#xe637;</i> 考勤报表
                    </router-link>
                </li>
                <li class="layui-nav-item">
                    <router-link to="/holiday" active-class="layui-this">
                        <i class="layui-icon">&#xe60a;</i> {{ $t("add.myHoliday") }}
                    </router-link>
                </li>
                <li class="layui-nav-item">
                    <router-link to="/overtime" active-class="layui-this">
                        <i class="layui-icon">&#xe7ae;</i> {{ $t("home.myremi") }}
                    </router-link>
                </li>
                <li class="layui-nav-item">
                    <router-link to="/reimbursement" active-class="layui-this">
                        <i class="layui-icon">&#xe609;</i> 我的工资
                    </router-link>
                </li>
                <!--<li class="layui-nav-item">-->
                    <!--<router-link to="/reimbursement" active-class="layui-this">-->
                        <!--<i class="layui-icon">&#xe609;</i> {{ $t("my.bao") }}-->
                    <!--</router-link>-->
                <!--</li>-->
                <!--<li class="layui-nav-item">-->
                    <!--<router-link to="/project" active-class="layui-this">-->
                        <!--<i class="layui-icon">&#xe7ae;</i> {{ $t("my.project") }}-->
                    <!--</router-link>-->
                <!--</li>-->
                <!--<li class="layui-nav-item">-->
                     <!--<router-link to="/share" active-class="layui-this">-->
                       <!--<i class="layui-icon">&#xe609;</i>我的分享-->
                     <!--</router-link>-->
                <!--</li>-->
                <li class="layui-nav-item">
                    <router-link to="/enclosure" active-class="layui-this">
                        <i class="layui-icon"></i> {{ $t("home.enclosure") }}
                    </router-link>
                </li>
            </ul>
            <div class="fly-panel fly-panel-user" pad20="">
                <keep-alive>
                   <router-view></router-view>
                </keep-alive>
            </div>
        </div>
        <div class="site-mobile-shade" v-show="icons" @click="masktn"></div>
        <div class="site-trees" @click="menuBtn" v-show="mask">
            <i class="layui-icon"></i>
        </div>
    </div>

</template>

<script>
    export default {
        data () {
            return {
              mask:true,
              icons:false
            }
        },
//        props:['dialogCreate'],
        methods: {
            menuBtn(){
                this.mask=false;
                this.icons=true;
            },
            masktn(){
                this.mask=true;
                this.icons=false;
            },
            listBtn(){
                this.mask=true;
                this.icons=false;
            }

        }
    }
</script>


<style scoped>
    .fly-marginTop{
        margin-top:15px!important;
    }
    .site-trees{
        display:none;
    }
    .user {
        left: -300px;
        z-index:99;
    }
    .users{
        left: 0px;
        z-index:99;
    }
    @media screen and (min-width: 768px){
        .site-tree-mobile {
            display: none;
        }
        .site-mobile .site-tree-mobile {
            display: block !important;
        }
        .fly-user-main>.layui-nav {
            left: 0px;
        }
    }
    @media screen and (max-width: 768px) {
        .site-mobile-shade {
            margin-top: 60px;
            content: '';
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(0, 0, 0, .9);
            z-index: 98;
        }

        .fly-marginTop {
            margin-top: 0px !important;
        }
        .site-trees{
            display: block;
            position: fixed;
            z-index:99;
            bottom: 20px;
            left: 10px;
            width: 50px;
            height: 50px;
            line-height: 50px;
            border-radius: 2px;
            text-align: center;
            background-color: rgba(0,0,0,.7);
            color: #fff;
        }
    }
</style>
