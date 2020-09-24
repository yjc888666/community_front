<template>
    <div class="fly-panel fly-panel-user" >
        <div class="layui-tab layui-tab-brief" lay-filter="user">
            <ul class="layui-tab-title" id="LAY_mine">
                <li data-type="mine-jie" lay-id="index" class="layui-this">{{ $t("my.articlePub") }}（
                    <span>0</span>）</li>
                <li lay-id="collection">{{ $t("my.articleCollect") }}（0）</li>
                <li><a href="artadd.html">{{ $t("my.pubAritle") }}</a></li>
            </ul>
            <div class="layui-tab-content" style="padding: 20px 0;">
                <div class="layui-tab-item layui-show">

                    <table id="demo" lay-filter="test"></table>

                </div>
                <div class="layui-tab-item">
                    <table id="myCollection" lay-filter="test11"></table>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {

            }
        }
    }
</script>
