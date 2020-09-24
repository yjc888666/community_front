<template>
    <div class="layui-container fly-marginTop">
        <div class="fly-panel" pad20="" style="padding-top: 5px;">
            <div class="layui-tab layui-tab-brief" lay-filter="user">
                <ul class="layui-tab-title">
                    <li class="layui-this">{{$t('add.voteEdit')}}</li>
                </ul>
                <div class="layui-form layui-form-pane" style="padding: 20px 0;">
                    <div class="layui-form-item">
                        <label class="layui-form-label">{{$t('common.title')}}</label>
                        <div class="layui-input-block">
                            <input type="text" name="title" required lay-verify="required" autocomplete="off"
                                   class="layui-input" v-model="title" disabled>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">{{$t('common.endTime')}}</label>
                        <div class="layui-input-block">
                            <el-date-picker
                                v-model="endTime"
                                type="datetime"
                                value-format="timestamp"
                                :placeholder="$t('add.voteDate')">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="layui-form-item layui-form-text">
                        <div class="layui-input-block">
                            <div class="edit_container">
                                <editor-bar v-model="zldata.info" :isClear="isClear" :disabled="disShow"></editor-bar>
                            </div>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">{{$t('add.nonymous')}}</label>
                        <div class="layui-input-block">
                            <el-switch
                                v-model="anonymity"
                                class="demo"
                                :on-text="$t('common.open')"
                                :off-text="$t('common.close')"
                                :on-value="1"
                                :off-value="0"
                                on-color="#5FB878"
                                off-color="#ccc"
                                @change="anonymityEvent($event)"
                            >
                            </el-switch>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">{{$t('add.voteChoose')}}</label>
                        <div class="layui-input-block">
                            <el-switch
                                v-model="multiselect"
                                class="demo"
                                :on-text="$t('common.Single')"
                                :off-text="$t('common.multiple')"
                                :on-value="1"
                                :off-value="0"
                                on-color="#5FB878"
                                off-color="#ccc"
                                @change="multiselectEvent($event)"
                            >
                            </el-switch>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">{{$t('add.votePerson')}}</label>
                        <div class="layui-input-block">
                            <el-switch
                                v-model="openuser"
                                class="demo"
                                :on-text="$t('common.open')"
                                :off-text="$t('common.close')"
                                :on-value="1"
                                :off-value="0"
                                on-color="#5FB878"
                                off-color="#ccc"
                                @change="openuserEvent($event)"
                            >
                            </el-switch>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">{{$t('add.voteProject')}}</label>
                        <el-col :xs="14" :lg="7">
                            <ul>
                                <li v-for='(todo,index) in todos' style="border-bottom:1px solid #eee;line-height:30px;padding-left:10px;margin-left:10px;">
                                    {{todo.optionname}}
                                </li>
                            </ul>
                        </el-col>
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
                isClear: false,
                zldata: {
                    info:"",
                },
                startTime:"",
                endTime:"",
                anonymity:"",
                multiselect:"",
                openuser:"",
                input:"",
                todos:[],
                disShow:true
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
            add(){
                if(this.input==''){
                    this.$message.error(this.$t('add.voteContent'));
                    return;
                }
                this.todos.push(this.input);
                this.input=""
            },
            del(index){
                this.todos.splice(index,1);
            },
            anonymityEvent(val){
                this.anonymity=val;
            },
            multiselectEvent(val){
                this.multiselect=val;
            },
            openuserEvent(val){
                this.openuser=val;
            },
            onEditorReady(editor) {
                console.log('editor ready!', editor)
            },
            submit(){
                var para = {
                    id: this.$route.params.id,
                    end_time:this.endTime,
                };

                if(this.endTime==''){
                    this.$message.error(this.$t('add.voteEnd'));
                    return;
                }
                var me=this;
                me.$axios.post(me.url+"/vote/edit", para)
                    .then(function (result) {
                        if(result.data.result==true){
                            me.$message({
                                message: result.data.msg,
                                type: 'success'
                            })
                            me.$router.push({
                                path: `/voteList`
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
            me.$axios.post(me.url+"/vote/info?id="+id)
                .then(function (result) {
                    if(result.data.result==true){
                        me.title=result.data.pojo.vote.title;
                        me.zldata.info=result.data.pojo.vote.content;
                        me.endTime=result.data.pojo.vote.etime;
                        me.anonymity=result.data.pojo.vote.anonymity,
                        me.multiselect=result.data.pojo.vote.multiselect
                        me.openuser=result.data.pojo.vote.openuser
                        me.todos=result.data.pojo.optionnames
                    }

                })
        }
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
    .el-switch {
        margin-top: 8px;
        margin-left: 10px;
    }
</style>
