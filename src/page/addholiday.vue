<template>
    <div class="layui-container fly-marginTop">
        <div class="fly-panel" pad20="" style="padding-top: 5px;">
            <div class="layui-tab layui-tab-brief" lay-filter="user">
                <ul class="layui-tab-title">
                    <li class="layui-this">{{$t('add.holiday')}}</li>
                </ul>
                <div class="layui-form layui-form-pane" style="padding: 20px 0;">
                    <div class="layui-form-item">
                        <div class="layui-inline">
                            <label class="layui-form-label">{{$t('add.holidayType')}}</label>
                            <div class="layui-input-block">
                                <el-select v-model="value" clearable :placeholder="$t('common.choose')">
                                    <el-option
                                        v-for="item in options"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">{{$t('common.benginTime')}}</label>
                        <div class="layui-input-block">
                            <el-date-picker
                                v-model="value1"
                                @change="getSTime"
                                format="yyyy-MM-dd"
                                :placeholder="$t('add.startP')">
                            </el-date-picker>
                            <el-radio-group v-model="radioStart">
                                <el-radio  :label="0" @click.native.prevent="radioStartEvent(0)">{{$t('common.morning')}}</el-radio>
                                <el-radio  :label="1" @click.native.prevent="radioStartEvent(1)">{{$t('common.afternoon')}}</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">{{$t('common.endTime')}}</label>
                        <div class="layui-input-block">
                            <el-date-picker
                                v-model="value2"
                                @change="getETime"
                                :placeholder="$t('add.endP')">
                            </el-date-picker>
                            <el-radio-group v-model="radioEnd">
                                <el-radio  :label="0" @click.native.prevent="radioEndEvent(0)">{{$t('common.morning')}}</el-radio>
                                <el-radio  :label="1" @click.native.prevent="radioEndEvent(1)">{{$t('common.afternoon')}}</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <div class="layui-inline">
                            <label class="layui-form-label">{{$t('add.auditor')}}</label>
                            <div class="layui-input-block">
                                <el-select v-model="value3" clearable :placeholder="$t('common.choose')">
                                    <el-option
                                        v-for="item in auditor"
                                        :key="item.uid"
                                        :label="item.username"
                                        :value="item.uid">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label" style="height:68px;line-height:50px;">{{$t('add.rease')}}</label>
                        <div class="layui-input-block">
                            <el-input
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 4}"
                                :placeholder="$t('add.reaseP')"
                                v-model="textarea">
                            </el-input>
                        </div>
                    </div>
                    <div class="submit_btn">
                        <el-button type="primary" @click="submit">{{$t('common.tijiao')}}</el-button>
                        <button type="button" class="el-button el-button--primary">
                            <router-link to="/holiday" style="color:#fff">{{$t('common.back')}}</router-link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {quillEditor} from 'vue-quill-editor'

    export default {
        data(){
            return {
                url:this.GLOBAL.baseUrl,
                radioStart:0,
                radioEnd:0,
                options: [{
                        value: this.$t('add.nianHoliday'),
                        label: this.$t('add.nianHoliday')
                    }, {
                        value: this.$t('add.biHoliday'),
                        label: this.$t('add.biHoliday')
                    }, {
                        value: this.$t('add.shiHoliday'),
                        label: this.$t('add.shiHoliday')
                    }, {
                        value: this.$t('add.hunHoliday'),
                        label: this.$t('add.hunHoliday')
                    }, {
                        value: this.$t('add.canHoliday'),
                        label: this.$t('add.canHoliday')
                    },{
                        value: this.$t('add.paiHoliday'),
                        label: this.$t('add.paiHoliday')
                    },{
                        value: this.$t('add.qiaoHoliday'),
                        label: this.$t('add.qiaoHoliday')
                    },
                    {
                        value: this.$t('add.otherHoliday'),
                        label: this.$t('add.otherHoliday')
                    }],
                    value: '',
                    value1:'',
                    value2:'',
                    value3:'',
                    textarea:"",
                    content:'',
                    type:"",
                    start:"",
                    end:"",
                    auditor:[],
                    exuid:""
            }
        },
        methods: {
            radioStartEvent(time){
              this.radioStart=time
            },
            radioEndEvent(time){
                this.radioEnd=time
            },
            opt(id){
               console.log(id)
            },
            getSTime(val){
                this.value1=val;
            },
            getETime(val){
                this.value2=val;
            },
            submit(){
                var para = {
                    type:this.type,
                    startdate:this.value1,
                    enddate:this.value2,
                    stime:this.radioStart,
                    etime:this.radioEnd,
                    reason: this.content,
                    exuid:this.exuid,
                };
//                console.log(para)
                if(this.value1==''){
                    this.$message.error(this.$t('add.startP'));
                    return;
                }
                if(this.value2==''){
                    this.$message.error(this.$t('add.endP'));
                    return;
                }
                if(this.type==''){
                    this.$message.error(this.$t('add.holidayTypeC'));
                    return;
                }
                var a=this.value1.replace(/-/g,"")
                var b=this.value2.replace(/-/g,"")
                if(a>b){
                    this.$message.error(this.$t('add.compare'));
                    return;
                }
                if(this.exuid==''){
                    this.$message.error(this.$t('add.auditorC'));
                    return;
                }
                if(this.content==''){
                    this.$message.error(this.$t('add.reaseP'));
                    return;
                }
//               请假接口
                var me=this;
                me.$axios.post(me.url+"/leave/add", para)
                    .then(function (result) {
                        if(result.data.result==true){
                            me.$message({
                                message: me.$t('add.holidayS'),
                                type: 'success'
                            })
                            me.$router.push({path: '/holiday'});
                        }
                        if(result.data.result==false){
                            me.$message({
                                message: result.data.msg,
                                type: 'error'
                            })
                        }
                    })
            }
        },
        mounted(){
            var me=this;
            me.$axios.post(me.url+"/leave/auditor")
                .then(function (result) {
                    me.auditor=result.data;
                })
        },
        watch: {
            value(type){
                this.type=type
            },
            textarea(val){
                this.content=val
            },
            value3(val){
                this.exuid=val
            }

        }
    }
</script>

<style lang="less">
    .el-input__inner{
        border-radius: 0px 2px 2px 0;
        border: 1px solid #e6e6e6;
        height: 38px;
    }
    .el-textarea__inner{
        border-radius: 0px 2px 2px 0;
        border: 1px solid #e6e6e6;
    }
    .el-select{
        width:100%;
    }
    .el-radio-group{
        margin-top:10px;
     }
    .el-date-editor.el-input {
        width:100%;
    }
    @media screen and (min-width: 768px){
        .el-date-editor.el-input {
            width:200px;
        }
        .el-radio-group{
            margin-top:0px;
        }
        .el-textarea textarea{
            width:200px;
        }
    }
    .el-textarea textarea{
        min-height:68px!important;
        height:68px!important;
    }
</style>
