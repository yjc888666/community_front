<template>
    <div class="fly-panel fly-panel-user">
        <div class="layui-tab layui-tab-brief">
            <ul class="layui-tab-title">
                <li class="layui-this"><a href="javascript:;">{{ $t("my.reply") }}</a></li>
            </ul>
            <div class="layui-tab-content" style="padding: 20px 0;">
                <div class="fly-panel">
                    <ul class="home-jieda">
                        <li v-for="(item,index) in replyDate.list">
                            <p>
                                <span>{{item.time}}</span> {{ $t("common.zai") }}
                                <a href="javascript:;" target="_blank" v-html="item.title" @click="replyEvent(item.fid)"></a>{{ $t("my.replyIn") }}
                            </p>
                            <div class="home-dacontent" v-html="item.content"></div>
                        </li>

                    </ul>
                </div>
                <div style="text-align: center;" v-show="pageShow">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-size="pageSize"
                        layout="total, prev, pager, next"
                        :total="totalCount">
                    </el-pagination>
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
                replyDate:[],
                totalCount:0,
                currentPage:1,
                pageSize:10,
                pageNum:1,
                pageShow:true
            }
        },
        mounted(){
//            回复的详情
              this.page()
        },
        methods:{
            page(){
                var me=this;
                me.$axios.post(me.url+"/comment/my?page=" + this.pageNum + "&size=" + this.pageSize)
                    .then(function (result) {
                        me.replyDate=result.data
                        me.totalCount=result.data.total
                        if(result.data.total<1){
                             me.pageShow=false
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            replyEvent(id){
                this.$router.push({
                    path: `/indexThread/${id}`
                })
            },
            handleSizeChange(val) {
                this.pageSize=val;
                this.page()
            },
            handleCurrentChange(val) {
                this.pageNum=val;
                this.page()
            },
        },
    }
</script>
