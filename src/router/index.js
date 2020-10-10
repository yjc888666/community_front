import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const index = r => require.ensure([], () => r(require('@/page/index')), 'index');
const indexSecond = r => require.ensure([], () => r(require('@/page/indexSecond')), 'indexSecond');
const noteList = r => require.ensure([], () => r(require('@/page/noteList')), 'noteList');
const indexThread = r => require.ensure([], () => r(require('@/page/indexThread')), 'indexThread');
const indexSearch = r => require.ensure([], () => r(require('@/page/indexSearch')), 'indexSearch');
const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const forget = r => require.ensure([], () => r(require('@/page/forget')), 'forget');
const mima = r => require.ensure([], () => r(require('@/page/mima')), 'mima')
const step = r => require.ensure([], () => r(require('@/page/step')), 'step');
const register = r => require.ensure([], () => r(require('@/page/register')), 'register');
const homes = r => require.ensure([], () => r(require('@/page/home/homes')), 'homes');
const home = r => require.ensure([], () => r(require('@/page/home/home')), 'home');
const yzm = r => require.ensure([], () => r(require('@/page/yzm')), 'yzm')
//个人中心页面
const manages = r => require.ensure([], () => r(require('@/page/home/manage')), 'manage');
const usercenter = r => require.ensure([], () => r(require('@/page/home/usercenter')), 'usercenter');
const userset = r => require.ensure([], () => r(require('@/page/home/userset')), 'userset');
const mytopic = r => require.ensure([], () => r(require('@/page/home/mytopic')), 'mytopic');
const myactivity = r => require.ensure([], () => r(require('@/page/home/myactivity')), 'myactivity');
const myarticle = r => require.ensure([], () => r(require('@/page/home/myarticle')), 'myarticle');
const reply = r => require.ensure([], () => r(require('@/page/home/reply')), 'reply');
const messages = r => require.ensure([], () => r(require('@/page/home/messages')), 'messages');
const clock = r => require.ensure([], () => r(require('@/page/home/clock')), 'clock');
const holiday = r => require.ensure([], () => r(require('@/page/home/holiday')), 'holiday');
const addholiday = r => require.ensure([], () => r(require('@/page/addholiday')), 'addholiday');
const holidayDetails = r => require.ensure([], () => r(require('@/page/holidayDetails')), 'holidayDetails');
const information = r => require.ensure([], () => r(require('@/page/home/information')), 'information');
const reimbursement = r => require.ensure([], () => r(require('@/page/home/reimbursement')), 'reimbursement');
const addreimbursement = r => require.ensure([], () => r(require('@/page/addreimbursement')), 'addreimbursement');
const reimbursementDetails = r => require.ensure([], () => r(require('@/page/reimbursementDetails')), 'reimbursementDetails');
const project = r => require.ensure([], () => r(require('@/page/home/project')), 'project');
//调休
const leave = r => require.ensure([], () => r(require('@/page/home/leave')), 'leave');
const addLeave = r => require.ensure([], () => r(require('@/page/addLeave')), 'addLeave');
const leaveDetails = r => require.ensure([], () => r(require('@/page/leaveDetails')), 'leaveDetails');
//发布帖子
const addBbs = r => require.ensure([], () => r(require('@/page/addBbs')), 'addBbs');
const edit = r => require.ensure([], () => r(require('@/page/edit')), 'edit');
//发布活动
const addActivity = r => require.ensure([], () => r(require('@/page/addActivity')), 'addActivity');
const editActivity = r => require.ensure([], () => r(require('@/page/editActivity')), 'editActivity');
const activityList = r => require.ensure([], () => r(require('@/page/activityList')), 'activityList');
const activityDetail = r => require.ensure([], () => r(require('@/page/activityDetail')), 'activityDetail');
//投票
const vote = r => require.ensure([], () => r(require('@/page/home/vote')), 'vote');
const addVote= r => require.ensure([], () => r(require('@/page/addVote')), 'addVote');
const editVote = r => require.ensure([], () => r(require('@/page/editVote')), 'editVote');
const voteList= r => require.ensure([], () => r(require('@/page/voteList')), 'voteList');
const voteDetail = r => require.ensure([], () => r(require('@/page/voteDetail')), 'voteDetail');
// 分享
const share = r => require.ensure([], () => r(require('@/page/home/share')), 'share');
//附件
const enclosure = r => require.ensure([], () => r(require('@/page/home/enclosure')), 'enclosure');
const binding = r => require.ensure([], () => r(require('@/page/binding')), 'binding');
const downloadDetail = r => require.ensure([], () => r(require('@/page/downloadDetail')), 'downloadDetail');
const addEnclosure = r => require.ensure([], () => r(require('@/page/addEnclosure')), 'addEnclosure');

