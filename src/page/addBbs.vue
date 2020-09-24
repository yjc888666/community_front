<template>
    <div class="layui-container fly-marginTop">
        <div class="fly-panel" pad20="" style="padding-top: 5px;">
            <div class="layui-tab layui-tab-brief" lay-filter="user">
                <ul class="layui-tab-title">
                    <li class="layui-this">{{$t('add.publishPost')}}</li>
                </ul>
                <div class="layui-form layui-form-pane" style="padding: 20px 0;">
                    <div class="layui-form-item">
                        <div class="layui-inline">
                            <label class="layui-form-label">{{$t('common.bankuai')}}</label>
                            <div class="layui-input-block">
                                <el-cascader
                                    :options="options"
                                    @change="handleItemChange"
                                ></el-cascader>
                            </div>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">{{$t('common.title')}}</label>
                        <div class="layui-input-block">
                            <input type="text" name="title" required lay-verify="required" autocomplete="off"
                                   class="layui-input" v-model="title">
                        </div>
                    </div>
                    <div class="layui-form-item layui-form-text">
                        <div class="layui-input-block">
                            <div class="edit_container">
                                <quill-editor v-model="content"
                                              ref="myQuillEditor"
                                              class="editer"
                                              :options="editorOption"
                                              @ready="onEditorReady($event)">
                                </quill-editor>
                                <!--<editor-bar v-model="zldata.info" :isClear="isClear"></editor-bar>-->
                            </div>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <div class="layui-form-item">
                            <label  class="layui-form-label">{{$t('add.file1')}}</label>
                            <div class="layui-input-inline" style="width:100px;">
                                <input type="number" style="width:100px;text-align:center" name="fee" value="0" min="0"
                                       autocomplete="off" class="layui-input" v-model="fscore" >
                            </div>
                            <input  @change="uploading($event)" type="file"  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,.csv,text/plain" style="margin-top:5px;"/>
                        </div>
                        <!--<div  class="layui-inline" style="padding-top:5px;margin-left:5px;">-->
                            <!--<el-upload-->
                                <!--class="upload-demo"-->
                                <!--ref="upload"-->
                                <!--action="https://www.qklshequ.com/bbs/file/uploadfile"-->
                                <!--accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,.csv,text/plain"-->
                                <!--:http-request="handlePost"-->
                                <!--:auto-upload="false">-->
                                <!--<el-button slot="trigger" size="small" type="primary">选取文件</el-button>-->
                                <!--<el-button style="margin-left: 10px;" size="small" type="danger" @click="submitUpload">开始上传附件</el-button>-->
                            <!--</el-upload>-->
                        <!--</div>-->
                        <!--单文件上传-->
                        <!--<input id="fileinput" @change="uploading($event)" type="file"  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,.csv,text/plain" />-->
                        <!--多文件上传-->
                        <!--<input type="file" @change="uploads($event)" id="files" multiple="multiple"/>-->
                    </div>
                    <div class="layui-form-item">
                        <div class="layui-form-item">
                            <label  class="layui-form-label">{{$t('add.file2')}}</label>
                            <div class="layui-input-inline" style="width:100px;">
                                <input type="number" style="width:100px;text-align:center" name="fee" value="0" min="0"
                                       autocomplete="off" class="layui-input" v-model="fscore1" >
                            </div>
                            <input  @change="uploading1($event)" type="file"  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,.csv,text/plain" style="margin-top:5px;"/>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <div class="layui-form-item">
                            <label  class="layui-form-label">{{$t('add.file3')}}</label>
                            <div class="layui-input-inline" style="width:100px;">
                                <input type="number" style="width:100px;text-align:center" name="fee" value="0" min="0"
                                       autocomplete="off" class="layui-input" v-model="fscore2" >
                            </div>
                            <input  @change="uploading2($event)" type="file"  accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,.csv,text/plain" style="margin-top:5px;"/>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">{{$t('add.type')}}</label>
                        <div class="layui-input-block" style="margin-top:10px;margin-left:10px;">
                            <el-radio-group v-model="radio">
                                <el-radio  :label="0" @click.native.prevent="radioEvent(0)">{{$t('add.typeFree')}}</el-radio>
                                <el-radio  :label="1" @click.native.prevent="radioEvent(1)">{{$t('add.typePay')}}</el-radio>
                                <el-radio  :label="2" @click.native.prevent="radioEvent(2)">{{$t('add.typeReply')}}</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                    <div class="layui-form-item" id="viewscore" v-if="radio == '1'">
                        <label  class="layui-form-label">{{add.moneyScore}}</label>
                        <div class="layui-input-inline">
                            <input type="number" style="width:100px;text-align:center" name="fee" value="1" min="1"
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
                url: this.GLOBAL.baseUrl,
                tid: '',
                title: '',
                content: '',
                radio: 0,
                editorOption: {},
                options: [],
                score: 1,
                isClear: false,
                zldata: {
                    info: '',
                },
                fscore: 0,
                fscore1: 0,
                fscore2: 0,
                file: '',
                file1: '',
                file2: '',
                src: '',
                src1: '',
                src2: ''
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
//            单文件上传
            uploading(event){
                this.file = event.target.files[0];//获取文件
                var windowURL = window.URL || window.webkitURL;
                this.file = event.target.files[0];
                //创建图片文件的url
                this.src = windowURL.createObjectURL(event.target.files[0]);
            },
            uploading1(event){
                this.file1 = event.target.files[0];//获取文件
                var windowURL = window.URL || window.webkitURL;
                this.file1= event.target.files[0];
                //创建图片文件的url
                this.src1 = windowURL.createObjectURL(event.target.files[0]);
            },
            uploading2(event){
                this.file2 = event.target.files[0];//获取文件
                var windowURL = window.URL || window.webkitURL;
                this.file2 = event.target.files[0];
                //创建图片文件的url
                this.src2 = windowURL.createObjectURL(event.target.files[0]);
            },
