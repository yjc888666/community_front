<template>
    <div class="fly-panel fly-panel-user" style="margin-top: 20px;">
        <div class="fly-msg" style="margin-bottom: 20px;">
            {{ $t("home.clockContent") }}
        </div>
        <div class="layui-row layui-col-space20">
            <div class="layui-col-md6">

                <div id="signin" class="fly-panel fly-signin fly-panel-border">
                    <div class="fly-panel-title">{{ $t("activityDetail.signIn") }}</div>
                    <div class="fly-panel-main fly-signin-main">
                        <button id="LAY_signin" class="layui-btn layui-btn-danger" @click="dialogFormVisibleIn = true" v-show="status==0">{{ $t("home.signIn") }}</button>
                        <button id="LAY_signout" class="layui-btn " style="background:#009688!important;" @click="dialogFormVisibleOut = true" v-show="status==1" >{{ $t("home.signOut") }}</button>
                        <button id="LAY_signouted" class="layui-btn layui-btn-disabled"  v-show="status==2">{{ $t("home.signouted") }}</button>
                    </div>
                    <el-dialog :title="$t('home.signIn')" :visible.sync="dialogFormVisibleIn">
                        <el-form :model="formIn">
                            <el-form-item :label="$t('home.date')">
                                <span>{{nowDate}}  {{week}}</span>
                            </el-form-item>
                            <el-form-item :label="$t('home.time')">
                                <span>{{nowTime}}</span>
                                <span>{{ $t("home.leftP") }}<i style="color:red">{{ $t("home.nine") }}</i>{{ $t("home.rightP") }}</span>
                            </el-form-item>
                            <el-form-item :label="$t('home.note')">
                                <el-input type="textarea" v-model="formIn.signInDesc" :placeholder="$t('home.singInC')"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisibleIn= false">{{ $t("common.cancle") }}</el-button>
                            <el-button type="primary" @click="signInEvent">{{ $t("common.determine") }}</el-button>
                        </div>
                    </el-dialog>
                    <el-dialog :title="$t('home.signOut')" :visible.sync="dialogFormVisibleOut">
                        <el-form :model="formOut">
                            <el-form-item :label="$t('home.date')">
                                <span>{{nowDate}}  {{week}}</span>
                            </el-form-item>
                            <el-form-item :label="$t('home.time')">
                                <span>{{nowTime}}</span>
                                <span>{{ $t("home.leftP1") }}<i style="color:red">{{ $t("home.six") }}</i>{{ $t("home.rightP1") }}</span>
                            </el-form-item>
                            <el-form-item :label="$t('home.note')">
                                <el-input type="textarea" v-model="formOut.signOutDesc" :placeholder="$t('home.signOutC')"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisibleOut = false">{{ $t("common.cancle") }}</el-button>
                            <el-button type="primary" @click="signOutEvent">{{ $t("common.determine") }}</el-button>
                        </div>
                    </el-dialog>
                </div>

            </div>
            <div class="layui-col-md6">
                <div class="fly-panel fly-panel-border">
                    <div class="fly-panel-title">
                       {{ $t("home.signInfo") }}
                    </div>
                    <div class="fly-panel-main layui-text" style="padding: 18px 15px; height: 50px; line-height: 50px;">
                        <!--<p>你今天的签到时间为：<i id="pointnum">{{nowTime}}</i></p>-->
                        <p>{{ $t("home.todaySign") }}<i id="pointnum">{{date| formatDate}}</i></p>
                        <p></p>
                        <p class="time" id="time"></p>
                    </div>
                </div>
            </div>
            <div class="layui-col-md12" style="margin-top: -20px;">
                <div class="fly-panel fly-panel-border">
                    <div class="fly-panel-title">
                         {{ $t("home.signList") }}
                    </div>
                    <div class="fly-panel-main">
                        <table id="userpint"></table>
                        <div class="layui-form layui-border-box layui-table-view" lay-filter="LAY-table-1" style=" ">
                            <div class="layui-table-box">
                                <div class="layui-table-header">
                                    <table cellspacing="0" cellpadding="0" border="0" class="layui-table"
                                           lay-skin="line">
                                        <thead>
                                        <tr>
                                            <th data-field="date">
                                                <div class="layui-table-cell laytable-cell-1-date" align="center"><span>{{ $t("home.signTime") }}</span>
                                                </div>
                                            </th>
                                            <th data-field="sign_in_time">
                                                <div class="layui-table-cell laytable-cell-1-sign_in_time"
                                                     align="center"><span>{{ $t("home.signIn") }}签入</span></div>
                                            </th>
                                            <th data-field="sign_in_ip">
                                                <div class="layui-table-cell laytable-cell-1-sign_in_ip" align="center">
                                                    <span>{{ $t("home.signInP") }}</span></div>
                                            </th>
                                            <th data-field="sign_in_note">
                                                <div class="layui-table-cell laytable-cell-1-sign_in_note"
                                                     align="center"><span>{{ $t("home.signInNote") }}</span></div>
                                            </th>
                                            <th data-field="sign_out_time">
                                                <div class="layui-table-cell laytable-cell-1-sign_out_time"
                                                     align="center"><span>{{ $t("home.signOut") }}</span></div>
                                            </th>
                                            <th data-field="sign_out_ip">
                                                <div class="layui-table-cell laytable-cell-1-sign_out_ip"
                                                     align="center"><span>{{ $t("home.signOutP") }}</span></div>
                                            </th>
                                            <th data-field="sign_out_note">
                                                <div class="layui-table-cell laytable-cell-1-sign_out_note"
                                                     align="center"><span>{{ $t("home.signOutNote") }}</span></div>
                                            </th>
                                            <th data-field="timeLength">
                                                <div class="layui-table-cell laytable-cell-1-timeLength" align="center">
                                                    <span>{{ $t("home.length") }}</span></div>
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr data-index="0" class="" v-for="(item,index) in messageInfo.list">
                                            <td data-field="date" align="center">
                                                <div class="layui-table-cell laytable-cell-1-date">{{item.date}}{{item.week}}</div>
                                            </td>
                                            <td data-field="sign_in_time" align="center">
                                                <div class="layui-table-cell laytable-cell-1-sign_in_time">{{item.sign_in_time}}
                                                </div>
                                            </td>
                                            <td data-field="sign_in_ip" align="center">
                                                <div class="layui-table-cell laytable-cell-1-sign_in_ip">
                                                   {{item.sign_in_ip}}
                                                </div>
                                            </td>
                                            <td data-field="sign_in_note" align="center" data-minwidth="100">
                                                <div class="layui-table-cell laytable-cell-1-sign_in_note"> {{item.sign_in_note}}</div>
                                            </td>
                                            <td data-field="sign_out_time" align="center">
                                                <div class="layui-table-cell laytable-cell-1-sign_out_time">{{item.sign_out_time}}</div>
                                            </td>
                                            <td data-field="sign_out_ip" align="center">
                                                <div class="layui-table-cell laytable-cell-1-sign_out_ip">{{item.sign_out_ip}}</div>
                                            </td>
                                            <td data-field="sign_out_note" align="center">
                                                <div class="layui-table-cell laytable-cell-1-sign_out_note">{{item.sign_out_note}}</div>
                                            </td>
                                            <td data-field="timeLength" align="center">
                                                <div class="layui-table-cell laytable-cell-1-timeLength">{{item.times}}</div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="block" v-show="pageShow">
                                <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="currentPage"
                                    :page-sizes="[5,10,20,30]"
                                    :page-size="pageSize"
                                    layout="total, sizes, prev, pager, next, jumper"
                                    :total="mytotal">
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                url:this.GLOBAL.baseUrl,
                pageShow:true,
                currentPage: 1,
                nowDate:"",
                nowTime:"",
                week:"",
                dialogFormVisibleIn: false,
                dialogFormVisibleOut: false,
                formIn: {
                    signInDesc:''
                },
                formOut: {
                    signOutDesc:''
                },
                status:null,
                messageInfo:[],
                mytotal:0,
                pageSize:5,
                pageNum:1,
                date: new Date()
            }
        },
        methods: {
            page(){
                var me=this;
                me.$axios.post(me.url+"/sign/bypage?page=" + this.pageNum + "&size=" + this.pageSize)
                    .then(function (result) {
                        me.messageInfo=result.data
                        me.mytotal=result.data.total
                        if( me.mytotal<1){
                            me.pageShow=false
                        }
                    })
                    .catch(function (error) {

                    });
            },
            handleSizeChange(val) {
                this.pageSize=val;
                this.page()
            },
            handleCurrentChange(val) {
                this.pageNum=val;
                this.page()
            },
//         签入
            signInEvent(){
                var me=this;
                let formData = new FormData();
                formData.append('note', this.formIn.signInDesc);
                me.$axios.post(me.url+"/sign/in",formData)
                    .then(function (result) {
                        me.$message.success(result.data.msg);
                        me.dialogFormVisibleIn=false;
                        me.stateEvent()
                        location.reload()
                    })
                    .catch(function (error) {

                    });
            },
//         签出
            signOutEvent(){
                var me=this;
                let formData = new FormData();
                formData.append('note', this.formOut.signOutDesc);
                me.$axios.post(me.url+"/sign/out",formData)
                    .then(function (result) {
                        me.$message.success(result.data.msg);
                        me.stateEvent()
                        me.dialogFormVisibleOut=false;
                        location.reload()
                    })
                    .catch(function (error) {

                    });
            },
 //          获取当前时间函数
            timeFormate(timeStamp) {
                let year = new Date(timeStamp).getFullYear();
                let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
                let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
                let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
                let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
                let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
                this.nowDate = year + "-" + month + "-" + date +" "+" ";
                this.nowTime = hh+":"+mm+":"+ss;
                var dateString = this.nowDate;
                var dateObject = new Date(dateString);
                this.week=dateObject.getDay()
                if(this.week==1){
                    this.week=this.$t("home.Monday")
                }
                if(this.week==2){
                    this.week=this.$t("home.Tuesday")
                }
                if(this.week==3){
                    this.week=this.$t("home.Wednesday")
                }
                if(this.week==4){
                    this.week=this.$t("home.Thursday")
                }
                if(this.week==5){
                    this.week=this.$t("home.Friday")
                }
                if(this.week==6){
                    this.week=this.$t("home.Saturday")
                }
                if(this.week==0){
                    this.week=this.$t("home.Sunday")
                }
            },
//         定时器函数
            nowTimes(){
                this.timeFormate(new Date());
                setInterval(this.nowTimes,30*1000);
            },
            stateEvent(){
                var me=this;
                me.$axios.post(me.url+"/sign/status")
                    .then(function (result) {
                        me.status=result.data.status
                    })
                    .catch(function (error) {

                    });
            }
        },
        filters: {
            formatDate: function (value) {
                var date = new Date(value);
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? ('0' + MM) : MM;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                let m = date.getMinutes();
                m = m < 10 ? ('0' + m) : m;
                let s = date.getSeconds();
                s = s < 10 ? ('0' + s) : s;
                return  h + ':' + m + ':' + s;
            }
        },
        mounted:function () {
//            签到状态
            var me=this;
            me.stateEvent()
//           签到信息明细
            me.page()
            me.nowTimes()
            this.timer = setInterval(function(){
                me.date = new Date();
            },1000)
        },
        beforeDestroy:function(){
            if(this.timer){
                clearInterval(this.timer);
            }
        }

        }
</script>
<style>
    .el-pagination {
        padding: 6px 5px;
        text-align: center;
    }
    .laytable-cell-1-sign_in_note{
        width:106px;
    }
    .laytable-cell-1-sign_out_note{
        width:105px;
    }
    .layui-table-header {
        overflow: auto !important;
    }
    .el-pagination__total {
        display: none !important;
    }

    .el-pagination__sizes {
        display: none !important;
    }

    @media screen and (min-width: 768px) {
        .el-pagination {
            text-align: left;
        }
        .el-pagination__total {
            display: inline-block !important;
        }

        .el-pagination__sizes {
            display: inline-block !important;
        }
    }
    .el-form-item {
        margin-bottom: 10px;
    }
    .el-form-item__label{
        text-align: left;
        width:50px!important;
        border:0;
    }
    .el-form-item__content{
       margin-left:50px;
    }
    .el-dialog__body{
        padding:15px;
    }
</style>
