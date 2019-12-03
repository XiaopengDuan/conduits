<template>
  <div class="login">
     <el-dialog
      title="提示"
      :visible.sync="slidedialogVisible"
      width="350px"
      >
      <slideVerify
        ref="myVerify"
        :l="42"
        :r="10"
        :h="100"
        @success="onSuccess"
        @fail="onFail"
        @refresh="onRefresh"
        :slider-text="text"
        ></slideVerify>
    </el-dialog>
    <transition>
      <div v-if="$store.state.app.loading" class='popContainer'>
        <div class="loader">
          <div class="face">
            <div class="circle"></div>
          </div>
          <div class="face">
            <div class="circle"></div>
          </div>
            <span style="color: white;font-size: .1rem">loading</span>
        </div>
      </div>
    </transition>
    <div class="tsDiv" v-if="$store.state.app.exitZhengshu">
      <span>您需要安装<a href="../../static/credential.rar">辽阳水司大数据分析平台根证书</a>，以便于您能更安全的访问。请点击链接下载。谢谢配合! </span>
      <button @click="closeExitZhengshu()" class="tsDivClose">X</button>
    </div>
    <h1 class="hint">辽阳水司大数据分析平台</h1>
    <div class="login-box" style="margin-top: -1rem">
      <form class="form">
        <div class="form-group dropdown">
          <label for="exampleInputEmail1"><img src="../assets/img/icon_login_user.png" /></label>
          <input type="email" @keyup.enter="handleLogin()" v-model="loginForm.userName" class="form-control" id="exampleInputEmail1" placeholder="请输入账号或者邮箱">
          <span class="d2"></span>
        </div>
        <div class="form-group password">
          <label for="exampleInputEmail1"><img src="../assets/img/icon_login_password.png" /></label>
          <input @keyup.enter="handleLogin()" v-model="loginForm.passWord" type="password" class="form-control" id="exampleInputEmail1" placeholder="密码">
        </div>
        <div class="checkbox">
          <el-checkbox v-model="rememberPassword">记住密码</el-checkbox>
          <a class="pull-right" style="cursor: pointer"  @click="link_lostPassWord">忘记密码</a>
        </div>
        <a href="javaScript: void (0)" class="btn-login" @click="handleLogin"></a>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'login',
  components: {
  },
  data() {
    return {
      rememberPassword: '',
      slidedialogVisible: false,
      text: '滑动左边滑块 完成拼图',
      loginForm: {
        userName: '',
        passWord: ''
      },
      arr_logininfo: []
    }
  },
  methods: {
    closeExitZhengshu(){
      this.$store.commit('app/SET_EXITZHENGSHU',false)
    },
    handleLogin(){
      if(this.validLoginInfo()){
        this.slidedialogVisible = true           
      }
    },
    link_lostPassWord(){

    },
    validLoginInfo(){
      const {userName, passWord} = this.loginForm
      if(!userName){
        this.$message({
          message: '请输入用户名',
          customClass: 'login_warning_message',
          type: 'warning'
        });
      } else if(!passWord){
        this.$message({
          message: '请输入密码',
          customClass: 'login_warning_message',
          type: 'warning'
        });
      } else {
        return true
      }
    },
    onSuccess(){
      this.$store.dispatch('app/openLoading')
      this.slidedialogVisible = false
      this.$store.dispatch('user/login', this.loginForm)
      // .then(() => {
       
      // })
      // .catch(() => {
      //   this.$refs.myVerify.refresh()
      //   this.$store.dispatch('app/closeLoading')
      // })
    },
    onFail(){

    },
    onRefresh(){

    }
  }
}
</script>

<style scoped>
  .tsDiv{
    position: fixed;
    width: 100%;
    box-sizing: border-box;
    bottom: 0;
    text-align: center;
    padding: 0.3rem;
    background-color: rgba(0,0,0,.5);
  }
  .hint{
    margin: 0;
    width: 100%;
    text-align: center;
    font-size: .36rem;
    color: #0090ff;
    font-weight: 700;
    padding-top: .35rem;
    height: 1.1rem;
    /* background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu8AAAAiBAMAAAAdRCohAAAABGdBT…SNwBd2lDnkS/gGOwyEP6/qFtQKfDHyI/sGTQbCd6/CLfgPG5qIlfuQ2zoAAAAASUVORK5CYII=) no-repeat bottom; */
    background-size: 7.5rem .34rem;
  }
  .checkbox{
    display: flex;
    height: 0.5rem;
    justify-content: space-between;
    align-items: center;
  }
  .el-dialog{
    margin-top: 0;
  }
</style>
