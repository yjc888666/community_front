<template>
    <div class=" fly-panel-user">
        <div class="layui-tab layui-tab-brief" lay-filter="user">
            <ul class="layui-tab-title" id="LAY_mine" :class="{'layui-tab-more':!ismore}">
                <li class="layui-this" @click="lateEvents()">迟到早退</li>
                <li><router-link to="/aleave">请假调休</router-link></li>
                <li><router-link to="/aovertime">加班考勤</router-link></li>
                <li><router-link to="/aoutwork">外出考勤</router-link>
                <li><router-link to="/amonth">月末统计</router-link></li>
                <span class="layui-unselect layui-tab-bar" lay-stope="tabmore" title="" style="display:none"
                      v-on:click="ismore=!ismore"><i lay-stope="tabmore" class="layui-icon"></i></span>
            </ul>
            <div class="layui-tab-content" style="padding: 20px 0 0;">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="10px" class="demo-ruleForm onesearch">
                    <el-form-item label="" prop="year">
                        <el-date-picker
                            v-model="ruleForm.year"
                            type="year"
                            format="yyyy"
                            value-format="yyyy"
                            @change="getyear"
                            placeholder="选择年">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="" prop="month">
                        <el-date-picker
                            v-model="ruleForm.month"
                            type="month"
                            @change="getmonth"
                            format="MM"
                            value-format="MM"
                            placeholder="选择月">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">搜索</el-button>
                    </el-form-item>
                </el-form>
                <div class="clear"></div>
                <ul class="record">
                    <li class="chidao">
                        <div class="lefts">
                            <h1>本月迟到记录</h1>
                            <h2>{{late}} 次</h2>
                        </div>
                        <img src="../../assets/img/chidao.png" alt="">
                    </li>
                    <li class="zaotui">
                        <div class="lefts">
                            <h1>本月早退记录</h1>
                            <h2>{{leave}} 次</h2>
                        </div>
                        <img src="../../assets/img/zaotui.png" alt="">
                    </li>
                    <li class="kuang">
                        <div class="lefts">
                            <h1>本月旷班记录</h1>
                            <h2>{{absenteeism}} 次</h2>
                        </div>
                        <img src="../../assets/img/kuang.png" alt="">
                    </li>
                </ul>
                <div class="time-sec-one">
                    <el-row>
                        <el-col :span="24">
                            <div class="time-info f14">本月异常签到明细表
                                <div class="fr">
                                    <el-button  icon="el-icon-circle-plus-outline" @click="daoEvent()">导出</el-button>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <el-table
                    border
                    ref="multipleTable"
                    :data="tableData"
                    style="width: 100%;color:#666;margin-top:10px;"
                    :header-cell-style="{background:'#E3E4E6'}">
                    <el-table-column
                        align='center'
                        prop="date"
                        label="签到日期">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="week"
                        label="星期">
                    </el-table-column>
                    <el-table-column label="签入时间" prop="sign_in_time">
                        <template slot-scope="scope">
                            <div :class="scope.row.sign_in_time>='09:00:00'? 'one' :''"> {{ scope.row.sign_in_time }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="sign_in_note"
                        label="签入备注">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="sign_in_ip"
                        label="签入ip">
                    </el-table-column>

                    <el-table-column label="签出时间" prop="sign_out_time">
                        <template slot-scope="scope">
                            <div :class="scope.row.sign_out_time<='18:00:00'? 'one' :''"> {{ scope.row.sign_out_time }}</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="sign_out_note"
                        label="签出备注">
                    </el-table-column>
                    <el-table-column
                        style="color:red"
                        align='center'
                        prop="sign_out_ip"
                        label="签出ip">
                    </el-table-column>
                </el-table>
                <el-pagination
                    @size-change="handleSizeChangeCont"
                    @current-change="handleCurrentChangeCont"
                    :current-page="currentPage"
                    :page-sizes="[5,10, 20, 30, 40]"
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="mytotal"
                    v-if="mytotal!=0">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                url:this.GLOBAL.baseUrl,
                ismore: true,
                tab:0,
                mytotal:0,
                tableData:[],
                currentPage:1,
                pagesize:5,
                pages:0,
                pageNums:0,
                late:"", //迟到数量
                leave:"", //早退数量
                absenteeism:"",  //旷工
                ruleForm: {
                    year: '',
                    month: '',
                },
                rules: {
                },
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.list();
                        this.lateEvent(1,this.pagesize);
                    } else {
                        console.log('error submit!!');
                return false;
            }
            });
            },
