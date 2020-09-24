<template>
    <div class="" style="padding-top: 5px;">
        <div class="layui-tab layui-tab-brief" lay-filter="user">
            <ul class="layui-tab-title">
                <li><router-link to="/holiday">我要请假</router-link></li>
                <li class="layui-this">申请外出</li>
            </ul>
            <div class="layui-form layui-form-pane" style="padding: 20px 0;">
                <div class="layui-form-item">
                    <div class="layui-inline">
                        <label class="layui-form-label">职位</label>
                        <div class="layui-input-block">
                            <el-select v-model="position_id" clearable placeholder="请输入职位">
                                <el-option
                                    v-for="item in position"
                                    :key="item.id"
                                    :label="item.position"
                                    :value="item.id">
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
                    <label class="layui-form-label" style="height:68px;line-height:50px;">外出原因</label>
                    <div class="layui-input-block">
                        <el-input
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 4}"
                            :placeholder="$t('add.reaseP')"
                            v-model="textarea">
                        </el-input>
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
                <div class="submit_btn">
                    <el-button type="primary" @click="submit">{{$t('common.tijiao')}}</el-button>
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
                option: [],
                position:[],
                auditor:[],
                position_id:"",
                value1:'',
                value2:'',
                value3:'',
                textarea:"",
                content:'',
                type:"",
                start:"",
                end:"",
                exuid:""
            }
        },
        methods: {
//            职位接口
            positiontype(){
                var me=this;
                me.$axios.post(me.url+"/position/getPosition")
                    .then(function (result) {
                        me.position=result.data;
                    })
            },
            auditortype(){
                var me=this;
                me.$axios.post(me.url+"/leave/auditor")
                    .then(function (result) {
                        me.auditor=result.data;
                    })
            },
            radioStartEvent(time){
                this.radioStart=time
            },
            radioEndEvent(time){
                this.radioEnd=time
            },
            getSTime(val){
                this.value1=val;
            },
            getETime(val){
                this.value2=val;
            },
            submit(){
                var para = {
                    position_id:this.position_id,
                    startdate:this.value1,
                    enddate:this.value2,
                    stime:(this.radioStart).toString(),
                    etime:(this.radioEnd).toString(),
                    reason: this.content,
                    exuid:this.exuid,
                };
                if(this.position_id==''){
                    this.$message.error("请输入职位");
                    return;
                }
                if(this.value1==''){
                    this.$message.error(this.$t('add.startP'));
                    return;
                }
                if(this.value2==''){
                    this.$message.error(this.$t('add.endP'));
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
//                if(this.content==''){
//                    this.$message.error(this.$t('add.reaseP'));
//                    return;
//                }
//               请假接口
                var me=this;
                me.$axios.post(me.url+"/outWork/add", para)
                    .then(function (result) {
                        if(result.data.result==true){
                            me.$message({
                                message:"外出申请成功",
                                type: 'success'
                            })
                            me.position_id = "";
                            me.value1 = "";
                            me.value2 = "";
                            me.content = "";
                            me.exuid = "";
//                            me.$router.push({path: '/aoutwork'});
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
            this.positiontype();
            this.auditortype();
        },
        watch: {
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
