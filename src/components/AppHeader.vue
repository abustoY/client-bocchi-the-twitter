<template>
  <div class="nav">
    <RouterLink to="/">
      <div class="nav-element">
        HOME
      </div>
    </RouterLink>
    <RouterLink to="/my-page">
      <div class="nav-element">
        MY PAGE
      </div>
    </RouterLink>
    <RouterLink to="/settings">
      <div class="nav-element">
        SETTINGS
      </div>
    </RouterLink>
    <RouterLink to="/login-form">
      <div class="nav-element">
        LOGIN
      </div>
    </RouterLink>
  </div>
</template>
  
<script>
export default {
  name: 'AppHeader',
}
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e0f7fa; 
  /* 背景色を変更 */
  padding: 10px 0;
  /* 内側の上下の余白を追加 */
}

.nav-element {
  margin: 0 15px; 
  /* 左右の余白を調整 */
  font-family: 'Arial', sans-serif; 
  /* フォントを変更 */
  font-size: 1em; 
  /* フォントサイズを調整 */
  color: #005f73; 
  /* 文字色を変更 */
  cursor: pointer; 
  /* カーソルをポインタに */
  transition: color 0.3s; 
  /* 色変更のアニメーション */
}

.nav-element:hover {
  color: #0288d1; 
  /* ホバー時の文字色 */
}

</style>
  