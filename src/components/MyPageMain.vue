<template>
  <div class="user-info">
    <label class="avatar-label">
      <div class="avatar-image-wrapper small-avatar">
        <img v-if="avatarUrl" :src="avatarUrl" alt="ユーザーアイコン" class="avatar-image" />
        <div v-else class="avatar-placeholder-initial">＋</div>
        <input type="file" @change="handleAvatarChange" accept="image/*" class="avatar-input" />
      </div>
    </label>
    <p class="username">ユーザー名：{{ authStore.userName }}</p>
    <button class="logout-button" @click="handleLogout">ログアウト</button>
  </div>

  <MyTweetContainer />
</template>

<script setup>
import MyTweetContainer from './MyTweetContainer.vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { onMounted } from 'vue';

const authStore = useAuthStore();
const router = useRouter();
const avatarUrl = ref(null);

onMounted(() => {
  // Try to load the custom avatar, fallback to default if not found
  const image = new Image();
  const fallback = '/default-avatar.jpg'; // adjust path if necessary
  image.onload = () => { avatarUrl.value = image.src; };
  image.onerror = () => { avatarUrl.value = fallback; };
  image.src = `${process.env["VUE_APP_API_HOST_URL"]}/api/user/avatar/${authStore.userId}`;
});

const uploadAvatar = async (file) => {
  const formData = new FormData();
  formData.append('avatar', file);
  formData.append('userId', authStore.userId);

  await fetch(`${process.env["VUE_APP_API_HOST_URL"]}/api/user/avatar`, {
    method: 'POST',
    body: formData,
    credentials: 'include'
  });
};

const handleAvatarChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    avatarUrl.value = URL.createObjectURL(file);
    uploadAvatar(file); 
  }
};

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

.avatar-label {
  position: relative;
  display: inline-block;
}

.avatar-image-wrapper {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #eee;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-placeholder-initial {
  font-size: 32px;
  color: #888;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.avatar-input {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
}

.small-avatar {
  width: 32px;
  height: 32px;
  margin-right: 8px;
}
</style>