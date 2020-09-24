<template>
    <div class="fly-panel fly-panel-user">
        <div class="layui-tab layui-tab-brief" lay-filter="user">
            <ul class="layui-tab-title" id="LAY_mine" :class="{'layui-tab-more':!isShow}">
                <li lay-id="info" @click="tab=0" :class="{'layui-this':tab===0}">{{ $t("my.myinfo") }}</li>
                <li lay-id="avatar" @click="tab=1" :class="{'layui-this':tab===1}">{{ $t("home.imgs") }}</li>
                <li lay-id="pass" @click="tab=2" :class="{'layui-this':tab===2}">{{ $t("register.pass") }}</li>
                <li lay-id="bind" @click="tab=3" :class="{'layui-this':tab===3}">{{ $t("home.bing") }}</li>
                <span class="layui-unselect layui-tab-bar" lay-stope="tabmore" style="display:none"
                      @click="isShow=!isShow"><i lay-stope="tabmore" class="layui-icon"></i></span>
            </ul>
            <div class="layui-tab-content" style="padding: 20px 0;">
                <div class="layui-form layui-form-pane layui-tab-item" :class="{'layui-show':tab===0}">
                    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px"
                             class="demo-ruleForm">
                        <el-form-item :label="$t('home.username')" prop="username">
                            <el-input v-model="ruleForm.username"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('forget.sjh')" prop="mobile">
                            <el-input v-model="ruleForm.mobile" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item
                            prop="email"
                            :label="$t('forget.email')"
                            :rules="[{ required: true, message: $t('verification.emailNo') , trigger: 'blur'},{ type: 'email', message: $t('verification.emailyz'), trigger: ['blur', 'change'] }]">
                            <el-input v-model="ruleForm.email" :placeholder="infoDate.usermail"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('home.sex')">
                            <el-radio-group v-model="infoDate.sex" size="medium">
                                <el-radio  :label="1"  @click.native.prevent="clickitem(1)">{{ $t("common.male") }}</el-radio>
                                <el-radio  :label="0"  @click.native.prevent="clickitem(0)">{{ $t("common.female") }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item :label="$t('home.city')" prop="city">
                            <el-input v-model="ruleForm.city"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('register.groups')" prop="group">
                            <el-input v-model="ruleForm.group" :disabled="true"></el-input>
                        </el-form-item>
                        <div class="layui-form-item layui-form-text">
                            <label class="layui-form-label">{{ $t("home.autograph") }}</label>
                            <div class="layui-input-block">
                                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
                            </div>
                        </div>
                    </el-form>
                    <el-button type="primary" @click="submitFormInfo()">{{ $t("common.modify") }}</el-button>

                </div>

                <div class="layui-form layui-form-pane layui-tab-item" :class="{'layui-show':tab===1}">
                    <form method="post">
                        <div class="layui-form-item">
                            <div class="avatar-add">
                                <!--  action="http://47.94.215.133/file/uploadimg"-->
                                <el-upload
                                    class="upload-demo"
                                    action="https://neibu.qklshequ.com/bbs/file/uploadimg"
                                    :http-request="handlePost"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload">
                                    <el-button size="small" type="primary"><i class="layui-icon"></i>{{ $t("home.uploadImg") }}</el-button>
                                    <div slot="tip" class="el-upload__tip">{{ $t("home.uploadContent") }}</div>
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                </el-upload>
                            </div>
                        </div>
                        <el-button type="primary" @click="submitFormHeader()" :style="{'marginTop':'20px'}">{{ $t("common.modify") }}</el-button>
                    </form>


                </div>

                <div class="layui-form layui-form-pane layui-tab-item" :class="{'layui-show':tab===2}">
                    <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                        <el-form-item :label="$t('register.newPass')" prop="password">
                            <el-input type="password" v-model="ruleForm2.password" :placeholder="$t('verification.pass')"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('register.checkPass')" prop="checkpass">
                            <el-input type="password" v-model="ruleForm2.checkpass"  :placeholder="$t('verification.checkPass')"></el-input>
                        </el-form-item>
                        <el-button type="primary" @click="submitFormPass('ruleForm2')">{{ $t("common.modify") }}</el-button>
                    </el-form>
                </div>

                <div class="layui-form layui-form-pane layui-tab-item" :class="{'layui-show':tab===3}">
                    <ul class="app-bind">
                        <li class="fly-msg app-havebind" v-if="weixinShow==0">
                            <i class="layui-icon layui-icon-login-wechat" style="font-size: 18px; color: #474747;"></i>
                            <a href="javascript:;" class="acc-bind" type="qq_id" @click="ewmEvent">{{ $t("home.immBind") }}</a>
                            <span>{{ $t("home.chat") }}</span>
                        </li>
                        <li class="fly-msg app-havebind" v-if="weixinShow==1">
                            <i class="layui-icon layui-icon-login-wechat" style="font-size: 18px; color: #474747;"></i>
                            <a href="javascript:;" class="acc-bind" type="qq_id" @click="untyingEvent">{{ $t("home.immNoBind") }}</a>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    export default {
//        inject:['reload'],
        data () {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t("verification.passP")));
                } else {
                    if (this.ruleForm2.checkpass !== '') {
                        this.$refs.ruleForm2.validateField('checkpass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) =>{
                if (value === '') {
                    callback(new Error(this.$t("verification.twoPass")));
                } else if (value !== this.ruleForm2.password) {
                    callback(new Error(this.$t("verification.passCorrect")));
                } else {
                    callback();
                }
            }
            var validateMobilePhone = (rule, value, callback) =>{
                if (value === '') {
                    callback(new Error(this.$t("verification.sjh")));
                } else {
                    if (value !== '') {
                        var reg = /^1[3456789]\d{9}$/;
                        if (!reg.test(value)) {
                            callback(new Error(this.$t("verification.sjhCorrect")));
                        }
                    }
                    callback();
                }
            }
            return {
                url:this.GLOBAL.baseUrl,
                groups:[],
//              个人信息
                infoDate:'',
                tab: 0,
                isShow: true,
                imageUrl: '',
                userhead:"",
                ruleForm: {
                    username: "",
                    mobile: "",
                    email: "",
                    sex: '',
                    city: '',
                    group: '',
                    desc: ''
                },
                ruleForm2:{
                    password:"",
                    checkpass:''

                },
                rules: {
                    username: [
                        {required: true, message: this.$t("verification.nameP"), trigger: 'blur'},
                        {min: 2, max: 10, message: this.$t("verification.byte"), trigger: 'blur'}
                    ],
                    mobile: [
                        {validator: validateMobilePhone, trigger: 'blur'}
                    ],
                    password: [
                        {validator: validatePass, trigger: 'blur'},
                        {min: 6, max: 16, message:  this.$t("verification.sixLength"), trigger: 'blur'}
                    ],
                    checkpass: [
                        {validator: validatePass2, trigger: 'blur'},
                        {min: 6, max: 16, message: this.$t("verification.sixLength"), trigger: 'blur'}
                    ]
                },
                weixinShow:'',
            }
        },
        methods: {
            handleAvatarSuccess(res, file) {
                console.log(res.pojo)
                this.userhead=res.pojo
                this.imageUrl = URL.createObjectURL(file.raw);
                this.$message.success(this.$t("home.imgS"));
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isGif = file.type === 'image/gif';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG && !isPNG  && !isGif ) {
                    this.$message.error(this.$t("my.uploadFormat"));
                }
                if (!isLt2M) {
                    this.$message.error(this.$t("my.mb"));
                }
                return isJPG || isPNG  || isGif  && isLt2M;
            },
            handlePost(f) {
                var me = this;
                let fd = new FormData()
                fd.append('file', f.file)
                me.$axios.post(me.url + "/file/uploadimg", fd)
                    .then(function (result) {
                        if (result.data.result == true) {
                            me.$message({
                                message: result.data.msg,
                                type: 'success'
                            })
                            me.userhead=result.data.pojo;
                            me.imageUrl="https://neibu.qklshequ.com/bbs"+result.data.pojo;
                        }
                        if (result.data.result == false) {
                            me.$message({
                                message: result.data.msg,
                                type: 'error'
                            })
                        }
                    })
            },
//          上传头像
            submitFormHeader(){
                var me=this;
                me.$axios.post(me.url+"/user/userhead?userhead="+me.userhead)
                    .then(function (result) {
                        if(result.data.result==true){
                            me.$message({
                                message: result.data.msg,
                                type: 'success'
                            })
                            location.reload()
                        }
                        if(result.data.result==false){
                            me.$message({
                                message: result.data.msg,
                                type: 'error'
                            })
                        }
                    })
            },
            clickitem(sex){
                this.infoDate.sex = sex;
            },
            submitFormInfo(){
                var info = {
                    username:this.ruleForm.username,
                    mobile:this.ruleForm.mobile,
                    usermail:this.ruleForm.email,
                    sex:this.infoDate.sex,
                    userhome:this.ruleForm.city,
                    description:this.ruleForm.desc
                };
//               修改信息
                var me=this;
                me.$axios.post(me.url+"/user/edit", info)
                    .then(function (result) {
                        if(result.data.result==true){
                            me.$message({
                                message: result.data.msg,
                                type: 'success'
                            })
                        }
                        if(result.data.result==false){
                            me.$message({
                                message: result.data.msg,
                                type: 'error'
                            })
                        }
                    })

            },
//           密码的修改
            submitFormPass(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var me=this;
                        me.$axios.post(me.url+"/user/newpassword?password="+this.ruleForm2.password)
                            .then(function (result) {
                            if(result.data.result==true){
                             me.$message({
                                message: result.data.msg,
                                type: 'success'
                               })
                              location.reload()
                             sessionStorage.removeItem('vuex');
                             me.$router.push({path: '/login'});
                          }
                          if(result.data.result==false){
                            me.$message({
                                message: result.data.msg,
                                type: 'error'
                              })
                           }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }
            });
            },
