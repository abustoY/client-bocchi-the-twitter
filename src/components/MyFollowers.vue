<template>
  <div class="followers-list">
    <h2>あなたをフォローしているユーザー</h2>
    <ul>
      <li v-for="userId in followers" :key="userId">
        <router-link :to="`/user/${userId}`" class="user-link">
          <img v-if="avatarUrls[userId]" :src="avatarUrls[userId]" class="avatar-icon" alt="ユーザーアイコン" />
          {{ userId }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useUserAvatars } from '../composables/useUserAvatars';

const authStore = useAuthStore();
const followers = ref([]);
const avatarUrls = ref({});

const loadFollowers = async () => {
  const res = await fetch(`${process.env.VUE_APP_API_HOST_URL}/api/follow/followers?userId=${authStore.userId}`, {
    credentials: 'include',
  });
  followers.value = await res.json();
  avatarUrls.value = useUserAvatars(followers.value);
};

onMounted(loadFollowers);
</script>

<style scoped>
.followers-list {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 10px;
  font-size: 1.4em;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

a {
  color: #007acc;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.user-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #007acc;
  font-weight: bold;
}

.avatar-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
}
</style>