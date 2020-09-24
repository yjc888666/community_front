<template>
    <div class="layui-container fly-marginTop">
        <div class="fly-panel" pad20="" style="padding-top: 5px;">
            <div class="layui-tab layui-tab-brief" lay-filter="user">
                <ul class="layui-tab-title">
                    <li class="layui-this">{{$t('add.publishedit')}}</li>
                </ul>
                <div class="layui-form layui-form-pane" style="padding: 20px 0;">
                    <div class="layui-form-item">
                        <div class="layui-inline">
                            <label class="layui-form-label">{{$t('common.bankuai')}}</label>
                            <div class="layui-input-block">
                                <el-cascader
                                    :options="options"
                                    @change="handleItemChange"
                                    v-model="selectedOptions"
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
                                <!--<editor-bar v-model="zldata.info" :isClear="isClear"></editor-bar>-->
                                <quill-editor v-model="content"
                                              ref="myQuillEditor"
                                              class="editer"
                                              :options="editorOption"
                                              @ready="onEditorReady($event)">
                                </quill-editor>
                            </div>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <li v-for='(value, key) in fileUpload'>
                            <span>{{$t('add.file')}}{{key+1}}：</span>
                            <a class="close" href="javascript:;">{{value.name}}</a>
                            <span style="padding:10px;">{{value.score}}{{$t('add.score')}}</span>
                            <span @click="delwenjian(value.id)" style="margin-left:10px;color:red;cursor: pointer">X</span>
                        </li>
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
                        <el-button type="primary" @click="submit(infoDate.id)"> {{$t('common.btn')}}</el-button>
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
                infoDate:"",
                tid:'',
                title:'',
                content: '',
                radio: '',
                editorOption: {},
                options: [],
                score:1,
                addforumcate1:[],
                firstname:'',
                selectedOptions:[],
                isClear: false,
                zldata: {
                    info:'',
                },
                fscore: 0,
                fscore1: 0,
                fscore2: 0,
                fscore3: 0,
                fscore4: 0,
                fscore5: 0,
                file: '',
                file1: '',
                file2: '',
                src: '',
                src1: '',
                src2: '',
                fileUpload:[]
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
        created(){
            var me = this;
            me.$axios.post(me.url+"/addforumcate")
                .then(function (result) {
                    me.options=result.data
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        mounted(){
            this.list()
        },
        methods: {
            list(){
                var me = this;
                var id = this.$route.params.id;
                me.$axios.post(me.url+"/forum/info?id="+id+"&type=edit")
                    .then(function (result) {
                        if(result.data.result==true){
                            me.tid=result.data.pojo.tid
                            me.infoDate=result.data.pojo;
                            me.title=result.data.pojo.title;
                            me.content=result.data.pojo.content;
                            me.radio=result.data.pojo.readable;
                            me.score=result.data.pojo.score;
                            me.selectedOptions.push(result.data.pojo.secondname);
                            me.selectedOptions.push(result.data.pojo.tid);
                            me.fileUpload=result.data.pojo.fileUpload;
                            me.fscore3=result.data.pojo.fileUpload[0].score;
                            me.fscore4=result.data.pojo.fileUpload[1].score;
                            me.fscore5=result.data.pojo.fileUpload[2].score;
                            me.file = result.data.pojo.fileUpload[0];
                            me.file1 = result.data.pojo.fileUpload[1];
                            me.file2 = result.data.pojo.fileUpload[2];
                        }

                    })
            },
            uploading(event){
                this.file = event.target.files[0];
                var windowURL = window.URL || window.webkitURL;
                this.file = event.target.files[0];
               
                this.src = windowURL.createObjectURL(event.target.files[0]);
            },
            uploading1(event){
                this.file1 = event.target.files[0];
                var windowURL = window.URL || window.webkitURL;
                this.file1= event.target.files[0];
                
                this.src1 = windowURL.createObjectURL(event.target.files[0]);
            },
            uploading2(event){
                this.file2 = event.target.files[0];
                var windowURL = window.URL || window.webkitURL;
                this.file2 = event.target.files[0];

                this.src2 = windowURL.createObjectURL(event.target.files[0]);
            },
            //  上传附件
            submitUpload() {
                this.$refs.upload.submit();
            },
            handleRemove(file) {
            },
            handlePreview(file) {
            },
            handleAvatarSuccess(res, file) {
                console.log(res,file)
                 if (res.code !== 0) {
                    this.$message.error('上传图片失败！');
                    return;
                }
            },
            handlePost(f) {
              var me=this;
              let fd = new FormData()
              fd.append('file', f.file)
              fd.append('fid',this.$route.params.id);//传其他参数
              fd.append('score',this.fjscore);
                 me.$axios.post(me.url+"/file/uploadfile", fd)
                     .then(function (result) {
                         if(result.data.result==true){
                             me.$message({
                                 message: '上传成功',
                                 type: 'success'
                             })
                         }
                         if(result.data.result==false){
                             me.$message({
                                 message: result.data.msg,
                                 type: 'error'
                             })
                         }
                     })
             },
            radioEvent(page){
                this.radio=page
            },
            handleItemChange(value){
                this.tid=value[1]
            },
            onEditorReady(editor) {
//                console.log('editor ready!', editor)
            },
            submit(ids){
                if(this.score==undefined){
                    this.score=0
                }
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
                formdata.append('id', this.$route.params.id);
                formdata.append('file', this.file);
                formdata.append('file1', this.file1);
                formdata.append('file2', this.file2);
                formdata.append('tid', this.tid);
                formdata.append('title', this.title);
                formdata.append('content', this.content);
                formdata.append('page', this.radio);
                formdata.append('score', this.score);
                formdata.append('fscore', [this.fscore3,this.fscore4,this.fscore5]);
//               编辑发帖
                var me=this;
                me.$axios.post(me.url+"/forum/edit", formdata)
                    .then(function (result) {
                        if(result.data.result==true){
                            me.$message({
                                message:  result.data.msg,
                                type: 'success'
                            })
                            me.$router.push({
                                path: `/indexThread/${ids}`
                            })
                        }
                        if(result.data.result==false){
                            me.$message({
                                message: result.data.msg,
                                type: 'error'
                            })
                        }
                    })
            },
            delwenjian(id){
                var me=this;
                me.$axios.post(me.url+"/forum/delfile?id="+id)
                    .then(function (result) {
                        if(result.data.result==true){
                            me.$message({
                                message: me.$t('add.delWenjian'),
                                type: 'success'
                            })
                            me.list();
                        }
                        if(result.data.result==false){
                            me.$message({
                                message: result.data.msg,
                                type: 'error'
                            })
                        }
                    })
            }
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
    .el-button--success {
        color: #fff;
        background-color: #FF5722;
        border-color: #FF5722;
    }
    .el-button--success:focus, .el-button--success:hover {
        background: #FF5722;
        border-color: #FF5722;
        color: #fff;
    }
    .ql-editor {
        min-height:300px!important;
    }
</style>
