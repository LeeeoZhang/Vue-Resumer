<template>
  <div id="TopBar">
    <div class="wrap">
      <span class="logo">resumer</span>
      <div v-if="logined" class="userActions">
        <span class="welcome">Hello，{{user.username}}</span>
        <Button type="ghost" class="button save" @click.prevent="save">Save</Button>
        <Button type="ghost" class="button logout" @click.prevent="logOut">Logout</Button>
        <Button type="primary" class="button preview" @click.prevent="preview">Preview</Button>
      </div>
    </div>
  </div>
</template>

<script>
  import SignUpAndLogIn from './SignUpAndLogIn'
  import AV from '../lib/leancloud'
  import saveOrUpdateResume from '../lib/saveOrUpdateResume'

  export default {
    name: 'TopBar',
    components: {SignUpAndLogIn},
    data () {
      return {
        signUpDOrLogIn: false
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
      logOut () {
        new Promise((resolve, reject) => {
          this.save()
          resolve()
        }).then(() => {
          AV.User.logOut()
          this.$store.commit('removeUser')
          this.$store.commit('initState')
          this.$emit('close')
        })
      },
      save () {
        new Promise((resolve, reject) => {
          saveOrUpdateResume(this.$store.state)
          resolve()
        }).then(() => {
          this.info()
        }).catch((error) => {
          console.log(error)
        })
      },
      preview () {
        this.$emit('preview')
      },
      info () {
        this.$Message.info({
          content: this.$store.state.saveSuccess,
          duration: 3
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  #TopBar {
    background: #fff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.25);
    > .wrap {
      min-width: 1024px;
      margin: 0 auto;
      height: 64px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 16px;
    }
    .logo {
      font-size: 24px;
      font-weight: bold;
      font-variant: small-caps;
      letter-spacing: .3em;
      color: #000;
      background-image: -webkit-linear-gradient(92deg, #f35626, #feab3a);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: changeColor 30s infinite;
    }
    .button {
      outline: none;
      &.primary {
        color: #fff;
        background: #495060;
      }
      &:hover {
        animation: rotate 1s linear infinite alternate;
      }
    }
    .preview {
      background: #000;
      border-color: #000;
    }
    .userActions {
      margin-right: 3em;
      display: flex;
      justify-content: space-around;
      .welcome {
        margin-right: .8em;
        align-self: flex-end;
      }
      .logout {
        margin-right: .8em;
      }
      .save {
        margin-right: .8em;
      }
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(3deg);
    }
    100% {
      transform: rotate(-3deg);
    }

  }

  @keyframes changeColor {
    from {
      -webkit-filter: hue-rotate(0deg);
    }

    to {
      -webkit-filter: hue-rotate(-360deg);
    }
  }
</style>
