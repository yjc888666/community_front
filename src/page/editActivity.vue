<template>
    <div class="layui-container fly-marginTop">
        <div class="fly-panel" pad20="" style="padding-top: 5px;">
            <div class="layui-tab layui-tab-brief" lay-filter="user">
                <ul class="layui-tab-title">
                    <li class="layui-this">{{$t('add.publishActEdit')}}</li>
                </ul>
                <div class="layui-form layui-form-pane" style="padding: 20px 0;">
                    <div class="layui-form-item">
                        <label class="layui-form-label">{{$t('common.title')}}</label>
                        <div class="layui-input-block">
                            <input type="text" name="title" required lay-verify="required" autocomplete="off"
                                   class="layui-input" v-model="title">
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">{{$t('common.benginTime')}}</label>
                        <div class="layui-input-block">
                            <el-date-picker
                                v-model="startTime"
                                type="datetime"
                                value-format="timestamp"
                                placeholder="选择活动开始时间">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">{{$t('common.endTime')}}</label>
                        <div class="layui-input-block">
                            <el-date-picker
                                v-model="endTime"
                                type="datetime"
                                value-format="timestamp"
                                placeholder="选择活动结束时间">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="layui-form-item layui-form-text">
                        <div class="layui-input-block">
                            <div class="edit_container">
                                <editor-bar v-model="zldata.info" :isClear="isClear"></editor-bar>
                            </div>
                        </div>
                    </div>

                    <div class="layui-form-item" id="viewscore" >
                        <label  class="layui-form-label">{{$t('common.score')}}</label>
                        <div class="layui-input-inline">
                            <input type="number" style="width:100px;text-align:center" name="fee" value="0" min="0"
                                   autocomplete="off" class="layui-input" v-model="score" >
                        </div>
                    </div>
                    <div class="submit_btn">
                        <el-button type="primary" @click="submit">{{$t('common.btn')}}</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {quillEditor} from 'vue-quill-editor'
    import EditorBar from '../components/editor'
    export default {
        data(){
            return {
                url:this.GLOBAL.baseUrl,
                title:"",
                content: "",
                score:0,
                isClear: false,
                zldata: {
                    info:"",
                },
                startTime:"",
                endTime:"",

            }
        },
        components: {
            quillEditor,
            EditorBar
        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill
            }
        },
        methods: {
            onEditorReady(editor) {
                console.log('editor ready!', editor)
            },
            submit(){
                var para = {
                    id:this.$route.params.id,
                    title: this.title,
                    content: this.zldata.info,
                    score:this.score,
                    start_time:this.startTime,
                    end_time:this.endTime

                };

                if(this.title==''){
                    this.$message.error(this.$t('common.titleC'));
                    return;
                }
                if(this.zldata.info==''){
                    this.$message.error(this.$t('tips.inputPlaceHolder'));
                    return;
                }
                if(this.startTime==''){
                    this.$message.error(this.$t('activityDetail.startTimeC'));
                    return;
                }
                if(this.endTime==''){
                    this.$message.error(this.$t('activityDetail.endTimeC'));
                    return;
                }

                var me=this;
                me.$axios.post(me.url+"/activity/edit", para)
                    .then(function (result) {
                        if(result.data.result==true){
                            me.$message({
                                message: result.data.msg,
                                type: 'success'
                            })
                            me.$router.push({
                                path: `/activityList`
                            })
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
            var me = this;
            var id = this.$route.params.id;
            //me.selectedOptions=[];
            me.$axios.post(me.url+"/activity/info?id="+id)
                .then(function (result) {
                    if(result.data.result==true){
                        me.title=result.data.pojo.title;
                        me.zldata.info=result.data.pojo.content;
                        me.score=result.data.pojo.score;
//                        me.startTime="2019-01-22T11:23:16.000Z";
                        me.startTime=result.data.pojo.stime;
                        me.endTime=result.data.pojo.etime;
                    }

                })
        },

    }
</script>

<style lang="less">


    .el-button {
        border-radius: 2px;
    }

    .ql-editor {
        min-height: 400px;
    }
    .el-input__inner{
        border-radius: 0px 2px 2px 0;
        border: 1px solid #e6e6e6;
        height: 38px;
    }
    .el-select{
        width:100%;
    }
    .el-radio+.el-radio {
        margin-left: 10px;
    }
    .ql-snow .ql-tooltip {
        margin-left: 115px;
    }
    .el-cascader-menus{
        z-index: 50002!important;
    }
    .w-e-text-container{
        z-index:90!important;
    }
</style>
