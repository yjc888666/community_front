<template>
    <div class="fly-panel fly-rank fly-rank-reply" id="LAY_replyRank">
        <h3 class="fly-panel-title">{{ $t("common.reply") }}</h3>
        <dl>
            <dd style="margin-right:20px" v-for="(item,index) in replyCard">
                <a href="javascript:;" @click="homeEvent(item.id)">
                    <img :src="url+item.userhead">
                    <cite>{{item.username}}</cite>
                    <i>{{item.num}}{{ $t("common.replyPost") }}</i>
                </a>
            </dd>

        </dl>
    </div>
</template>

<script>
    export default {
        name: 'replyCard',
        data () {
            return {
                url:this.GLOBAL.baseUrl,
                replyCard: []
            }
        },
        created(){
            var me = this;
            me.$axios.post(me.url+"/forum/userlist")
                .then(function (result) {
                    me.replyCard = result.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        methods:{
            homeEvent(id){
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
                        path: `/homes/${id}`
                    })
                }

            }
        },
    }
</script>

<style scoped>

</style>
