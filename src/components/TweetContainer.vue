<template>
  <div class="tweet-wrapper">
    <TweetItem
      v-for="tweet in useTweetStore().tweets"
      :key="tweet.id"
      :tweet="tweet"
    />
  </div>
</template>
    
<script setup>
import { useTweetStore } from '../stores/tweet'
import { onMounted } from 'vue';

import TweetItem from './TweetItem.vue';

const apiHostUrl = process.env.VUE_APP_API_HOST_URL;

onMounted(useTweetStore().loadTweets);
</script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tweet-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
 