//           绑定状态
            wxState(){
                var me=this;
                me.$axios.post(me.url+"/wxstate")
                    .then(function (res) {
                        if(res.data.result==true){
                            me.weixinShow=res.data.pojo
                        }
                        if(res.data.result==false){
                            me.weixinShow=res.data.pojo
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
//            绑定
            ewmEvent(){
                var me=this;
                me.$axios.post(me.url+"/getcode")
                    .then(function (res) {
                        var l=(screen.availWidth-800)/2;
                        var t=(screen.availHeight-600)/2;
                        window.open(res.data, '_blank', 'toolbar=no, width=800, height=600,top='+t+',left='+l+'')
                        me.$axios.post(me.url+"/callback?code="+"001LTaSa1RWEbw0Xz3Pa1wF8Sa1LTaSf"+"&state="+"STATE")
                            .then(function (result) {
                                if(result.result==true){
                                    alert(1)
                                }
                                if(result.result==false){
                                    alert(2)
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
//            解绑
            untyingEvent(){
                var me=this;
                me.$axios.post(me.url+"/delstate")
                    .then(function (res) {
                      if(res.data.result==true){
                          me.$message({
                              message: res.data.msg,
                              type: 'success'
                          })
                         me.wxState()
                      }
                     if(res.data.result==false){
                         me.$message({
                             message: res.data.msg,
                             type: 'error'
                         })
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        mounted(){
            var me=this;
//            我的资料
            me.$axios.post(me.url+"/user/info")
                .then(function (res) {
                    me.imageUrl=me.url+""+res.data.userhead;
                    me.infoDate=res.data;
                    me.ruleForm.username=res.data.username;
                    me.ruleForm.mobile=res.data.mobile;
                    me.ruleForm.email=res.data.usermail;
                    me.sex=res.data.sex;
                    me.ruleForm.city=res.data.userhome;
                    me.ruleForm.group=res.data.homeAuthGroupname;
                    me.ruleForm.desc=res.data.description;
                })
                .catch(function (error) {
                    console.log(error);
                });
            me.wxState();
        }
    }
</script>
<style>
    .avatar-add .upload-img {
        margin: 0 0 0 -99px;
    }
    .upload-demo{
        padding-top:20px;
        text-align: center;
        margin-bottom:10px;
    }
    .avatar-add{
        width:335px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #8c939d;
        border-radius: 50%;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    @media screen and (max-width: 410px) {
        .layui-tab-bar {
            display: block !important;
        }

        .layui-tab-title {
            overflow: hidden !important;
            line-height: 40px;
        }
    }

    .el-textarea__inner {
        border-radius: 0;
        border: 1px solid #E6E6E6;
        height: 80px;
    }

    .el-radio__input {
        margin-left: 10px;
    }

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
        width: 100px!important;
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
    }

    .el-input__inner {
        border-radius: 0;
        height: 38px;
        border: 1px solid #E6E6E6;
        margin-left: -1px;
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

    .el-button--primary:hover {
        background: #33ABA0;
        border-color: #33ABA0;
        color: #fff;
    }

    .el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus {
        border-color: #009688;
    }

    .forget {
        padding-top: 0px;
        margin-right: 10px;
    }

    .forget:hover {
        color: #009688;
    }

    .el-button--default:hover {
        color: #009688;
        border-color: #009688;
        background-color: #fff;
    }

    .el-form-item {
        margin-bottom: 22px;
    }

    .el-notification {
        width: 290px !important;
    }

    .el-select {
        width: 100%
    }

    @media screen and  (min-width: 768px) {
        .el-input {
            width: 100%;
        }

        .el-select {
            width: 100%
        }
    }

    @media screen and  (min-width: 992px) {
        .el-input {
            width: 200px;
        }

        .el-select {
            width: 200px;
        }
    }
    .el-upload-list--picture .el-upload-list__item{
        background: transparent;
        height: 250px;
        padding: 0;
        border: 0;
        margin-top: -30px;
    }
    .el-upload-list--picture .el-upload-list__item.is-success .el-upload-list__item-name {
      display:none;
    }
    .el-upload-list--picture .el-upload-list__item-status-label{
        display: none!important;
    }
    .el-upload-list--picture .el-upload-list__item-thumbnail{
        width:168px;
        height:168px;
    }
    .el-upload-list__item .el-icon-close{
        color:transparent;
    }
    .el-upload-list__item {
        display: none;
    }
</style>

