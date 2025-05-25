<template>
  <div class="following-list">
    <h2>フォローしているユーザー</h2>
    <ul>
      <li v-for="userId in following" :key="userId">
        <router-link :to="`/user/${userId}`" class="user-link">
          <img v-if="avatarUrls[userId]" :src="avatarUrls[userId]" class="avatar-icon" alt="ユーザーアイコン" />
          <!-- https://vuejs.org/guide/essentials/reactivity-fundamentals.html#additional-ref-unwrapping-details -->
          {{ userId }}
        </router-link>
        <button class="unfollow-button" @click="unfollow(userId)">フォロー解除</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useUserAvatars } from '../composables/useUserAvatars';

const authStore = useAuthStore();
const following = ref([]);
const avatarUrls = ref({});

const loadFollowing = async () => {
  const res = await fetch(`${process.env.VUE_APP_API_HOST_URL}/api/follow/following?userId=${authStore.userId}`, {
    credentials: 'include',
  });
  following.value = await res.json();
  avatarUrls.value = useUserAvatars(following.value);
};

onMounted(loadFollowing);

const unfollow = async (userIdToUnfollow) => {
  await fetch(`${process.env.VUE_APP_API_HOST_URL}/api/follow/unfollow?userId=${userIdToUnfollow}&followerId=${authStore.userId}`, {
    method: 'POST',
    credentials: 'include',
  });
  following.value = following.value.filter(id => id !== userIdToUnfollow);
};

</script>

<style scoped>
.following-list {
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
</style>

<style scoped>
.unfollow-button {
  margin-left: 10px;
  background-color: #d9534f;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
}

.unfollow-button:hover {
  background-color: #c9302c;
}
</style>

<style scoped>
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