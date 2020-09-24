<template>
    <div>
        <el-input v-model="input" placeholder="请输入内容" style="width:200px;"></el-input>
        <button @click="compare">点击</button>
        <div class="code" @click="refreshCode">
            <s-identify :identifyCode="identifyCode"></s-identify>
        </div>
    </div>

</template>

<script>
    import identify from "../components/identify"
    export default {
        name: "",
        data() {
            return {
                input:'',
                identifyCodes: "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
                identifyCode: ""
            };
        },
        components:{
            's-identify':identify
        },
        mounted() {
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        },
        methods: {
            randomNum(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            },
            refreshCode() {
                this.identifyCode = "";
                this.makeCode(this.identifyCodes, 4);
            },
            makeCode(o, l) {
                for (let i = 0; i < l; i++) {
                    this.identifyCode += this.identifyCodes[
                        this.randomNum(0, this.identifyCodes.length)
                        ];
                }
                console.log(this.identifyCode);
            },
            compare(){
                if(this.identifyCode.toLowerCase()==this.input.toLowerCase()){

                }
                else{

                }
            }
        }
    };
</script>

<style>
    .code {
        margin: 400px auto;
        width: 114px;
        height: 40px;
        border: 1px solid red;
    }
</style>
