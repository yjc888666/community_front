<template>
    <div class="layui-container fly-marginTop">
        <div class="fly-panel fly-panel-user" pad20>
            <div class="layui-tab layui-tab-brief">
                <ul class="layui-tab-title">
                    <li class="layui-this">已有账号，请绑定</li>
                </ul>
                <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="昵称" prop="username">
                            <el-input v-model="ruleForm.username" placeholder="昵称"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="password">
                            <el-input type="password" v-model="ruleForm.password"  placeholder="密码"></el-input>
                        </el-form-item>

                        <el-button type="primary" @click="submitForm('ruleForm')">立即绑定</el-button>

                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
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
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        {min: 6, max: 16, message: '长度在 6 到 16个字符', trigger: 'blur'}
                    ],
                }
            }
        },
    methods: {
        async submitForm(formName) {
            var me=this;
            this.$refs[formName].validate(async (valid) => {
                if (valid) {
                    this.$axios.post(me.url+"/bangdin", this.ruleForm)
                        .then(function (result) {
                            console.log(result)
                            if(result.data.result===false){
                                me.$message({
                                    message: result.data.msg,
                                    type: 'error'
                                })
                            }
                            if(result.data.result===true){
                                me.$store.dispatch("login",result.data.pojo).then(() => {
                                 me.$message({
                                    message: "登录成功",
                                    type: 'success'
                                 })
                            });

                             me.$store.state.isLogin=true
                                me.$router.push({path: '/'});

                            }

                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    this.$message({
                    message: '登录失败',
                    type: 'error'
                })
            return false;
        }
        });
        },
    },

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

