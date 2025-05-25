<template>
  <div class="tweet-wrapper">
    <TweetItem v-for="myTweet in myTweets" :key="myTweet.id" :tweet="myTweet" :avatar-url="avatarUrl">
      <template #default>
        <button class="delete-button" @click="deleteTweet(myTweet.id)">削除</button>
      </template>
    </TweetItem>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
import { onMounted, ref } from 'vue';

import TweetItem from './TweetItem.vue';
import { useUserAvatars } from '../composables/useUserAvatars';
import { computed } from 'vue';

const apiHostUrl = process.env.VUE_APP_API_HOST_URL;
const authStore = useAuthStore();
const myTweets = ref([]);

const avatarUrls = useUserAvatars([authStore.userId]);
const avatarUrl = computed(() => avatarUrls[authStore.userId]?.value);

const loadMyTweets = async () => {
  const params = { user_id: authStore.userId };
  const query = new URLSearchParams(params);
  const response = await fetch(`${apiHostUrl}/api/tweets/user?${query}`, {
    credentials: 'include'
  });

  const json = await response.json();
  myTweets.value = json;
};

const deleteTweet = async (id) => {
  const params = { tweet_id: id };
  const query = new URLSearchParams(params);

  await fetch(`${apiHostUrl}/api/tweets?${query}`, {
    method: 'DELETE',
    credentials: 'include'
  });

  loadMyTweets();
};

onMounted(loadMyTweets);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 削除ボタンのスタイル */
.delete-button {
  background-color: #007acc;
  /* ボタンの背景色 */
  color: white;
  /* 文字色 */
  border: none;
  /* ボーダーなし */
  padding: 5px 10px;
  /* 内側の余白 */
  border-radius: 5px;
  /* 角を丸く */
  font-size: 0.9em;
  /* 文字サイズ調整 */
  cursor: pointer;
  /* カーソルをポインタに */
  transition: background-color 0.3s;
  /* ホバー時の変化 */
  margin-left: auto;
  /* 右寄せ（必要に応じて） */
}

.delete-button:hover {
  background-color: #005f99;
  /* ホバー時の背景色 */
}

.tweet-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
