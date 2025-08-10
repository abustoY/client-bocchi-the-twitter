<template>
  <div class="tweet-wrapper">
    <TweetItem
      v-for="tweet in effectiveTweets"
      :key="tweet.id"
      :tweet="tweet"
      :avatar-url="avatarUrls[tweet.userId]"
    />
    <div v-if="!props.tweets" ref="scrollObserver" class="scroll-observer"></div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted, onBeforeUnmount, defineProps } from 'vue';
import { useTweetStore } from '../stores/tweet';
import TweetItem from './TweetItem.vue';
import { useUserAvatars } from '../composables/useUserAvatars';

const props = defineProps({
  tweets: { type: Array, default: null }
});

const tweetStore = useTweetStore();
const effectiveTweets = computed(() => props.tweets ?? tweetStore.tweets);

const avatarUrls = reactive({});

const page = ref(0);
const size = 10;
const hasMore = ref(true);
const loading = ref(false);

const scrollObserver = ref(null);
let observer = null;

const resolveAvatars = (tweets) => {
  const ids = Array.isArray(tweets) ? tweets.map(t => t.userId) : [];
  Object.assign(avatarUrls, useUserAvatars(ids));
};

const loadFirstPage = async () => {
  loading.value = true;
  try {
    const json = await tweetStore.loadTweets(0, size, false);
    if (!Array.isArray(json) || json.length < size) hasMore.value = false;
    resolveAvatars(json ?? []);
  } finally {
    loading.value = false;
  }
};

const loadNextPage = async () => {
  if (loading.value || !hasMore.value) return;
  loading.value = true;
  try {
    page.value += 1;
    const json = await tweetStore.loadTweets(page.value, size, true);
    if (!Array.isArray(json) || json.length < size) hasMore.value = false;
    resolveAvatars(json ?? []);
  } finally {
    loading.value = false;
  }
};

const createObserver = () => {
  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && hasMore.value && !loading.value) {
      loadNextPage();
    }
  }, { root: null, rootMargin: '200px', threshold: 0 });

  if (scrollObserver.value) observer.observe(scrollObserver.value);
};

onMounted(async () => {
  if (props.tweets) {
    resolveAvatars(props.tweets);
  } else {
    await loadFirstPage();
    if (hasMore.value) createObserver();
  }
});

onBeforeUnmount(() => {
  if (observer && scrollObserver.value) {
    observer.unobserve(scrollObserver.value);
    observer.disconnect();
    observer = null;
  }
});
</script>

<style scoped>
.tweet-wrapper { display: flex; flex-direction: column; align-items: center; }
.scroll-observer { height: 1px; }
</style>