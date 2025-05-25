<template>
  <div class="tweet-wrapper">
    <TweetItem
      v-for="tweet in effectiveTweets"
      :key="tweet.id"
      :tweet="tweet"
      :avatar-url="avatarUrls[tweet.userId]"
    />
  </div>
</template>
    
<script setup>
import { ref, computed, onMounted, defineProps } from 'vue';
import { useTweetStore } from '../stores/tweet';
import TweetItem from './TweetItem.vue';
import { useUserAvatars } from '../composables/useUserAvatars';

const props = defineProps({
  tweets: {
    type: Array,
    default: null
  }
});

const tweetStore = useTweetStore();
const effectiveTweets = computed(() => props.tweets ?? tweetStore.tweets);
const avatarUrls = ref({});

onMounted(async () => {
  if (!props.tweets) {
    await tweetStore.loadTweets();
  }
  avatarUrls.value = useUserAvatars(effectiveTweets.value.map(t => t.userId));
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
 