<template>
    <div class="editor">
        <div ref="toolbar" class="toolbar">
        </div>
        <div ref="editor" class="text">
        </div>
    </div>
</template>

<script>
    import E from 'wangeditor'
    let editor=null
    export default {
        name: 'Editorbar',
        data () {
            return {
                urls:this.GLOBAL.baseUrl,
                info_: null
            }
        },
        model: {
            prop: 'value',
            event: 'change'
        },
        props: {
            value: {
                type: String,
                default: ''
            },
            isClear: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            isClear (val) {
                if (val) {
                    editor.txt.clear()
                    this.info_ = null
                }
            },
            value (val) {

                editor.txt.html(val)
            }
        },
        mounted () {
            this.seteditor()
        },
        methods: {
            seteditor () {
                editor = new E(this.$refs.toolbar, this.$refs.editor)
                editor.customConfig.uploadImgShowBase64 = true 
                editor.customConfig.uploadImgServer = 'https://neibu.qklshequ.com/bbs/file/uploadimg'// 配置服务器端地址
                editor.customConfig.uploadFileName = 'file' 
                editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024 
                editor.customConfig.uploadImgMaxLength = 6 
                editor.customConfig.uploadImgTimeout = 3 * 60 * 1000 
                editor.customConfig.menus = [
                    'bold', // 粗体
                    'underline', // 下划线
                    'link', // 插入链接
                    'quote', // 引用
//                    'emoticon', // 表情
                    'image', // 插入图片
                    'table', // 表格
                    'code', // 插入代码
                ]

                editor.customConfig.uploadImgHooks = {
                        fail: (xhr, editor, result) => {
                    },
                    success: (xhr, editor, result) => {
                },
                timeout: (xhr, editor) => {

                },
                error: (xhr, editor) => {
                    console.log(editor)

                },
                customInsert: (insertImg, result, editor) => {

                    var url = result.pojo;
                    insertImg(this.urls+url)
                   
                }
            };
                editor.customConfig.onchange= (html) => {
                    this.info_ = html
                    this.$emit('change', this.info_) 
//                    console.log(this.info_ )
                };
                editor.create()
            }
        }
    }
</script>

<style lang="css">
    .toolbar {
        border: 1px solid #ccc;
    }
    .w-e-menu{
        z-index:1 !important;
    }
    .text {
        width:100%;
        border: 1px solid #ccc;
        height: 300px;
    }
</style>
