<template>
    <div class="user-info">
      <p class="username">ユーザー名：{{ authStore.userName }}</p>
      <button class="logout-button" @click="handleLogout">ログアウト</button>
    </div>
    <MyTweetContainer />
</template>

<script setup>
import MyTweetContainer from './MyTweetContainer.vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = async () => {
  if (authStore.logout) {
    await authStore.logout();
  } else {
    await fetch(`${process.env["VUE_APP_API_HOST_URL"]}/api/authentication/logout`, {
      method: "POST",
      credentials: "include"
    });
    authStore.isAuthenticated = false;
    authStore.userId = null;
    authStore.userName = null;
  }
  router.push("/login-form");
};
</script>

<style scoped>
.username {
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.logout-button {
  padding: 6px 12px;
  background-color: #d9534f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  margin-left: 12px;
}

.logout-button:hover {
  background-color: #c9302c;
}

.user-info {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  gap: 10px;
}
</style>