<template>
    <div class="fly-panel">
        <h3 class="fly-panel-title">{{ $t("common.note") }}</h3>
        <ul class="fly-panel-main fly-list-static">
            <li v-for="(item,index) in memoList">
                <a href="javascript:;" v-html="item.title" @click="memoEvent(item.id)"></a>
            </li>

        </ul>
    </div>
</template>

<script>
    export default {
        name: 'Memo',
        data(){
            return {
                url:this.GLOBAL.baseUrl,
                memoList:[]
            }
        },
        mounted(){
            var me=this;
            me.$axios.post(me.url+"/forum/memo")
                .then(function (res) {
                    me.memoList=res.data
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        methods: {
            memoEvent(id){
                if(this.$store.state.user.username== undefined || this.$store.state.user.username ==''){
                    this.$message({
                        message: this.$t("common.loginP"),
                        type: 'error'
                    })
                    this.$router.push({
                        path: `/login`
                    })
                }else{
                    this.$router.push({
                        path: `/indexThread/${id}`
                    })
                }
            }
        }
    }
</script>
<style scoped>

</style>
