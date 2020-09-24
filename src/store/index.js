import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from "vuex-persist"

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
    storage: window.sessionStorage
});

const store = new Vuex.Store({
    state:{
        user:'',
        isLogin:''
    },
    mutations:{
        login(state, payload) {
            state.user = payload
        },
        logout(state) {
            state.user = {}
        }
    },
    actions: {
        login(context, payload) {
            context.commit('login', payload)
        },
        logout(context) {
            context.commit('logout')
        }
    },
    plugins: [vuexLocal.plugin]
})

export default store
