<template>
    <div class="layui-container fly-marginTop">
        <div class="fly-panel" pad20="" style="padding-top: 5px;">
            <div class="layui-tab layui-tab-brief" lay-filter="user">
                <ul class="layui-tab-title">
                    <li class="layui-this">{{$t('add.fileInfo')}}</li>
                </ul>
                <div class="layui-form layui-form-pane" style="padding: 20px 0;">
                    <div class="layui-form-item">
                        <label class="layui-form-label">{{$t('add.failureTime')}}</label>
                        <div class="layui-input-block">
                            <el-date-picker
                                type="date"
                                v-model="value1"
                                @change="getSTime"
                                value-format="yyyy-MM-dd"
                                :placeholder="$t('add.failureTimeC')">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">{{$t('add.score')}}</label>
                        <div class="layui-input-block">
                            <el-input v-model="score" :placeholder="$t('add.scoreC')" type="number" min="0"></el-input>
                        </div>
                    </div>
                    <div class="submit_btn">
                        <el-button type="primary" @click="submit">{{$t('common.tijiao')}}</el-button>
                        <button type="button" class="el-button el-button--primary">
                            <router-link to="/enclosure" style="color:#fff">{{$t('common.back')}}</router-link>
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
                 value1:'',
                 score:''

            }
        },
        methods: {
            getSTime(val){
                this.value1=val;
            },
            submit(){
                if(this.value1==''){
                    this.$message.error(this.$t('add.failureTimeC'));
                    return;
                }
                var me=this;
                me.$axios.post(me.url+"/forum/editfile?id="+this.$route.params.id+"&time=" + this.value1+"&score=" + this.score)
                    .then(function (result) {
                        if(result.data.result==true){
                            me.$message({
                                message: result.data.msg,
                                type: 'success'
                            })
                            me.$router.push({path: '/enclosure'});
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
            me.$axios.post(me.url+"/forum/fileget?id="+this.$route.params.id)
                .then(function (result) {
                    me.value1=result.data.pojo.invalid_date
                    me.score=result.data.pojo.score
                })
        },

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
