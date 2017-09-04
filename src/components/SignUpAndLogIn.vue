<template>
  <div id="signUpAndLogIn">
    <div class="tips">
      <span :class="{active: isLoginOrSignup === 'login'}" @click="isLoginOrSignup = 'login'">
        <transition name="fade"><Icon type="arrow-right-c" v-show="isLoginOrSignup === 'login'"></Icon></transition>
        Login
      </span>
      <span :class="{active: isLoginOrSignup === 'signup'}" @click="isLoginOrSignup = 'signup'">
        <transition name="fade"><Icon type="arrow-right-c" v-show="isLoginOrSignup === 'signup'"></Icon></transition>
        Sigup
      </span>
      <div class="title animated bounceInDown">
        <h1>Resume</h1>
        <small>Write a better resume!</small>
      </div>
    </div>

    <form @submit.prevent="signUp" class="signupForm" v-if="isLoginOrSignup === 'signup'">
      <div class="username">
        <Input v-model="formData.username" placeholder="Username..." style="width: 300px" required></Input>
      </div>
      <div class="password">
        <Input v-model="formData.password" type="password" placeholder="Passwrod..." style="width: 300px"
               required></Input>
      </div>
      <div class="action">
        <input type="submit" value="Signup"></input>
        <span>{{errorMessage}}</span>
      </div>
    </form>

    <form @submit.prevent="logIn" class="loginForm" v-if="isLoginOrSignup === 'login'">
      <div class="username">
        <Input v-model="formData.username" placeholder="Username..." style="width: 300px" required></Input>
      </div>
      <div class="password">
        <Input v-model="formData.password" placeholder="Passwrod..." type="password" style="width: 300px"
               required></Input>
      </div>
      <div class="action">
        <input type="submit" value="Login"></input>
        <span>{{errorMessage}}</span>
      </div>
    </form>

  </div>
</template>

<script>
  import AV from '../lib/leancloud'
  import getErrorMessage from '../lib/getErrorMessage'
  import getAVUser from '../lib/getAVUser'

  export default {
    name: 'SignUpForm',
    data () {
      return {
        formData: {
          username: '',
          password: ''
        },
        errorMessage: '',
        isLoginOrSignup: 'login'
      }
    },
    methods: {
      signUp () {
        let {username, password} = this.formData
        let user = new AV.User()
        user.setUsername(username)
        user.setPassword(password)
        user.signUp().then(() => {
          this.loadData()
        }, (error) => {
          this.errorMessage = getErrorMessage(error)
        })
      },
      logIn () {
        let {username, password} = this.formData
        AV.User.logIn(username, password).then(() => {
          this.loadData()
        }, (error) => {
          this.errorMessage = getErrorMessage(error)
        })
      },
      loadData () {
        let query = new AV.Query('AVresume')
        query.find().then((value) => {
          this.$emit('success', getAVUser())
          let resume = value[0]
          this.$store.commit('updateState', JSON.parse(resume.attributes.content))
        }, function (error) {
          console.log(error)
        })
      }
    }
  }
</script>

<style lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }

  #signUpAndLogIn {
    display: flex;
    flex-direction: column;
    padding: 50px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 280px;
    border: 1px solid black;
    background: #333;
    color: #fff;
    border-radius: 5px;
    > .tips {
      font-size: 14px;
      > .title {
        > h1 {
          line-height: 1;
        }
        position: absolute;
        right: 3em;
        top: 2em;
      }
      > span {
        position: relative;
        padding: 0 10px;
        > i {
          position: absolute;
          color: #85d2bb;
          left: -.1em;
          top: .1em;
        }
      }
      > span.active {
        color: #85d2bb;
      }
    }
    > .signupForm,
    > .loginForm {
      > .username {
        margin: 16px 0;
      }
      > .password {
        margin: 16px 0;
      }
      > .action {
        input {
          background: #85d2bb;
          cursor: pointer;
          outline: none;
          border: none;
          color: #fff;
          font-weight: bold;
          width: 80px;
          height: 35px;
          border-radius: 5px;
        }
      }
    }
  }
</style>
