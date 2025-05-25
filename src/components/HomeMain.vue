<template>
  <div>
    <TweetForm />

    <div class="tab-buttons">
      <button :class="{ active: currentTab === 'all' }" @click="currentTab = 'all'">全て</button>
      <button :class="{ active: currentTab === 'following' }" @click="currentTab = 'following'">フォロー中</button>
    </div>

    <TweetContainer v-if="currentTab === 'all'" />
    <TweetContainer v-else :tweets="filteredTweets" />
  </div>
</template>
    
<script setup>
import TweetForm from './TweetForm.vue';
import TweetContainer from './TweetContainer.vue';
import { useTweetStore } from '../stores/tweet';
import { useAuthStore } from '../stores/auth';
import { onMounted, ref, computed } from 'vue';

const currentTab = ref('all');
const tweetStore = useTweetStore();
const authStore = useAuthStore();
const followingIds = ref([]);

const filteredTweets = computed(() => {
  return tweetStore.tweets.filter(tweet => followingIds.value.includes(tweet.userId));
});

onMounted(async () => {
  await tweetStore.loadTweets();
  const res = await fetch(`${process.env.VUE_APP_API_HOST_URL}/api/follow/following?userId=${authStore.userId}`, {
    credentials: 'include'
  });
  followingIds.value = await res.json();
});
</script>
    
<style scoped>
.tab-buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin: 4px 0;
}

.tab-buttons button {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  background: #ddd;
  cursor: pointer;
}

.tab-buttons button.active {
  background: #007acc;
  color: white;
}
</style>
    