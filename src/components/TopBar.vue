<template>
  <div id="TopBar">
    <div class="wrap">
      <span class="logo">Resumer</span>
      <div class="action">
        <div v-if="logined" class="userActions">
          <span>你好，{{user.username}}</span>
          <a class='button' href="#" @click.prevent="signOut">登出</a>
        </div>
        <div v-else class="userActions" >
          <a href="#" class="button primary"
             @click.prevent="signUpDialogVisible = true">
            singUp
          </a>
          <myDialog title="注册" :visible="signUpDialogVisible" @close="signUpDialogVisible = false">
            <SignUpForm @success="login($event)"></SignUpForm>
          </myDialog>
          <a class="button" href="#">登录</a>
        </div>
        <button class="button primary">保存</button>
        <button class="button">预览</button>
      </div>
    </div>
  </div>
</template>

<script>
  import myDialog from './myDialog'
  import SignUpForm from './SignUpForm'
  import AV from '../lib/leancloud'

  export default {
    name: 'TopBar',
    components: {myDialog, SignUpForm},
    data () {
      return {
        signUpDialogVisible: false
      }
    },
    computed: {
      user () {
        return this.$store.state.user
      },
      logined () {
        return this.user.id
      }
    },
    methods: {
      login (user) {
        this.signUpDialogVisible = false
        this.$store.commit('setUser', user)
      },
      signOut () {
        AV.User.logOut()
        this.$store.commit('removeUser')
      }
    }
  }
</script>

<style scoped lang="scss">
  #TopBar {
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.25);
    >.wrap {
      min-width: 1024px;
      max-width: 1440px;
      margin: 0 auto;
      height: 64px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 16px;
    }
    .logo {
      font-weight: 900;
      font-size: 24px;
      color: #000;
    }
    .button {
      width: 72px;
      height: 32px;
      border: none;
      cursor: pointer;
      font-size: 18px;
      color: #222;
      outline: none;
      text-decoration: none;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      vertical-align: middle;
      &:hover {
        box-shadow: 1px 1px 1px hsla(0, 0, 0, 0.50);
      }
      &.primary {
        background: #02af5f;
        color: #000;
      }
    }
    .action {
      display: flex;
      .userActions {
        margin-right: 3em;
      }
    }
  }
</style>