//            上传附件的接口利用elementui
            handlePost(f) {
                var me = this;
                let fd = new FormData()
                fd.append('file', f.file)
//                fd.append('fid',this.$route.params.id);
                fd.append('score', this.fscore);
                me.$axios.post(me.url + "/file/uploadfile", fd)
                    .then(function (result) {
                        console.log(result)
                        if (result.data.result == true) {
                            me.$message({
                                message: result.data.msg,
                                type: 'success'
                            })
                        }
                        if (result.data.result == false) {
                            me.$message({
                                message: result.data.msg,
                                type: 'error'
                            })
                        }
                    })
            },
            submitUpload() {
                this.$refs.upload.submit();
            },
            radioEvent(page){
                this.radio = page
            },
            handleItemChange(value){
                this.tid = value[1]
            },
            onEditorReady(editor) {
//                console.log('editor ready!', editor)
            },
            submit(){
               if(this.tid==''){
                    this.$message.error(this.$t('common.bankuai'));
                    return;
                }
                if(this.title==''){
                    this.$message.error(this.$t('common.title'));
                    return;
                }
                if(this.content==''){
                    this.$message.error(this.$t('tips.inputPlaceHolder'));
                    return;
                }
                event.preventDefault();//取消默认行为
                let formdata = new FormData();
                formdata.append('file', this.file);
                formdata.append('file1', this.file1);
                formdata.append('file2', this.file2);
                formdata.append('tid', this.tid);
                formdata.append('title', this.title);
                formdata.append('content', this.content);
                formdata.append('page', this.radio);
                formdata.append('score', this.score);
                formdata.append('fscore', [this.fscore,this.fscore1,this.fscore2]);
                var me=this;
                me.$axios.post(me.url + "/forum/add", formdata)
                    .then(function (result) {
                        if (result.data.result == true) {
                            me.$message({
                                message: result.data.msg,
                                type: 'success'
                            })
                            me.$router.push({
                                path: `/noteList/${me.tid}`
                            })
                        }
                        if (result.data.result == false) {
                            me.$message({
                                message: result.data.msg,
                                type: 'error'
                            })
                        }
                    })

            },

        },
            created(){
                var me = this;
                me.$axios.post(me.url + "/addforumcate")
                    .then(function (result) {
                        me.options = result.data
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
    }
</script>

<style lang="less">
    .el-radio {
        margin-top: 10px;
        margin-left: 10px;
    }

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
    .ql-editor {
          min-height:300px!important;
      }
</style>
