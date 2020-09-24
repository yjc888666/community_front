<template>
    <div class="layui-container fly-marginTop">
        <div class="fly-panel fly-panel-user" pad20>
            <div class="layui-tab layui-tab-brief">
                <ul class="layui-tab-title">
                    <li class="layui-this">{{ $t("common.login") }}</li>
                </ul>
                <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item :label="$t('register.name')" prop="username">
                            <el-input v-model="ruleForm.username" :placeholder="$t('verification.nameP')"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('register.pass')" prop="password">
                            <el-input type="password" v-model="ruleForm.password"  :placeholder="$t('verification.passP')"></el-input>
                        </el-form-item>
                        <div class="layui-form-item">
                            <router-link to="/forget" class="forget">{{ $t("register.forget") }}</router-link>
                        </div>
                        <el-button type="primary" @click="submitForm('ruleForm')">{{ $t("register.imLogin") }}</el-button>
                        <el-button @click="zuceForm('ruleForm')">{{ $t("register.Registered") }}</el-button>
                        <!--<el-button @click="ewmEvent">微信</el-button>-->
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {login, getAdminInfo} from '@/api/getData'
    export default {
        name: "Login",
        data() {
            return {
                url:this.GLOBAL.baseUrl,
                ruleForm: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [
                        { required: true, message: this.$t('verification.nameP'), trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: this.$t('verification.passP'), trigger: 'blur' },
//                        {min: 6, max: 16, message: '长度在 6 到 16个字符', trigger: 'blur'}
                    ],
                }
            }
        },
    methods: {
        async submitForm(formName) {
            var me=this;
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    this.$axios.post(me.url+"/user/land", this.ruleForm)
                        .then(function (result) {
                            if(result.data.result===false){
                                me.$message({
                                    message: result.data.msg,
                                    type: 'error'
                                })
                            }
                            if(result.data.result===true){

                                me.$store.dispatch("login",result.data.pojo).then(() => {
                                 me.$message({
                                    message:me.$t('common.loginS'),
                                    type: 'success'
                                 })
                            });
                             me.$store.state.isLogin=true
                                let redirect = decodeURIComponent(me.$route.query.redirect || '/');
                                me.$router.push({ path: redirect })
                            }

                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    this.$message({
                    message: me.$t('common.loginF'),
                    type: 'error'
                })
            return false;
        }
        });
        },
        zuceForm(formName) {
            this.$router.push({path: '/step'});
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
     ewmEvent(){
        var me=this;
        me.$axios.post(me.url+"/nei")
            .then(function (res) {
                console.log(res)
                var l=(screen.availWidth-800)/2;
                var t=(screen.availHeight-600)/2;
                window.open(res.data, '_blank', 'toolbar=no, width=800, height=600,top='+t+',left='+l+'')


            })
            .catch(function (error) {
                console.log(error);
            });
    },
    },
    mounted(){
    },
    watch: {
        adminInfo: function (newValue){
            if (newValue.id) {
                this.$message({
                    type: 'success',
                    message: '检测到您之前登录过，将自动登录'
                });
                this.$router.push({path: '/'});
            }

        }
    }
    }
</script>
<style>
    .layui-form select {
        width: 190px;
        padding-left: 10px;
        display: block;
        height: 38px;
        line-height: 1.3;
        border: 1px solid #E6E6E6;
        background-color: #fff;
        color: #C2C2C2;
    }
    .el-form-item__label {
        width: 110px;
        padding: 10px 15px;
        height: 38px;
        line-height: 18px;
        border: 1px solid #E6E6E6;
        border-radius: 2px 0 0 2px;
        text-align: center;
        background-color: #FBFBFB;
        overflow: hidden;
        white-space: nowrap;
        box-sizing: border-box;
        border-right: 0;
    }

    .el-input__inner {
        border-radius: 0;
        height: 38px;
        border: 1px solid #E6E6E6;
    }

    .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before {
        content: '';
        color: #f56c6c;
        margin-right: 4px;
    }

    .el-button--primary {
        background-color: #009688;
        color: #fff;
        white-space: nowrap;
        text-align: center;
        font-size: 14px;
        border: none;
    }
    .el-button {
        height: 38px;
        border-radius: 2px;
        cursor: pointer;
    }
    .el-notification {
        width: 290px;
    }
    .el-button--primary:hover {
        background: #33ABA0;
        border-color: #33ABA0;
        color: #fff;
    }
    .el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus {
        border-color: #009688;
    }
    .forget{
        padding-top:0px;
        margin-right: 10px;
    }
    .forget:hover{
        color: #009688;
    }
    .el-button--default:hover{
        color: #009688;
        border-color: #009688;
        background-color: #fff;
    }
    .el-form-item {
        margin-bottom: 22px;
    }
    @media (min-width: 768px){
        .el-input {
            width: 100%;
        }
    }
    @media (min-width: 992px){
        .el-input {
            width: 200px;
        }
    }



</style>

