<template>
  <div class="tweet">
    <div class="tweet-element name">{{ tweet.name }}</div>
    <div class="tweet-element text">{{ tweet.text }}</div>
    <div class="tweet-element images" v-if="tweet.mediaIds && tweet.mediaIds.length > 0">
      <img
        v-for="mediaId in tweet.mediaIds"
        :key="mediaId"
        :src="`${apiHostUrl}/api/media/${mediaId}`"
        alt="Tweet media"
        class="tweet-image"
      />
    </div>
    <div class="tweet-element footer-row">
      <div class="tweet-element date">{{ tweet.created }}</div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  tweet: {
    type: Object,
    required: true
  }
});

const apiHostUrl = process.env.VUE_APP_API_HOST_URL;
</script>

<style scoped>
.tweet {
  width: 100%;
  max-width: 600px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 10px 20px;
  margin-bottom: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;
  box-sizing: border-box;
}

.tweet:hover {
  transform: scale(1.02);
}

.tweet-element {
  margin-right: 20px;
  font-family: 'Arial', sans-serif;
  color: #333;
}

.tweet-element.name {
  font-weight: bold;
  font-size: 1.2em;
  color: #007acc;
  flex: 1;
}

.tweet-element.text {
  font-size: 1em;
  flex: 2;
}

.tweet-element.date {
  font-size: 0.9em;
  color: #777;
  flex: 1;
  /* text-align: right; */
}

.tweet-element.images {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}

.tweet-image {
  max-width: 200px;
  max-height: 200px;
  margin-right: 10px;
  border-radius: 5px;
  object-fit: cover;
}

.footer-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
</style>