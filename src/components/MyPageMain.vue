<template>
  <CommonProfile
    :avatar-url="avatarUrl"
    :user-name="authStore.userName"
    :is-my-profile="true"
    :follower-count="followerCount"
    :following-count="followCount"
    @logout="handleLogout"
    @followers="() => router.push('/my-followers')"
    @following="() => router.push('/my-following')"
  />
  <MyTweetContainer />
</template>

<script setup>
import CommonProfile from './CommonProfile.vue';
import MyTweetContainer from './MyTweetContainer.vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
import { useUserAvatars } from '../composables/useUserAvatars';

const followCount = ref(0);
const followerCount = ref(0);

const authStore = useAuthStore();
const router = useRouter();

const avatarUrls = useUserAvatars([authStore.userId]);
const avatarUrl = computed(() => avatarUrls[authStore.userId]?.value);

console.log(useUserAvatars([authStore.userId])[authStore.userId].value)

onMounted(async () => {
  const res1 = await fetch(`${process.env.VUE_APP_API_HOST_URL}/api/follow/following?userId=${authStore.userId}`, {
    credentials: 'include',
  });
  followCount.value = (await res1.json()).length;

  const res2 = await fetch(`${process.env.VUE_APP_API_HOST_URL}/api/follow/followers?userId=${authStore.userId}`, {
    credentials: 'include',
  });
  followerCount.value = (await res2.json()).length;
});

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

<!--
  不要なスタイルは削除しました（CommonProfile.vueで提供）。
-->