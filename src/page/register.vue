<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief">
        <ul class="layui-tab-title">
          <li class="layui-this">{{ $t("register.zuce") }}</li>
        </ul>
        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item :label="$t('register.name')" prop="username">
              <el-input v-model="ruleForm.username" :placeholder="$t('verification.byte')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('register.pass')" prop="password">
              <el-input type="password" v-model="ruleForm.password"  :placeholder="$t('verification.pass')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('register.checkPass')" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass"  :placeholder="$t('verification.checkPass')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('forget.sjh')" prop="mobile" :style="{'display':'none'}">
              <el-input v-model="ruleForm.mobile"  :placeholder="$t('forget.phone')"></el-input>
            </el-form-item>
              <el-form-item :label="$t('register.groups')" prop="id" >
               <el-select v-model="ruleForm.id"  :placeholder="$t('common.choose')">
              <el-option
              v-for="item in ruleForm.groups"
              :key="item.id"
              :label="item.title"
              :value="item.id">
              </el-option>
              </el-select>
              </el-form-item>
              <el-form-item :label="$t('forget.yzm')" prop="yzm">
                  <el-input v-model="ruleForm.yzm"  placeholder="" style="width:80px;float:left;"></el-input>
                  <div class="code" @click="refreshCode" style="float:left;margin-left:10px;">
                      <s-identify :identifyCode="identifyCode"></s-identify>
                  </div>
                  <!--<button @click="compare">点击</button>-->
              </el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">{{$t('register.imReg')}}</el-button>
            <el-button @click="loginForm('')">{{$t('common.login')}}</el-button>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import identify from "../components/identify"
  export default {
    name: "Register",
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('verification.passP')));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('verification.twoPass')));
        } else if (value !== this.ruleForm.password) {
          callback(new Error(this.$t('verification.passCorrect')));
        } else {
          callback();
        }
      };
      var validateMobilePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('verification.sjh')));
        } else {
          if (value !== '') {
            var reg=/^1[3456789]\d{9}$/;
            if(!reg.test(value)){
              callback(new Error(this.$t('verification.sjhCorrect')));
            }
          }
          callback();
        }
      }
        var groupId = (rule, value, callback) => {
            if (value === '') {
                callback(new Error(this.$t('verification.permission')));
            }
            callback();
        }
        var yzm = (rule, value, callback) => {
            if (value === '') {
                callback(new Error(this.$t('verification.yzm')));
            } else if (value.toLowerCase() !== this.identifyCode.toLowerCase()) {
                callback(new Error(this.$t('verification.twoYzm')));
            } else {
                callback();
            }
        };
      return {
          url:this.GLOBAL.baseUrl,
          identifyCodes: "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
          identifyCode: "",
          ruleForm: {
          username: '',
          id: '',
          password: '',
          checkPass: '',
          mobile:'',
          groups:[],
          yzm:''
        },

        rules: {
            username: [
            {required: true, message: this.$t('verification.nameP'), trigger: 'blur'},
            {min: 2, max: 10, message: this.$t('verification.twoLength'), trigger: 'blur'}
          ],
          id: [
              {validator: groupId, trigger: 'blur'},
          ],
            password: [
            {validator: validatePass, trigger: 'blur'},
            {min: 6, max: 16, message: this.$t('verification.sixLength'), trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'},
            {min: 6, max: 16, message: this.$t('verification.sixLength'), trigger: 'blur'}
          ],
            mobile: [
            {validator:validateMobilePhone,trigger: 'blur'}
          ],
            yzm: [
                {validator: yzm, trigger: 'blur'},
            ],
        }
      };
    },
    methods: {
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        refreshCode() {
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        },
        makeCode(o, l) {
            for (let i = 0; i < l; i++) {
                this.identifyCode += this.identifyCodes[
                    this.randomNum(0, this.identifyCodes.length)
                    ];
            }
//            console.log(this.identifyCode);
        },
      submitForm(formName) {
           var me=this;
           this.$refs[formName].validate((valid) => {
              if (valid) {
                  this.$axios.post(me.url+"/user/register", this.ruleForm)
                      .then(function (result) {
                          if(result.data.result===false){
                              me.$message({
                                  message: result.data.msg,
                                  type: 'error'
                              })
                          }
                          if(result.data.result===true){
                              me.$message({
                                  message: me.$t("register.zuceS"),
                                  type: 'success'
                              })
                              me.$router.push({path: '/login'});
                          }

                      })
                      .catch(function (error) {
                          console.log(error);
                      })
              }else {
                   this.$message({
                   message: me.$t("register.zuceF"),
                   type: 'error'
               })
          return false;
      }
      })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      loginForm() {
        this.$router.push({path: '/login'});
      }
    },
      mounted() {
          var me=this;
           me.ruleForm.mobile=sessionStorage.getItem('tel');
          me.$axios.post(me.url+"/grouplist")
              .then(function (result) {
                  me.ruleForm.groups = result.data;
              })
              .catch(function (error) {
                  console.log(error);
              });
          this.identifyCode = "";
          this.makeCode(this.identifyCodes, 4);
      },
      components:{
          's-identify':identify
      },
      computed: {
          selectValue: function (){
              return this.categoryForm.categoryList[this.categoryForm.categorySelect]||{}
          }
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
    .el-notification {
        width: 290px!important;
    }
    .el-select{
        width:100%
    }
    @media (min-width: 768px){
        .el-input {
            width: 100%;
        }
        .el-select{
            width:100%
        }
    }
    @media (min-width: 992px){
        .el-input {
            width: 200px;
        }
        .el-select{
            width:200px;
        }
    }
</style>
