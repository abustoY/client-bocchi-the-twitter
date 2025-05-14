<template>
    <p class="username">ユーザー名：{{ authStore.userName }}</p>
    <MyTweetContainer></MyTweetContainer>
</template>

<script setup>
import MyTweetContainer from './MyTweetContainer.vue';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.username {
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
  margin: 20px 0;
  text-align: center;
}
</style>