import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import VueQriously from 'vue-qriously'
import LangENUS from '@/config/lang/en-us'
import LangZHCN from '@/config/lang/zh-cn'

import 'element-ui/lib/theme-default/index.css'
import MyAxios from '@/config/MyAxios'

import global_url from './components/global'
Vue.prototype.GLOBAL = global_url


import global from '@/config/global'



Vue.config.productionTip = false;
Vue.prototype.global = global



Vue.use(ElementUI);
Vue.use(VueQriously)
Vue.use(MyAxios);



import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

// 使用多文件管理不同的语言是一个好习惯：
const i18n = new VueI18n({
    // locale: LangStorage.getLang('zh'),  // 语言标识，后面会用做切换和将用户习惯存储到本地浏览器
    locale: 'zh', // 语言标识
    messages: {
        'en': LangENUS,
        'zh': LangZHCN
    }
})

new Vue({
	el: '#app',
	router,
	store,
    i18n,
	template: '<App/>',
	components: { App }
})


//统计
//<![CDATA[
var owa_baseUrl = 'https://tj.wswsk.com/';
var owa_cmds = owa_cmds || [];
owa_cmds.push(['setSiteId', '68954033428ebeb9160db71ebd258568']);
owa_cmds.push(['trackPageView']);
owa_cmds.push(['trackClicks']);

(function() {
    var _owa = document.createElement('script'); _owa.type = 'text/javascript'; _owa.async = true;
    owa_baseUrl = ('https:' == document.location.protocol ? window.owa_baseSecUrl || owa_baseUrl.replace(/http:/, 'https:') : owa_baseUrl );
    _owa.src = owa_baseUrl + 'modules/base/js/owa.tracker-combined-min.js';
    var _owa_s = document.getElementsByTagName('script')[0]; _owa_s.parentNode.insertBefore(_owa, _owa_s);
}());
//]]>


