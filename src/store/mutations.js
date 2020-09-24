//更改用户的登录状态
export const userStatus = (state,user) => {
    if(user){
        state.currentUser=user
        state.isLogin=true
    }
    else if(user==null){
        //退出的时候，清空sessionStorage里面的值
        sessionStorage.setItem('userName',null)
        // sessionStorage.setItem('userToken',"")
        state.currentUser=null
        state.isLogin=false
        // state.token=''
    }

}
