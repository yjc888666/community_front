<template>
    <div class="layui-container fly-marginTop">
        <div class="fly-panel" pad20="" style="padding-top: 5px;">
            <div class="layui-tab layui-tab-brief" lay-filter="user">
                <ul class="layui-tab-title">
                    <li class="layui-this">{{$t('add.reim')}}</li>
                </ul>
                <div class="layui-form layui-form-pane" style="padding: 20px 0;">
                    <div class="layui-form-item">
                        <label class="layui-form-label">{{$t('add.remiDate')}}</label>
                        <div class="layui-input-block">
                            <el-date-picker
                                type="date"
                                v-model="value1"
                                @change="getSTime"
                                format="yyyy-MM-dd"
                                :placeholder="$t('add.remiDateC')">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label" style="height:68px;line-height:50px;">{{$t('add.remiContent')}}</label>
                        <div class="layui-input-block">
                            <el-input
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 4}"
                                :placeholder="$t('add.remiContentC')"
                                v-model="textarea">
                            </el-input>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">{{$t('add.remiMoney')}}</label>
                        <div class="layui-input-block">
                            <el-input v-model="moneny" :placeholder="$t('common.choose')" type="number"></el-input>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <div class="layui-inline">
                            <label class="layui-form-label">{{$t('add.auditor')}}</label>
                            <div class="layui-input-block">
                                <el-select v-model="value3" clearable :placeholder="$t('add.auditorC')">
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
                    <div class="submit_btn">
                        <el-button type="primary" @click="submit">{{$t('common.tijiao')}}</el-button>
                        <button type="button" class="el-button el-button--primary">
                            <router-link to="/reimbursement" style="color:#fff">{{$t('common.back')}}</router-link>
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
                    exuid:"",
                    moneny:""
            }
        },
        methods: {
            getSTime(val){
                this.value1=val;
            },
            submit(){
                var para = {
                    creatdate:this.value1,
                    reimburse_money:this.moneny,
                    reimburse_content:this.textarea,
                    exuid:this.exuid,
                };
//                console.log(para)
                if(this.value1==''){
                    this.$message.error(this.$t('add.remiDateC'));
                    return;
                }

                if(this.exuid==''){
                    this.$message.error(this.$t('add.auditorC'));
                    return;
                }
                if(this.textarea==''){
                    this.$message.error(this.$t('add.remiContentC'));
                    return;
                }
//               请假接口
                var me=this;
                me.$axios.post(me.url+"/reimbursement/add", para)
                    .then(function (result) {
                        if(result.data.result==true){
                            me.$message({
                                message: me.$t('add.reimS'),
                                type: 'success'
                            })
                            me.$router.push({path: '/reimbursement'});
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
    .el-input__inner {
        width: 200px;
    }
</style>
