<template>
    <div v-for="myTweet in myTweets" :key="myTweet.id" class="tweet">
      <div class="tweet-element name">{{ myTweet.name }}</div>
      <div class="tweet-element text">{{ myTweet.text }}</div>
      <div class="tweet-element date">{{ myTweet.created }}</div>
      <div class="tweet-element">
        <button @click="deleteTweet(myTweet.id)">削除</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useAuthStore } from '../stores/auth';
  import { onMounted, ref } from 'vue';
  
  const authStore = useAuthStore();
  const myTweets = ref([]);
  
  const loadMyTweets = async () => {
    const params = { user_id: authStore.userId };
    const query = new URLSearchParams(params);
    const response = await fetch(`${process.env["VUE_APP_API_HOST_URL"]}/api/tweets/user?${query}`, {
      credentials: 'include'
    });
  
    const json = await response.json();
    myTweets.value = json;
  };
  
  const deleteTweet = async (id) => {
    const params = { tweet_id: id };
    const query = new URLSearchParams(params);
  
    await fetch(`${process.env["VUE_APP_API_HOST_URL"]}/api/tweets?${query}`, {
      method: 'DELETE',
      credentials: 'include'
    });
  
    loadMyTweets();
  };
  
  onMounted(loadMyTweets);
  </script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.tweet {
    background-color: rgba(255, 255, 255, 0.8);
    /* 背景色を半透明の白に */
    border-radius: 10px;
    /* 角を丸くする */
    padding: 10px 20px;
    /* 内側の余白 */
    margin-bottom: 10px;
    /* ツイート間のスペース */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* 影を追加 */
    display: flex;
    align-items: center;
    transition: transform 0.2s;
    /* ホバー時のアニメーション */
}

.tweet:hover {
    transform: scale(1.02);
    /* ホバー時に少し拡大 */
}

.tweet-element {
    margin-right: 20px;
    /* 各要素の間にスペースを追加 */
    font-family: 'Arial', sans-serif;
    /* フォントを変更 */
    color: #333;
    /* 文字色を濃い灰色に */
}

.tweet-element.name {
    font-weight: bold;
    /* 名前を太字に */
    font-size: 1.2em;
    /* フォントサイズを大きく */
    color: #007acc;
    /* 色を変更 */
    flex: 1;
}

.tweet-element.text {
    font-size: 1em;
    /* フォントサイズ */
    color: #333;
    /* 色を濃い灰色に */
    flex: 2;
}

.tweet-element.date {
    font-size: 0.9em;
    /* フォントサイズを小さく */
    color: #777;
    /* 色を薄い灰色に */
    flex: 1;
    text-align: right;
    /* 右揃え */
}

button {
    background-color: #007acc;
    /* ボタンの背景色 */
    color: white;
    /* ボタンの文字色 */
    border: none;
    /* ボーダーをなしに */
    padding: 5px 10px;
    /* 内側の余白 */
    border-radius: 5px;
    /* 角を丸くする */
    cursor: pointer;
    /* カーソルをポインタに */
    transition: background-color 0.3s;
    /* 背景色変更のアニメーション */
}

button:hover {
    background-color: #005f99;
    /* ホバー時の背景色 */
}

</style>
