<template>
    <div class="layui-container fly-marginTop">
        <div class="fly-panel" pad20="" style="padding-top: 5px;">
            <div class="layui-tab layui-tab-brief" lay-filter="user">
                <ul class="layui-tab-title">
                    <li class="layui-this">{{ $t("add.holiday") }}</li>
                </ul>
                <div class="layui-form layui-form-pane" style="padding: 20px 0;">
                    <div class="layui-form-item">
                        <label class="layui-form-label">{{ $t("add.remiDate") }}</label>
                        <div class="layui-input-block">
                            <div class="holiday">{{holiday.creatdate}}</div>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">{{ $t("add.baoxiaoDate") }}</label>
                        <div class="layui-input-block">
                            <div class="holiday">{{holiday.reimbursedate}}</div>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">{{ $t("add.remiMoney") }}</label>
                        <div class="layui-input-block">
                            <div class="holiday">{{holiday.reimburse_money}}{{$t("common.yuan")}}</div>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label" style="height:68px;line-height:50px;">{{ $t("add.remiContent") }}</label>
                        <div class="layui-input-block">
                            <el-input
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 4}"
                                :placeholder="holiday.reimburse_content"
                                :disabled="true"
                                v-model="textarea">
                            </el-input>
                        </div>
                    </div>

                    <div class="layui-form-item">
                        <label class="layui-form-label">{{ $t("add.auditDate") }}</label>
                        <div class="layui-input-block">
                            <div class="holiday">{{holiday.exdate}}</div>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <div class="layui-inline">
                            <label class="layui-form-label">{{ $t("add.auditor") }}</label>
                            <div class="layui-input-block">
                                <div class="holiday">{{holiday.exname}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <div class="layui-inline">
                            <label class="layui-form-label">{{ $t("add.auditorState") }}</label>
                            <div class="layui-input-block">
                                <div class="holiday">{{holiday.status}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label" style="height:68px;line-height:50px;">{{ $t("add.auditorSease") }}</label>
                        <div class="layui-input-block">
                            <el-input
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 4}"
                                :placeholder="holiday.remark"
                                :disabled="true"
                                v-model="textarea">
                            </el-input>
                        </div>
                    </div>
                    <div class="submit_btn">
                        <button type="button" class="el-button el-button--primary">
                            <router-link to="/reimbursement" style="color:#fff">{{ $t("common.back") }}</router-link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                url:this.GLOBAL.baseUrl,
                textarea:'',
                holiday:''

            }
        },
        methods: {

        },
        mounted(){
            var id = this.$route.params.id;
            var me=this;
            me.$axios.post(me.url+"/reimbursement/getReimbursement?id="+id)
                .then(function (result) {
                    me.holiday=result.data;
                    if(me.holiday.stime==0){
                        me.holiday.stime=me.$t('common.morning')
                    }
                    if(me.holiday.stime==1){
                        me.holiday.stime=me.$t('common.afternoon')
                    }
                    if(me.holiday.etime==0){
                        me.holiday.etime=me.$t('common.morning')
                    }
                    if(me.holiday.etime==1){
                        me.holiday.etime=me.$t('common.afternoon')
                    }
                    if(me.holiday.status==0){
                        me.holiday.status=me.$t('add.aud1')
                    }
                    if(me.holiday.status==1){
                        me.holiday.status=me.$t('add.aud2')
                    }
                    if(me.holiday.status==2){
                        me.holiday.status=me.$t('add.aud3')
                    }
                })
        }
    }
</script>

<style lang="less">
    .holiday{
        height:30px;
        line-height:30px;
        border-radius: 0px 2px 2px 0;
        border: 1px solid #e6e6e6;
        padding: 3px 10px;
    }
    .el-textarea.is-disabled .el-textarea__inner{
        background-color: #fff;
    }
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
        .holiday{
            width:178px;
        }
        .el-textarea textarea{
            width:200px;
        }
        .el-radio-group{
            margin-top:0px;
        }
    }
    .el-textarea textarea{
        min-height:68px!important;
        height:68px!important;
    }
    .el-input.is-disabled .el-input__inner{
        background-color:#fff;
        border-color: #e6e6e6;
        cursor: not-allowed;
    }
</style>
