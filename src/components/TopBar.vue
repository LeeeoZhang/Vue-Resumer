<template>
  <div id="TopBar">
    <div class="wrap">
      <span class="logo">Resumer</span>
      <div class="action">
        <div v-if="logined" class="userActions">
          <span class="welcome">你好，{{user.username}}</span>
          <Button type="ghost" class="button" @click.prevent="signOut">Log Out</Button>
        </div>
        <div v-else class="userActions" >
          <Button type="ghost" class="button primary" @click.prevent="signUpDialogVisible = true">Sign Up</Button>
          <Button type="ghost" class="button" @click.prevent="logInDialogVisible = true">Log In</Button>
        </div>
      </div>
    </div>
    <myDialog title="注册" :visible="signUpDialogVisible" @close="signUpDialogVisible = false">
      <SignUpForm @success="logIn($event)"  @close="signUpDialogVisible = false"></SignUpForm>
    </myDialog>
    <myDialog title="登录" :visible="logInDialogVisible" @close="logInDialogVisible = false">
      <LoginForm @success="logIn($event)" @close="logInDialogVisible = false"></LoginForm>
    </myDialog>
  </div>
</template>

<script>
  import myDialog from './myDialog'
  import SignUpForm from './SignUpForm'
  import LoginForm from './LoginForm.vue'
  import AV from '../lib/leancloud'

  export default {
    name: 'TopBar',
    components: {myDialog, SignUpForm, LoginForm},
    data () {
      return {
        signUpDialogVisible: false,
        logInDialogVisible: false
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
      logIn (user) {
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
      font-size: 24px;
      color: #000;
    }
    .button {
      outline: none;
      &.primary {
        color: #fff;
        background: #495060;
      }
      &:hover {
        animation: shake 1s linear infinite alternate;
      }
    }
    .action {
      display: flex;
      .userActions {
        margin-right: 3em;
        .welcome {
          margin-right: .5em;
        }
      }
    }
  }
  @keyframes shake {
    0% {
      transform: rotate(3deg);
    }
    100% {
      transform: rotate(-3deg);
  }

  }
</style>
