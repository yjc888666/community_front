<template>
    <dl class="fly-panel fly-list-one">
        <dt class="fly-panel-title">{{ $t("home.hotPost") }}</dt>
        <dd v-for="(item,index) in hotList">
            <a href="javascript:;" v-html="item.title" @click="hotEvent(item.id)"></a>
            <span>
                <i class="iconfont icon-pinglun1"></i>
                {{item.reply}}
            </span>
        </dd>
    </dl>
</template>

<script>
export default {
  name: 'Hot',
  data () {
    return {
        url:this.GLOBAL.baseUrl,
        hotList:''
    }
  },
    mounted(){
        var me=this;
        me.$axios.post(me.url+"/forum/hot")
            .then(function (res) {
                me.hotList=res.data
            })
            .catch(function (error) {
                console.log(error);
            });
    },
    methods:{
        hotEvent(id){
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
    },
    watch: {
        '$route' (to, from) {
            this.$router.go(0);
        }},
}
</script>

<style scoped>

</style>
