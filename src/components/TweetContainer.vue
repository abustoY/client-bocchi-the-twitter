<template>
  <div class="tweet-wrapper">
    <TweetItem
      v-for="tweet in tweets"
      :key="tweet.id"
      :tweet="tweet"
      :avatar-url="avatarUrls[tweet.userId]"
    />
  </div>
</template>
    
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useTweetStore } from '../stores/tweet';
import TweetItem from './TweetItem.vue';
import { useUserAvatars } from '../composables/useUserAvatars';

const tweetStore = useTweetStore();
const tweets = computed(() => tweetStore.tweets);
const avatarUrls = ref({});

onMounted(async () => {
  await tweetStore.loadTweets();
  avatarUrls.value = useUserAvatars(tweets.value.map(t => t.userId));
});
</script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tweet-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
 