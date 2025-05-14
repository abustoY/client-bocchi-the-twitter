<template>
  <AppHeader/>
  <router-view></router-view>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()
authStore.checkAuth()  // ← アプリ読み込み時に実行

</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
