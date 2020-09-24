<template>
    <div class=" fly-panel-user">
        <div class="layui-tab layui-tab-brief" lay-filter="user">
            <ul class="layui-tab-title" id="LAY_mine">
                <li class="layui-this">自动核算工资计算</li>
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
                            <div class="time-info f14">本月工资表
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
                        label="年份">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="month"
                        label="月份">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="position_id"
                        label="职务">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="base_pay"
                        label="基本工资">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="ought_number"
                        label="应出勤">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="practical_number"
                        label="实出勤">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="ought_salary"
                        label="应发工资">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="practical_salary"
                        label="实际工资">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="overtime_pay"
                        label="加班费">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="meal_subsidy"
                        label="餐补">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="traffic_allowance"
                        label="交通补助">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="endowment_insurance"
                        label="养老保险">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="unemploymen_insurance"
                        label="失业保险">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="medical_insurance"
                        label="医疗保险">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="housing_fund"
                        label="住房公积金">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="education"
                        label="子女教育扣除">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="support"
                        label="赡养扣除">
                    </el-table-column>
                    <el-table-column
                        align='center'
                        prop="renting"
                        label="租房扣除">
                    </el-table-column>
                </el-table>
                <div class="guize">
                    <span>注：应发工资=应发工资/本月应出天数 X 本月实出天数（大于等于应发，按应发算，小于应发，按照小于应发算）</br> 实发工资=应发工资-五险一金一个税 </span>
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
                me.$axios.post(me.url+"/monthlyAssess/myMonthlyAssess",para)
                    .then(function (result) {
                            me.tableData=result.data.list;
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
                        url: me.url+"/monthlyAssess/monthlyAssessExcel", 
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
                        a.download = `工资计算.xls`
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
