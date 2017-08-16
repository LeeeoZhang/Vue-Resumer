<template>
  <div class="page">
    <header>
      <TopBar/>
    </header>
    <main>
      <ResumeEditor/>
      <ResumePreview/>
    </main>
  </div>
</template>

<script>
  import 'normalize.css'
  import './assets/reset.css'
  import TopBar from './components/TopBar'
  import ResumeEditor from './components/ResumeEditor'
  import ResumePreview from './components/ResumePreview'
  import icons from './assets/icons'
  export default {
    name: 'app',
    data: function () {
      return {
        text: 'Hello World!!'
      }
    },
    components: {TopBar, ResumeEditor, ResumePreview},
    created () {
      document.body.insertAdjacentHTML('afterbegin', icons)
    }
  }
</script>

<style lang="scss">
  .page {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: #EAEBEC;
    min-width: 1024px;
    > main {
      flex-grow: 1;
      min-width: 1024px;
      max-width: 1440px;
      margin: 16px 0 16px 0;
      display: flex;
      justify-content: space-between;
      padding: 0 16px;
      width: 100%;
      align-self: center;
    }
  }
  #resumeEditor {
    width: 35%;
    background: #444;
  }
  #resumePreview {
    flex-grow: 1;
    margin-left: 16px;
    background: #777;
  }
  svg.icon {
    height: 1em;
    width: 1em;
    fill: currentColor;
    vertical-align: center;
    font-size: 16px;
  }
</style>
