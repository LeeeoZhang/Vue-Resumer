<template>
  <div>
    <div class="page">
      <header v-if="signUpOrLogIn === true" :class="{preview: isPreview}">
        <TopBar @close="signUpOrLogIn = false" class="animated bounceInDown" @preview="isPreview = true"/>
      </header>
      <main v-if="signUpOrLogIn === true">
        <ResumeEditor class="animated bounceInLeft" :class="{preview: isPreview}"/>
        <ResumePreview class="animated bounceInRight" :class="{preview: isPreview}"/>
      </main>
      <SignUpAndLogIn @success="logIn($event)" v-if="signUpOrLogIn === false"></SignUpAndLogIn>
    </div>
    <Button type="primary" class="button exitButton"  v-show="isPreview" @click.prevent="isPreview = false" >Exit review</Button>
  </div>
</template>

<script>
  import 'normalize.css'
  import './assets/reset.css'
  import './assets/animate.css'
  import TopBar from './components/TopBar'
  import ResumeEditor from './components/ResumeEditor'
  import ResumePreview from './components/ResumePreview'
  import SignUpAndLogIn from './components/SignUpAndLogIn'
  import icons from './assets/icons'
  import store from './store/index'
  import getAVUser from './lib/getAVUser'

  export default {
    name: 'app',
    data () {
      return {
        signUpOrLogIn: false,
        isPreview: false
      }
    },
    store,
    components: {TopBar, ResumeEditor, ResumePreview, SignUpAndLogIn},
    computed: {
      userid () {
        return this.$store.state.user.id
      }
    },
    created () {
      document.body.insertAdjacentHTML('afterbegin', icons)
      let state = localStorage.getItem('state')
      if (state) {
        state = JSON.parse(state)
      }
      this.$store.commit('initState', state)
      this.$store.commit('setUser', getAVUser())
      if (this.userid) {
        this.signUpOrLogIn = true
      }
    },
    methods: {
      logIn (user) {
        this.$store.commit('setUser', user)
        this.signUpOrLogIn = true
      }
    }
  }
</script>

<style scoped lang="scss">
  .page {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: #ccc;
    min-width: 1024px;
    min-height: 500px;
    position: relative;
    >main {
      position: relative;
      flex-grow: 1;
      min-width: 1024px;
      margin: 16px 0 16px 0;
      display: flex;
      justify-content: space-between;
      padding: 0 16px 0 0;
      width: 100%;
      align-self: center;
    }
    >header {
      transition: transform .5s;
    }
    >header.preview {
      transform: translateY(-100%);
    }
  }
  svg.icon {
    height: 1em;
    width: 1em;
    fill: currentColor;
    vertical-align: center;
    font-size: 16px;
  }
  .exitButton {
    position: fixed;
    right: 145px;
    bottom: 18px;
    background: #000;
    border-color: #000;
  }
  .exitButton:hover {
    animation: rotate 1s linear infinite alternate;
    background: #555;
  }
</style>
