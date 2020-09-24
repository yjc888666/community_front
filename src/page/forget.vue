<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief">
        <ul class="layui-tab-title">
          <li class="layui-this">{{$t('forget.lookPass')}}</li>
        </ul>
          <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
              <div class="layui-tab-item layui-show">
                  <div class="layui-form layui-form-pane">
                      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                      <el-form-item :label="$t('forget.sjh')" prop="mobile">
                        <el-input v-model="ruleForm.mobile"  type="text" :placeholder="$t('forget.phone')"></el-input>
                      </el-form-item>
                          <el-form-item :label="$t('forget.sjyzm')" prop="yzm">
                              <el-input v-model="ruleForm.yzm"  type="text" :placeholder="$t('forget.yzm')" :style="{width:'75px'}" class="btns"></el-input>
                              <el-button  type="primary" v-show="show" @click="getCode" :style="{width:'100px'}" :disabled="disShow">{{$t('forget.ObtainYzm')}}</el-button>
                              <el-button type="primary" v-show="!show" class="count" :style="{width:'100px'}">{{$t('forget.Surplus')}}{{count}} {{$t('forget.miao')}}</el-button>
                          </el-form-item>
                      <el-button type="primary" @click="submitForm('ruleForm')" :disabled="disShowGo" >{{$t('common.determine')}}</el-button>
                      </el-form-item>
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
    name: "forget",
    data() {
        var validateMobilePhone = (rule, value, callback) =>
        {
            if (!value) {
                this.disShow=true;
                return callback(new Error(this.$t('verification.sjh')));
            } else {
                const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
                if (reg.test(value)) {
                    this.disShow=false;
                    callback();
                } else {
                    this.disShow=true;
                    return callback(new Error(this.$t('verification.sjhCorrect')));
                }
            }
        }
      return {
          url:this.GLOBAL.baseUrl,
        ruleForm: {
          mobile:'',
          yzm: ''
        },
        rules: {
            mobile: [
                {validator:validateMobilePhone,trigger: 'change'}
            ],
        },
          show: true,
          count: '',
          timer: null,
          disShow:true,
          disShowGo:true,
      }
    },
    methods: {
        getCode(){
            var me=this;
            me.$axios.post(me.url+"/user/sendlandphone?phone="+this.ruleForm.mobile)
                .then(function (res) {
                    if(res.data.result==true){
                        me.disShowGo=false;
                        const TIME_COUNT = 60;
                        if (!me.timer) {
                            me.count = TIME_COUNT;
                            me.show = false;
                            me.timer = setInterval(() => {
                                    if (me.count > 0 && me.count <= TIME_COUNT) {
                                me.count--;
                            } else {
                                me.show = true;
                                clearInterval(me.timer);
                                me.timer = null;
                            }
                        }, 1000)
                        }
                        me.$message.success(res.data.msg);
                    }
                    if(res.data.result==false){
                        me.disShowGo=true;
                        me.$message.error(res.data.msg);
                    }
                })
                .catch(function (error) {
                    me.disShowGo=true;
                    console.log(error);
                });
        },
        submitForm(formName) {
            var me=this;
            me.$axios.post(me.url+"/user/getlandphone?phone="+this.ruleForm.mobile+"&code=" + this.ruleForm.yzm)
                .then(function (res) {
                    me.$router.push({path: '/mima'});
                    if(res.data.result==true){
                        sessionStorage.setItem('sessionId',res.data.pojo.sessionid)
                    }
                    if(res.data.result==false){
                        me.$message.error(res.data.msg);
                    }
                })
                .catch(function (error) {
                    console.log(error);
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
