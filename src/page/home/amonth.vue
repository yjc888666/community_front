<template>
    <div class=" fly-panel-user">
        <div class="layui-tab layui-tab-brief" lay-filter="user">
            <ul class="layui-tab-title" id="LAY_mine" :class="{'layui-tab-more':!ismore}">
                <li><router-link to="/attendance">迟到早退</router-link></li>
                <li><router-link to="/aleave">请假调休</router-link></li>
                <li><router-link to="/aovertime">加班考勤</router-link></li>
                <li><router-link to="/aoutwork">外出考勤</router-link></li>
                <li class="layui-this">月末统计</li>
                <span class="layui-unselect layui-tab-bar" lay-stope="tabmore" title="" style="display:none"
                      v-on:click="ismore=!ismore"><i lay-stope="tabmore" class="layui-icon"></i></span>
            </ul>
            <div class="layui-tab-content" style="padding: 20px 0 0;">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="10px" class="demo-ruleForm leavesearch">
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
                <div class="time-sec-one">
                    <el-row>
                        <el-col :span="24">
                            <div class="time-info f14">本月统计考勤表
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
                        prop="username"
                        label="姓名">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="year"
                        label="年">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="month"
                        label="月">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="w_day"
                        label="出勤天数">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="rest"
                        label="休息天数">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="man_hour"
                        label="平均工时">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="late"
                        label="迟到">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="leave_e"
                        label="早退">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="absent"
                        label="旷工">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="over_time"
                        label="加班">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="outwork"
                        label="外出">
                    </el-table-column>
                </el-table>
                <div class="guize">
                    <span>公司考勤管理规则：</br> 1 .考勤时间：周一到周五9：00--18：00，周六日休息。</br> 2.员工请假在 <i>3天</i>以内的，由部门负责人批准；<i>3天</i>以上的，报总经理批准；部门负责人请假，一律由总经理批准，未经批准而擅离工作岗位的按旷工处理 。 （填写请假申请单）</br> 3.员工周末加班，应于周五下班前报送《员工加班申请单》，由部门负责人批准，以考勤打卡时间为准。非计划或紧急安排加班的，由部门负责人批准，事后补填《加班申请单》。</br> 4.调休应在加班当日起，<i>三个月</i>内使用完毕，不跨年，未使用完按放弃处理，不累计；每次调休不能连休 <i>7天</i>以上。（填写员工调休申请单） </span>
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
                ismore: true,
                tab:0,
                tableData:[],
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
                        this.lateEvent();
                    } else {
                        console.log('error submit!!');
                return false;
            }
            });
            },
//           记录
            lateEvent(){
                var me=this;
                var para = {
                    month:me.ruleForm.month,
                    year:me.ruleForm.year
                }
                me.$axios.post(me.url+"/attendance/getlist",para)
                    .then(function (result) {
                            me.tableData=result.data.pojo;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
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
                        url: me.url+"/attendance/attendanceExcel", 
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
                        a.download = `月末统计.xls`
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
            this.lateEvent();
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
    .leavesearch{
        float:right;
        margin-bottom:15px;
    }
    .leavesearch .el-form-item{
        float:left;
        margin-bottom:0px;
    }
    .leavesearch .el-date-editor.el-input{
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
    .guize{
        margin:20px 0;
    }
    .guize span{
        color:#666;
        line-height:22px;
    }
    .guize span i{
        color:#D0021B;
    }
</style>
