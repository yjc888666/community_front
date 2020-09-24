<template>
    <div>
        <my-search></my-search>
        <div class="layui-container">
            <div class="layui-row layui-col-space15">
                <div class="layui-col-md8 content detail">
                    <div class="fly-panel detail-box">
                        <h1 v-html="data.title"></h1>
                        <div class="fly-detail-info">
                        <span class="layui-hide-xs" v-show="!data.myself">
                        <a style="color:#fff;" class="layui-badge layui-bg-green fly-detail-column" href="javascript:;" @click="enlistEvent" v-show="!data.baoming">{{ $t("activityDetail.baoming") }}</a>
                        <a style="color:#fff;" class="layui-badge layui-bg-green fly-detail-column" href="javascript:;" @click="signEvent" v-show="!data.qian">{{ $t("activityDetail.signIn") }}</a>
                        </span>
                        <span class="layui-bg-orange" :class="{'layui-badge':data.myself}">
                            <a style="color:#fff;" href="javascript:;"  @click="edit(data.id)" v-show="data.myself">{{ $t("common.edits") }}</a>
                        </span>
                            <div class="fly-admin-box" data-id="437"></div>
                    <span class="fly-list-nums">
                    <a href="javascript:void(0)" @click="goAnchor('#comment')">
                        <i class="iconfont" title="$t('indexSearch.reply')"></i>
                        <em>{{data.reply}}</em>
                    </a>
                         <i class="iconfont" title="$t('indexSearch.popularity')"></i>
                        <em>{{data.view}}</em>
                    </span>
                        </div>
                        <div class="detail-about">
                            <a class="fly-avatar" href="javascript:;" @click="homeEvent(data.uid)">
                                <img :src="url+data.userhead" alt=""> </a>
                            <div class="fly-detail-user">
                                <a href="javascript:;" class="fly-link" @click="homeEvent(data.uid)">
                                    <cite>{{data.username}}</cite>
                                </a>
                                <span  type="jubao" style="cursor:pointer" @click="jubao">{{ $t("common.jubao") }}</span>
                            </div>
                            <div class="detail-hits" id="LAY_jieAdmin">
                                <span>{{data.add_time}}</span>
                            </div>
                        </div>
                        <div class="detail-body photos">
                            <div class="enlist">
                                <div><strong>{{ $t("activityDetail.startTime") }}:{{data. start_time}}</strong>  </div>
                                <div><strong>{{ $t("activityDetail.endTime") }}:{{data. end_time }}</strong></div>
                                <div><strong>{{ $t("activityDetail.people") }}:{{data. enrollnum }}</strong></div>
                                <div><strong>{{ $t("activityDetail.join") }}:{{data. joinnum }}</strong></div>
                            </div>
                            <div class="wangEditor-container cl" style="border: 0px solid #e6e6e6;">

                                <div class="wangEditor-txt" style="padding: 0;margin-top: 0;">
                                    <p v-html="data.content" v-show="payShow"></p>
                                    <p v-html="data.description" v-show="!payShow"></p>
                                    <div v-show="data.readable==1">
                                            <div style="border:1px dashed #2F4056;height:30px;line-height:30px;padding-left:15px;color:#F7B824;font-size:12px;">{{ $t("activityDetail.payContent") }}
                                            <a href="javascript:;"  style="margin-left:10px;" @click="payEvent">{{ $t("activityDetail.pay") }}</a></div>
                                    </div>
                                    <div v-show="data.readable==2">
                                        <div style="border:1px dashed #2F4056;height:30px;line-height:30px;padding-left:15px;color:#F7B824;font-size:12px;">{{ $t("activityDetail.replyContent") }}
                                            <a href="javascript:;" style="margin-left:10px;" @click="goAnchor('#comment')">{{ $t("activityDetail.reply") }}</a>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="fly-panel detail-box" style="text-align:center">

                        <div class="layui-btn-container" v-show="data.myself==true">
                            <button class="zancoll layui-btn layui-btn-primary" @click="myEvent"><i class="fa fa-thumbs-up"></i> {{ $t("activityDetail.zan") }} <em>{{data.zan}}</em></button>
                            <button class="zancoll layui-btn layui-btn-primary" @click="myEvent"><i class="fa fa-heart"></i> {{ $t("activityDetail.collect") }} <em>{{data.collect}}</em></button>
                            <button class="zancoll layui-btn layui-btn-primary" @click="myEvent"><i class="fa fa-heart"></i> {{ $t("activityDetail.care") }} <em>{{data.care}}</em></button>
                            <button class="layui-btn layui-btn-primary" @click="myEvent"><i class="fa fa-rmb"></i> {{ $t("activityDetail.tips") }}<em>{{data.tips}}</em></button>
                            <a  class="layui-btn layui-btn-primary" @click="louzuEvent(seeShow);seeShow=!seeShow" :class="{'layui-bg-gray':seeShow}"><i class="fa fa-hourglass-1 fa-sm"></i> {{seeNr}}</a>
                        </div>
                        <div class="layui-btn-container" v-show="data.myself==false">
                            <button class="zancoll layui-btn layui-btn-primary" @click="zanEvent(data.ifzan);data.ifzan=!data.ifzan" :class="{'layui-bg-gray':data.ifzan}" ><i class="fa fa-thumbs-up"></i> {{ $t("activityDetail.zan") }}  <em>{{data.zan}}</em></button>
                            <button class="zancoll layui-btn layui-btn-primary"  @click="collectEvent(data.ifcollect);data.ifcollect=!data.ifcollect" :class="{'layui-bg-gray':data.ifcollect}"><i class="fa fa-heart"></i> {{ $t("activityDetail.collect") }}  <em>{{data.collect}}</em></button>
                            <button class="zancoll layui-btn layui-btn-primary " @click="careEvent(data.ifcare);data.ifcare=!data.ifcare" :class="{'layui-bg-gray':data.ifcare}"><i class="fa fa-heart"></i> {{ $t("activityDetail.care") }} <em>{{data.care}}</em></button>
                            <button class="layui-btn layui-btn-primary" @click="tipsEvent"><i class="fa fa-rmb"></i> {{ $t("activityDetail.tips") }}<em>{{data.tips}}</em></button>
                            <a  class="layui-btn layui-btn-primary" @click="louzuEvent(seeShow);seeShow=!seeShow" :class="{'layui-bg-gray':seeShow}"><i class="fa fa-hourglass-1 fa-sm"></i> {{seeNr}}</a>
                        </div>
                    </div>
                    <div class="layui-layer-shade" id="layui-layer-shade98" style="z-index: 19891111; background-color: rgb(0, 0, 0); opacity: 0.3;" v-show="tipsShow"></div>
                    <div class="layui-layer layui-layer-page pop_reward_page"  type="page" style="z-index: 19891112; position:fixed;width: 400px; height: 363px; top: 250px; margin:0 auto;" v-show="tipsShow">
                        <div class="layui-layer-content" style="height: 363px;" >
                            <div  class="layui-layer-content dashang layui-layer-wrap" :style="{backgroundImage: 'url(' + img + ')'}">
                        <div class="reward">
                            <div class="close_reward" @click="closeEvent"></div>
                            <div class="reward_avatar"><img :src="url+data.userhead" class="avatar" width="40" height="40"></div>
                            <div class="reward_name">{{data.username}}</div>
                            <div  id="reward_form">
                                <input type="text" onkeyup="this.value=this.value.replace(/[^0-9-]+/,'');" maxlength="4" name="reward_number" value="66" ref="input1" min="1">
                                <i>{{ $t("activityDetail.gold") }}</i>
                                <p style="color:#dedede">{{ $t("activityDetail.money") }}</p>
                            </div>

                            <div class="reward_btn" @click="rewardEvent(data.tips)">{{ $t("activityDetail.tip") }}</div>
                        </div>
                    </div>
                        </div><span class="layui-layer-setwin"></span><span class="layui-layer-resize"></span></div>

                    <div class="fly-panel detail-box" id="flyReply">
                        <div id="comment" > </div>
                        <fieldset class="layui-elem-field layui-field-title" style="text-align: center;">
                            <legend>{{ $t("activityDetail.replies") }}</legend>
                        </fieldset>
                        <ul class="jieda">
                            <li class="jieda-daan" v-for="(replyItem,index) in replyData" v-show="louzuShow">
                                <div class="detail-about detail-about-reply">
                                    <a class="fly-avatar" href="javascript:;">
                                        <img :src="url+replyItem.userhead" alt="" @click="homeEvent(replyItem.uid)"/> </a>
                                    <div class="fly-detail-user">
                                        <a href="javascript:;" class="fly-link" @click="homeEvent(replyItem.uid)">
                                            <cite class="username">{{replyItem.username}}<i v-show="replyItem.louzhu"> {{ $t("activityDetail.louzhu") }}</i></cite>
                                        </a>
                                    </div>
                                    <div class="detail-hits">
                                        <span>{{replyItem.time}}</span>
                                    </div>
                                    <i class="iconfont icon-caina" style="display:none" ></i>
                                </div>
                                <div class="detail-body jieda-body photos">
                                    <p>
                                    <p v-html="replyItem.content"></p></p>

                                    <div class="home-dacontent" v-show="replyItem.tid != 0">
                                        {{replyItem.tname}}:<p v-html="replyItem.tcontent"></p>
                                    </div>
                                </div>
                           <div class="jieda-reply" v-show="!replyItem.myself">
                            <span class="jieda-zan " type="zan" @click="zanOtherEvent(index,replyItem.id,replyItem.zanid);replyItem.zanid=!replyItem.zanid"  :class="{'zanok':replyItem.zanid}">
                            <i class="iconfont icon-zan"></i>
                            <em>{{replyItem.zan}}</em>
                            </span>
                            <span class="jieda-jubao" type="jubao" @click="jubaoOtherEvent(replyItem.id)">
                            <img src="../assets/img/jubao.png" width="20">
                            <em>{{ $t("activityDetail.rep") }}</em>
                            </span>
                            <span type="reply" @click="replyOtherEvent(replyItem.id,replyItem.username,replyItem.tid);goAnchor('#reply')">
                            <i class="iconfont icon-svgmoban53"></i>
                            <em>{{ $t("common.jubao") }}</em>
                            </span>
                           </div>
                            <div class="jieda-reply" v-show="replyItem.myself">
                             <span class="jieda-zan " data-id="490" type="zan" @click="myEvent">
                             <i class="iconfont icon-zan"></i>
                             <em>{{replyItem.zan}}</em>
                             </span>
                             <span type="edit" @click="delEvent(replyItem.id)" ><a style="color:#999" data-id="490"  class="del_btn"> <i class="iconfont icon-guanbi"></i>{{ $t("common.del") }}</a></span>                                         </div>
                            </li>

                            <li class="jieda-daan" v-for="(louzuItem,index) in louzuData" v-show="!louzuShow">
                                <div class="detail-about detail-about-reply">
                                    <a class="fly-avatar" href="javascript:;">
                                        <img :src="url+louzuItem.userhead" alt="" @click="homeEvent(louzuItem.uid)"/> </a>
                                    <div class="fly-detail-user">
                                        <a href="javascript:;" class="fly-link" @click="homeEvent(louzuItem.uid)">
                                            <cite class="username">{{louzuItem.username}}{{ $t("activityDetail.louzhu") }}</cite>
                                        </a>
                                    </div>
                                    <div class="detail-hits">
                                        <span>{{louzuItem.time}}</span>
                                    </div>
                                    <i class="iconfont icon-caina" style="display:none" ></i>
                                </div>
                                <div class="detail-body jieda-body photos">
                                    <p>
                                    <p v-html="louzuItem.content"></p></p>
                                    <div class="home-dacontent" v-show="louzuItem.tid != 0">
                                        {{louzuItem.tname}}:<p v-html="louzuItem.tcontent"></p>
                                    </div>
                                    <!--<div class="home-dacontent" v-show="0">-->
                                        <!--111111111111<p>2222222222222</p>-->
                                    <!--</div>-->
                                </div>
                                <div class="jieda-reply" v-show="!louzuItem.myself">
                            <span class="jieda-zan " type="zan" @click="zanOtherEvent(louzuItem.id,louzuItem.zanid);louzuItem.zanid=!louzuItem.zanid"  :class="{'zanok':louzuItem.zanid}">
                            <i class="iconfont icon-zan"></i>
                            <em>{{louzuItem.zan}}</em>
                            </span>
                            <span class="jieda-jubao" type="jubao" @click="jubaoOtherEvent(louzuItem.id)">
                            <img src="../assets/img/jubao.png" width="20">
                            <em>{{ $t("common.jubao") }}</em>
                            </span>
                            <span type="reply" @click="replyOtherEvent(louzuItem.id,louzuItem.username);goAnchor('#reply')">
                            <i class="iconfont icon-svgmoban53"></i>
                            <em>{{ $t("activityDetail.rep") }}</em>
                            </span>
                                </div>
                                <div class="jieda-reply" v-show="louzuItem.myself">
                             <span class="jieda-zan " data-id="490" type="zan" @click="myEvent">
                             <i class="iconfont icon-zan"></i>
                             <em>{{louzuItem.zan}}</em>
                             </span>
                                    <span type="edit" @click="delEvent(louzuItem.id)" ><a style="color:#999" data-id="490"  class="del_btn"> <i class="iconfont icon-guanbi"></i>{{ $t("common.del") }}</a></span>                                         </div>
                            </li>
                        </ul>
                        <div v-show="pageShow">
                            <el-pagination
                                @current-change="handleCurrentChange"
                                :current-page="currentPage"
                                :page-size="pageSize"
                                layout="total, prev, pager, next"
                                :total="totalCount">
                            </el-pagination>
                        </div>

                        <div style="text-align: center"></div>

                        <div class="layui-form layui-form-pane" style="margin-top:20px;" id="reply">
                            <form>
                                <div class="layui-form-item layui-form-text">
                                    <div class="layui-input-block">
                                       <span id="huifu" v-show="huifuShow">
                                         <i style="color:#F7B824">@{{huifuName}}</i>
                                        </span>
                                        <div class="edit_container">
                                            <editor-bar v-model="zldata.info" :isClear="isClear"></editor-bar>
                                        </div>
                                        <input type="hidden" name="tid" value="0" id="tid"/>
                                    </div>
                                </div>
                                <div class=" layui-form-item">
                                    <el-button type="primary" @click="submit" class="layui-btn">{{ $t("common.tijiao") }}</el-button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="layui-col-md4">
                    <my-memo></my-memo>
                    <my-hot></my-hot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Search from "../components/Search"
    import {quillEditor} from 'vue-quill-editor'
    import Memo from "../components/Memo"
    import Hot from "../components/Hot"
    import Img from '../assets/img/shang.png'
    import EditorBar from '../components/editor'
    export default {
        name: 'activityDetail',
        data () {
            return {
                url:this.GLOBAL.baseUrl,
                data: '',
                content: '<h3></h3>',
                editorOption: {},
                payShow:true,
                replyData:[],
                totalCount:0,
//                <!--当前页数-->
                currentPage:1,
//                <!--每页条数-->
                pageSize:10,
                pageShow:false,
                replyShow:"",
                img: Img,
                tipsShow:false,
//               打赏
                reward:'',
                louzuShow:true,
                louzuData:[],
                seeShow:false,
                seeNr:this.$t("common.seer"),
                huifuShow:false,
                huifuName:"",
                tid:'',
                replyid:'',
                replyItemShow:'',
                isClear: false,
                zldata: {
                    info:'',
                },
            }
        },
        components: {
            'my-search': Search,
            quillEditor,
            'my-memo': Memo,
            'my-hot': Hot,
             EditorBar
        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill
            }
        },
        methods: {
          //锚点滚动到固定位置
            goAnchor(selector) {
                var anchor = this.$el.querySelector(selector)
                document.body.scrollTop = anchor.offsetTop; // chrome
                document.documentElement.scrollTop = anchor.offsetTop; // firefox
            },
            getInteraction(action,target,msg){
                var me=this;
                var id = this.$route.params.id;
                me.$axios.post(me.url+"/activity/interact?id="+id+"&action=" + action + "&target=" + target+"&msg=" + msg)
                    .then(function (result) {
                        if(result.data.result==false){
                            me.$message.error(result.data.msg);
                        }

                    })
                    .catch(function (error) {

                    });
            },
            replyInteraction(id,action,target,msg){
                var me=this;
                me.$axios.post(me.url+"/activity/interact?id="+id+"&action=" + action + "&target=" + target+"&msg=" + msg)
                    .then(function (result) {
                        if(result.data.result==false){
                            me.$message.error(result.data.msg);
                        }
                    })
                    .catch(function (error) {

                    });
            },
            getReply(mypages){
                var me=this;
                var id = this.$route.params.id;
                me.$axios.post(me.url+"/activity/commentlist?id="+id+"&page=" + mypages + "&size=" + this.pageSize)
                    .then(function (result){
                        me.replyData = result.data.list;
                        me.totalCount=result.data.total;
                        $.each(me.replyData,function(index,item){
                            if(item.tid==0){
                                 me.replyItemShow=false;
                            }else{
                                me.replyItemShow=true;
                            }
                        })
                        if(me.totalCount>1){
                            me.pageShow=true
                        }
                        else{
                           me.pageShow=false
                        }
                    })
                    .catch(function (error) {

                    });
            },
            onEditorReady(editor) {
//                console.log('editor ready!', editor)
            },
//            发表回复
            submit(){
                var me=this;
                var contents={
                    fid:this.$route.params.id,
                    content:this.zldata.info,
                    tid:this.tid
                }
               me.$axios.post(me.url+"/activity/comment",contents)
                .then(function (result) {
                    if(result.data.result==true){
                        me.$message.success(me.$t("common.tijiaoS"));
                        me.huifuShow=false;
                    }

                    me.zldata.info="";
                    me.getReply(1);
                    me.louzuEvent();
                })
                .catch(function (error) {
                    console.log(error);
                });


            },
            payEvent(){
                var me = this;
                var id = this.$route.params.id
                me.$confirm(this.$t("activityDetail.kou"), this.$t("common.warn"), {
                    confirmButtonText: this.$t("common.determine"),
                    cancelButtonText: this.$t("common.cancle"),
                    type: 'warning'
                }).then(() => {
//                    付费阅读
                    me.$axios.post(me.url+"/forum/payread?id="+id)
                    .then(function (result) {
                        me.payShow=true
                        me.$message({
                            type: 'success',
                            message: result.data.msg
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

            }).catch(() => {
                    me.$message({
                    type: 'info',
                    message: this.$t("activityDetail.canclePay"),
                });
            })
            },
            jubao(){
                var me=this;
                var id = this.$route.params.id
                me.$prompt(me.$t("activityDetail.con"), this.$t("common.warn"), {
                    cancelButtonText:  me.$t("activityDetail.cancelButtonText"),
                    confirmButtonText:me.$t("activityDetail.confirmButtonText"),
                }).then(({ value }) => {
                    //alert(1)
                    if(value==null){
                    me.$message({
                        type: 'error',
                        message:me.$t("activityDetail.conP")
                    });
                        return;
                   }
                    me.$axios.post(me.url+"/activity/interact?id="+id+"&action=jubao&target=activity&msg="+value)
                    .then(function (result) {
                        if(result.data.result==true){
                            me.$message.success(result.data.msg);
                        }
                        if(result.data.result==false){
                            me.$message.error(result.data.msg);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }).catch(() => {
                    me.$message({
                    type: 'error',
                    message: me.$t("activityDetail.canceljubao")
                })
            })
            },
            handleSizeChange(val) {
//                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                var me=this;
                me.getReply(val)
        },
       zanEvent(zan){
           if(zan==true){
               this.getInteraction("zan","activity","")
               this.data.zan=this.data.zan-1
           }
           if(zan==false){
               this.getInteraction("zan","activity","")
               this.data.zan=this.data.zan+1
           }

       },
       collectEvent(collect){
           if(collect==true){
               this.getInteraction("collect","activity","")
               this.data.collect=this.data.collect-1
           }
           if(collect==false){
               this.getInteraction("collect","activity","")
               this.data.collect=this.data.collect+1
           }
       },
       careEvent(care){
           if(care==true){
               this.getInteraction("care","activity","")
               this.data.care=this.data.care-1
           }
           if(care==false){
               this.getInteraction("care","activity","")
               this.data.care=this.data.care+1
           }
       },
       tipsEvent(){
           this.tipsShow=true
       },
       closeEvent(){
           this.tipsShow=false
       },
//        打赏的接口
       rewardEvent(tips){
           var id = this.$route.params.id;
           this.reward = this.$refs.input1.value
           var msg=this.reward;
           this.tipsShow=false
           var me=this;
           me.$axios.post(me.url+"/activity/interact?id="+id+"&action=tips&target=activity&msg="+msg)
               .then(function (result) {
                   if(result.data.result==true){
                       me.$message.success(result.data.msg);
                       me.data.tips=me.data.tips+1
                   }
                   if(result.data.result==false){
                       me.$message.error(result.data.msg);
                       me.data.tips=me.data.tips
                   }
               })
               .catch(function (error) {

               });
       },
//       只看楼主
            louzuEvent(louzu){
                var id = this.$route.params.id;
                var me=this;
                if(louzu==false){
                    me.$axios.post(me.url+"/activity/commentlist?id="+id+"&page=" + this.currentPage + "&size=" + this.pageSize+"&louzhu=true")
                        .then(function (result) {
                            console.log(result)
                            me.louzuShow=false
                            me.louzuData=result.data.list
                            me.seeNr=me.$t("common.cancelSeer")
                            me.totalCount=result.data.total
                            if(me.totalCount>1){
                                me.pageShow=true;
                            }else{
                                me.pageShow=false;
                            }
                        })
                        .catch(function (error) {

                        });
                }
                else{
                    this.getReply(parseInt(this.currentPage))
                    this.louzuShow=true
                    this.seeNr=this.$t("common.seer")
                }

            },
//        自己为自己的互动
          myEvent(){
              this.$message.error(this.$t("common.myself"));
            },
//        自己删除回复
        delEvent(id){
            var me=this;
            me.$axios.post(me.url+"/activity/commentdel?id="+id)
                .then(function (result) {
                    me.getReply(1);
                    me.$message({
                        type: 'success',
                        message:result.data.msg
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
            zanOtherEvent(index,id,zan){
                if(!zan){
                    this.replyInteraction(id,"zan","comment","")
                    this.replyData[index].zan=this.replyData[index].zan+1
                }
                else{
                    this.replyInteraction(id,"zan","comment","")
                    this.replyData[index].zan=this.replyData[index].zan-1
                }

            },
            jubaoOtherEvent(id){
                var me=this;
                me.$prompt(me.$t("activityDetail.con"), this.$t("common.warn"), {
                    cancelButtonText: me.$t("activityDetail.cancelButtonText"),
                    confirmButtonText: me.$t("activityDetail.confirmButtonText"),
                }).then(({ value }) => {
                if(value==null){
                    me.$message({
                        type: 'info',
                        message:me.$t("activityDetail.conP")
                    });
                    return;
                }else{
                    me.replyInteraction(id,"jubao","comment",value)
                }
            }).catch(() => {
                    me.$message({
                    type: 'info',
                    message: me.$t("activityDetail.canceljubao")
                })
            })
            },
            replyOtherEvent(id,username,replyid){
                this.huifuName=username;
                this.tid=id;
                this.huifuShow=true
                this.replyid=replyid

            },
            edit(id){
                this.$router.push({
                    path: `/editActivity/${id}`
                })
            },
            forumlist(id){
                this.$router.push({
                    path: `/notelist/${id}`
                })
            },
            homeEvent(id){
                this.$router.push({
                    path: `/homes/${id}`
                })
            },
            notelistEvent(id){
                this.$router.push({
                    path: `/notelist/${id}`
                })
            },
            enlistEvent(){
                var me=this;
                var id = this.$route.params.id;
                me.$axios.post(me.url+"/activity/enroll?id="+id)
                    .then(function (result) {
                        if(result.data.result==true){
                            me.$message.success(me.$t("activityDetail.baomingS"));
                            me.activity();
                        }
                        if(result.data.result==false){
                            me.$message.error(result.data.msg);
                        }
                    })
                    .catch(function (error) {

                    });
            },
            signEvent(){
                var me=this;
                var id = this.$route.params.id;
                me.$axios.post(me.url+"/activity/sign?id="+id)
                    .then(function (result) {
                        if(result.data.result==true){
                            me.$message.success(me.$t("activityDetail.qiandao"));
                            me.activity();
                        }
                        if(result.data.result==false){
                            me.$message.error(result.data.msg);
                        }
                    })
                    .catch(function (error) {

                    });
            },
            activity(){
                var id = this.$route.params.id
                var me = this;
                me.$axios.post(me.url+"/activity/info?id="+id)
                    .then(function (result){
                        if(result.data.result==true){
                            me.data = result.data.pojo;
                            if(result.data.pojo.readable==1){
                                me.payShow=false
                            }
                            if(result.data.pojo.readable==2){
                                me.payShow=false
                                if(me.replyData.list.length!=0){
                                    me.replyShow=false
                                }
                                else{
                                    me.replyShow=true
                                }
                            }
                        }
                        if(result.data.result==false){
                            if(result.data.login==false){
                                me.$message.error(me.$t("common.noLogin"));
                                me.$router.push({path: '/login'});
                            }
                        }


                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }

        },
        mounted(){
             var me=this;
              me.activity();
              me.getReply(parseInt(this.currentPage))

        },
        watch: {
            '$route' (to, from) {
                this.$router.go(0);
            }},
    }
</script>

<style >
    .fly-footer {
        margin: 50px 0 0;
        padding: 20px 0 30px;
        line-height: 30px;
        text-align: center;
        color: #737573;
        border-top: 1px solid #e2e2e2;
    }

    .fly-footer a {
        padding: 0 6px;
        font-weight: 300;
        color: #333;
    }

    .fly-footer a:hover {
        color: #777;
    }

    .fly-union {
        margin-top: 10px;
        color: #999;
    }

    .fly-union > * {
        display: inline-block;
        vertical-align: middle;
    }

    .fly-union a[upyun] img {
        width: 80px;
    }

    .fly-union span {
        position: relative;
        top: 3px;
    }

    .fly-union span a {
        padding: 0;
        display: inline;
        color: #999;
    }

    .fly-union span a:hover {
        text-decoration: underline;
    }

    .rule li {
        line-height: 30px;
        list-style: normal;
        list-style: disc;
    }

    .rule li:nth-child(2) {
        margin-bottom: 20px;
    }

    .rule {
        margin-top: 15px;
        padding: 0 18px;
    }

    .el-dialog__headerbtn .el-dialog__close {
        color: #333;
    }
    .jieda li:last-child{
        border-bottom: 0;
    }
    .edit_container{
        margin-top:25px;
    }
    .ql-editor {
        min-height: 120px!important;
    }
    .reward {
        width: 320px;
        height: 363px;
        border-radius: 14px;
        padding: 0 40px;
    }
    .close_reward {
        width: 46px;
        height: 46px;
        position: absolute;
        right: 1px;
        cursor: pointer;
    }
    div#reward_form {
        text-align: center;
        margin: 40px 0 0;
    }
    .reward_btn {
        background: #f1bc78;
        position: absolute;
        bottom: 40px;
        font-size: 30px;
        color: #d3454e;
        width: 320px;
        text-align: center;
        line-height: 60px;
        border-radius: 5px;
        cursor: pointer;
    }
    .reward_name {
        text-align: center;
        margin: 10px;
        font-size: 20px;
        color: #fff;
    }
    .reward_avatar {
        text-align: center;
    }
    .reward_avatar img {
        border-radius: 100px;
        width: 92px;
        height: 92px;
        margin-top: -45px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.46);
    }
    div#reward_form input {
        background: 0;
        border: 0;
        color: #FBD776;
        font-size: 70px;
        text-align: center;
        width: 155px;
    }
    div#reward_form i {
        color: #FBD776;
        font-style: normal;
        margin-left: 10px;
        font-size: 20px;
    }
    .layui-layer-page .layui-layer-content {
        position: relative;
    }
    .layui-layer-shade {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        position: fixed;
    }
    .wangEditor-txt{
        overflow: hidden;
    }
    .w-e-text-container{
       z-index:90!important;
    }
    .enlist div{
        line-height:22px;
        font-size:14px;
    }

</style>
