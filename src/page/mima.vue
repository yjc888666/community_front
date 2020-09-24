<template>
    <div class="layui-container fly-marginTop">
        <div class="fly-panel fly-panel-user" pad20>
            <div class="layui-tab layui-tab-brief">
                <ul class="layui-tab-title">
                    <li class="layui-this">{{ $t("register.changePass") }}</li>
                </ul>
                <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
                    <div class="layui-tab-item layui-show">
                        <div class="layui-form layui-form-pane">
                            <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                                <el-form-item :label="$t('register.newPass')" prop="password">
                                    <el-input type="password" v-model="ruleForm2.password" :placeholder="$t('verification.pass')"></el-input>
                                </el-form-item>
                                <el-form-item :label="$t('register.checkPass')" prop="checkpass">
                                    <el-input type="password" v-model="ruleForm2.checkpass" :placeholder="$t('verification.checkPass')"></el-input>
                                </el-form-item>
                                <el-button type="primary" @click="submitFormPass('ruleForm2')">{{ $t("register.confirm") }}</el-button>
                            </el-form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
    export default {
        name: "mima",
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t('verification.passP')));
                } else {
                    if (this.ruleForm2.checkpass !== '') {
                        this.$refs.ruleForm2.validateField('checkpass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) =>{
                if (value === '') {
                    callback(new Error(this.$t('verification.twoPass')));
                } else if (value !== this.ruleForm2.password) {
                    callback(new Error(this.$t('verification.passCorrect')));
                } else {
                    callback();
                }
            }
            return {
                url:this.GLOBAL.baseUrl,
                ruleForm2: {
                    password:"",
                    checkpass:''
                },
                rules: {
                    password: [
                        {validator: validatePass, trigger: 'blur'},
                        {min: 6, max: 16, message: this.$t('verification.sixLength'), trigger: 'blur'}
                    ],
                    checkpass: [
                        {validator: validatePass2, trigger: 'blur'},
                        {min: 6, max: 16, message: this.$t('verification.sixLength'), trigger: 'blur'}
                    ]
                },
                show: true,
                count: '',
                timer: null,
                disShow:true,
                disShowGo:true,
            }
        },
        methods: {
            submitFormPass(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var me=this;
                        me.$axios({
                            method: "POST",
                            url: me.url+"/user/newpassword?password="+this.ruleForm2.password,
                            headers: {
                                'token': sessionStorage.getItem('sessionId')
                            }
                        }).then(function(result) {
                            if(result.data.result==true){
                                me.$message({
                                    message: result.data.msg,
                                    type: 'success'
                                })
                                me.$router.push({path: '/login'});
                            }
                            if(result.data.result==false){
                                me.$message({
                                    message: result.data.msg,
                                    type: 'error'
                                })
                            }
                        });
                    }
                });
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

    .el-input {
        width: 200px;
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
        height:38px;
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

    .el-button--default {

    }

    .el-button--primary:hover {
        background: #33ABA0;
        border-color: #33ABA0;
        color: #fff;
    }

    .el-button--default:hover {
        border: 1px solid #009688;
        background: #fff;
    }

    .el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus {
        border-color: #009688;
    }
    .forget{
        display: block;
        padding-top:0px;
        padding-bottom:15px;
        margin-right: 10px;
    }
    .el-form-item{
        margin-bottom: 15px;
    }
    .forget:hover{
        color: #009688;
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
    .el-form-item {
        margin-bottom: 22px;
    }
    .el-button+.el-button {
        margin-left: 0px;
    }
</style>
