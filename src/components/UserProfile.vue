<template>
  <div class="user-profile">
    <CommonProfile
      :avatar-url="avatarUrl"
      :user-name="userName"
      :is-my-profile="isMyProfile"
      :is-following="isFollowing"
      @toggle-follow="toggleFollow"
    />
    <div class="tweet-wrapper">
      <TweetItem
        v-for="tweet in tweets"
        :key="tweet.id"
        :tweet="tweet"
        :avatar-url="avatarUrl"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import TweetItem from './TweetItem.vue';
import { useAuthStore } from '../stores/auth';
import CommonProfile from './CommonProfile.vue';
import { useUserAvatars } from '../composables/useUserAvatars';

const route = useRoute();
const authStore = useAuthStore();
const userId = computed(() => route.params.userId);
const userName = ref('');
const isFollowing = ref(false);
const tweets = ref([]);
const avatarUrls = useUserAvatars([userId.value]);
const avatarUrl = computed(() => avatarUrls[userId.value]?.value);
const isMyProfile = computed(() => userId.value === authStore.userId);

const loadUserData = async () => {
  // TODO: ユーザー名のAPIに置き換える
  userName.value = `ユーザーID: ${userId.value}`;

  const res = await fetch(`${process.env["VUE_APP_API_HOST_URL"]}/api/tweets/user?user_id=${userId.value}`, {
    credentials: 'include',
  });
  tweets.value = await res.json();

  // ツイート一覧から userId を抽出してアバターURL取得
  avatarUrls.value = useUserAvatars(tweets.value.map(t => t.userId));

  const followRes = await fetch(`${process.env["VUE_APP_API_HOST_URL"]}/api/follow/following?userId=${authStore.userId}`, {
    credentials: 'include',
  });
  const followingIds = await followRes.json();
  isFollowing.value = followingIds.includes(userId.value);
};

const toggleFollow = async () => {
  const endpoint = isFollowing.value ? 'unfollow' : 'follow';
  await fetch(`${process.env["VUE_APP_API_HOST_URL"]}/api/follow/${endpoint}?userId=${userId.value}&followerId=${authStore.userId}`, {
    method: 'POST',
    credentials: 'include',
  });
  isFollowing.value = !isFollowing.value;
};

onMounted(loadUserData);
</script>

<style scoped>
.tweet-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>