//           记录
            list(){
                var me=this;
                let formData = new FormData();
                formData.append('year', me.ruleForm.year);
                formData.append('month', me.ruleForm.month);
                me.$axios.post(me.url+"/sign/list",formData)
                    .then(function (result) {
                        me.late = result.data.late;
                        me.leave = result.data.leave;
                        me.absenteeism = result.data.absenteeism;
                    })
                    .catch(function (error) {

                    });
            },
            lateEvent(a,b){
                var me=this;
                let formData = new FormData();
                formData.append('year', me.ruleForm.year);
                formData.append('month', me.ruleForm.month);
                formData.append('page',a);
                formData.append('size',b);
                me.$axios.post(me.url+"/sign/getdis",formData)
                    .then(function (result) {
                            me.tableData=result.data.list;
                            me.mytotal=result.data.total;
                            me.pageNums = result.data.pageNum;
                            me.pages = result.data.pages;
                        if(result.data.list.length!=0){
                            if(me.pageNums > me.pages && me.currentPage!=0){
                                me.currentPage = me.pages
                                me.lateEvent(me.currentPage,me.pagesize)
                            }
                        }

                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            lateEvents(){
                this.list();
                this.lateEvent(1,this.pagesize);
            },
            handleSizeChangeCont: function(sizes) {
                this.pagesize = sizes;
                this.lateEvent(this.currentPage,sizes)
            },
            handleCurrentChangeCont: function(currentPage) {
                this.currentPage = currentPage;
                this.lateEvent(currentPage,this.pagesize)
            },
            getyear(val){
                this.ruleForm.year = val;
            },
            getmonth(val){
                this.ruleForm.month = val;
            },
            daoEvent(){
                var me=this;
                if(me.tableData==undefined){
                    this.$message.error("没有可以导出的数据");
                    return;
                }
                if(me.tableData.length ==0||me.tableData.length ==undefined){
                    this.$message.error("没有可以导出的数据");
                }else{
                    me.$axios({ 
                        method: 'post',
                        url: me.url+"/sign/signExcel",
                        data:{
                            year:this.ruleForm.year,
                            month :this.ruleForm.month
                        },
                        responseType: 'blob', 
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(res => {
                        const BLOB = res.data
                        
                        const fileReader = new FileReader()
                       
                        fileReader.readAsDataURL(BLOB)
                  
                    fileReader.onload = (event) => {
                        let a = document.createElement('a')
                        a.download = `迟到早退.xls`
                        a.href = event.target.result
                        document.body.appendChild(a)
                        a.click()
                        document.body.removeChild(a)
                    }
                })
                }
            }
        },
        mounted(){
            this.list();
            this.lateEvent(1,this.pagesize);
        }
    }
</script>
<style scoped>
    .layui-tab-title li {
        line-height: 40px;
    }

    .laytable-cell-1-title {
        width: 300px !important;
    }
    .laytable-cell-2-title{
        width: 350px !important;
    }

    .el-pagination__total {
        display: none !important;
    }

    .el-pagination__sizes {
        display: none !important;
    }

    .el-pagination {
        padding: 6px 5px;
        text-align: center;
    }

    @media screen and (min-width: 768px) {
        .laytable-cell-1-title {
           width: 567px !important;
        }
        .laytable-cell-2-title{
            width: 732px !important;
        }

        .el-pagination__total {
            display: inline-block !important;
        }

        .el-pagination__sizes {
            display: inline-block !important;
        }

        .el-pagination {
            text-align: left;
        }
        .record li{
            margin:20px 30px 20px 0;
        }
    }

    @media screen and (max-width: 410px) {
        .layui-tab-bar {
            display: block !important;
        }

        .layui-tab-title {
            overflow: hidden !important;
        }
        .record li{
            margin: 10px;
        }
    }

    .layui-table-box {
        overflow: auto !important;
    }

    .layui-table-header {
        border-width: 0 0 1px;
        overflow: auto !important;
    }
    .laytable-cell-1-title{
        float:left!important;
    }
    .onesearch{
        float:right;
    }
    .onesearch .el-form-item{
        float:left;
        margin-bottom:0px;
    }
    .onesearch .el-date-editor.el-input{
        width:90px;
    }
    .record{
        overflow:hidden;
    }
    .record li{
        width:166px;
        height:54px;
        border-radius:8px;
        float:left;
        font-size:14px;
        color:rgba(255,255,255,1);
        line-height:20px;
        padding:20px 10px 20px 20px;
    }
    .record li:nth-child(1){
        background:linear-gradient(229deg,rgba(218,128,243,1) 0%,rgba(136,86,253,1) 56%,rgba(74,144,226,1) 100%,rgba(9,98,202,1) 100%);
    }
    .record li:nth-child(2){
        background:linear-gradient(226deg,rgba(251,210,73,1) 0%,rgba(233,149,13,1) 100%);
    }
    .record li:nth-child(3){
        background:linear-gradient(216deg,rgba(162,222,38,1) 0%,rgba(105,185,17,1) 100%);
    }
    .lefts{
        float:left;
    }
    .lefts h1{
        font-size:14px;
        font-weight:400;
    }
    .lefts h2{
        font-size:14px;
        font-weight:400;
        line-height:36px;
    }
    .record li img{
        float:right;
        display:block ;
        width:50px;
        height:50px;
        margin-top:2px
    }
    .fr .el-button{
        height:30px;
        line-height:30px;
        padding:0px 10px;
        font-size: 12px;
    }
    .fr .el-button span{
        margin-left: 0px!important;
    }
    .one{
        color:#D0021B;
        font-weight: bold;
    }
</style>
