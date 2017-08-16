<template>
  <div id="TopBar">
    <div class="wrap">
      <span class="logo">Resumer</span>
      <div class="action">
        <button class="primary">Save</button>
        <button>Preview</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TopBar'
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
    button {
      width: 72px;
      height: 32px;
      border: none;
      cursor: pointer;
      font-size: 18px;
      color: #222;
      outline: none;
      &:hover {
        box-shadow: 1px 1px 1px hsla(0, 0, 0, 0.50);
      }
      &.primary {
        background: #02af5f;
        color: #000;
      }
    }
  }
</style>