const routes = [
	{
		path: '/',
		component: index
	},
    {
        path: '/login',
        component: login
    },
    {
        path: '/step',
        component: step
    },
    {
        path: '/register',
        component: register
    },
    {
        path: '/forget',
        component: forget
    },{
        path: '/binding',
        component: binding
    },
    {
        path: '/mima',
        component: mima
    },
    {
        path: '/addBbs',
        component: addBbs
    },
    {
        path: '/edit/:id',
        component: edit
    },
    {
        path: '/addholiday',
        component: addholiday
    },
    {
        path: '/holidayDetails/:id',
        component: holidayDetails
    },
    {
        path: '/addLeave',
        component: addLeave
    },
    {
        path: '/leaveDetails/:id',
        component: leaveDetails
    },
    {
        path: '/addreimbursement',
        component: addreimbursement
    },
    {
        path: '/reimbursementDetails/:id',
        component: reimbursementDetails
    },
    {
        path: '/indexSecond/:id',
        component: indexSecond,
        name:''
    },
    {
        path: '/noteList/:id',
        component: noteList
    },
    {
        path: '/indexThread/:id',
        component: indexThread
    },

    {
        path: '/indexSearch/:search',
        component: indexSearch
    },
    {
        path: '/downloadDetail/:id',
        component: downloadDetail
    },
    {
        path: '/yzm',
        component: yzm
    },
    {
        path: '/homes/:id',
        // path: '/homes',
        component: homes
    },
    {
        path: '/home',
        component: home
    },
    {
        path: '/addActivity',
        component: addActivity
    },
    {
        path: '/editActivity/:id',
        component: editActivity
    },
    {
        path: '/activityList',
        component: activityList,
    },
    {
        path: '/activityDetail/:id',
        component: activityDetail,
    },
    {
        path: '/addVote',
        component: addVote
    },
    {
        path: '/editVote/:id',
        component: editVote
    }, {
        path: '/voteList',
        component: voteList
    },{
        path: '/voteDetail/:id',
        component: voteDetail
    },
    {
        path: '/addEnclosure/:id',
        component: addEnclosure
    },

    {
        path: '',
        component: manages,
        name:'',
        children: [{
            path: '/usercenter',
            component: usercenter
        }, {
                path: '/userset',
                component: userset
            },
            {
                path: '/information',
                component: information
            },
            {
                path: '/mytopic',
                component: mytopic
            },
            {
                path: '/myactivity',
                component: myactivity
            },
            {
                path: '/vote',
                component: vote
            },
            {
                path: '/reply',
                component: reply
            },
            {
                path: '/messages',
                component: messages
            },
            {
                path: '/clock',
                component: clock
            },
            {
                path: '/holiday',
                component: holiday
            },
            {
                path: '/outwork',
                component:resolve => require(['@/page/home/outwork'], resolve),
            },
            {
                path: '/workerListLeave',
                component:resolve => require(['@/page/home/workerListLeave'], resolve),
            },
            {
                path: '/overtime',
                component:resolve => require(['@/page/home/overtime'], resolve),
            },
            {
                path: '/leave',
                component: leave
            },
            {
                path: '/reimbursement',
                component: reimbursement
            },
            {
                path: '/share',
                component: share
            }, {
                path: '/enclosure',
                component: enclosure
            },{
                path: '/project',
                component: project
            },
            {
                path: '/attendance',
                component: resolve => require(['@/page/home/attendance'], resolve),
            },
            {
                path: '/aleave',
                component: resolve => require(['@/page/home/aleave'], resolve),
            },
            {
                path: '/aovertime',
                component: resolve => require(['@/page/home/aovertime'], resolve),
            },
            {
                path: '/aoutwork',
                component: resolve => require(['@/page/home/aoutwork'], resolve),
            },
            {
                path: '/amonth',
                component: resolve => require(['@/page/home/amonth'], resolve),
            },
        ]
    }
]

const router = new Router({
    linkActiveClass:'layui-this',
    routes,
	strict: process.env.NODE_ENV !== 'production'
})
router.beforeEach((to, from, next) => {
    var userInfo = JSON.parse(sessionStorage.getItem('vuex'));//获取浏览器缓存的用户信息
    if(userInfo){ //如果有就直接到首页咯
        next();
    } else {
        if(to.path=='/login'){ //如果是登录页面路径，就直接next()
            next();
        }else if(to.path=='/'){
            next();
        }else if(to.path=='/forget'){
            next();
        }else if(to.path=='/step'){
            next();
        }else if(to.path=='/mima'){
            next();
        }else if(to.path=='/register'){
            next();
        }else if(to.path=='/binding'){
            next();
        }else { //不然就跳转到登录；
            next({
                 path: '/login',
                  query: {
                      redirect: to.fullPath
                    }
                })
        }
    }
})
export default router
