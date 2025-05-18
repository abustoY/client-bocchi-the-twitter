<template>
  <div class="tweet-form-wrapper">
    <form id="tweet-form" v-on:submit.prevent="putTweet" enctype="multipart/form-data">
      <textarea id="tweet-text" placeholder="Tweetを投稿してください" v-model="tweetText"
        :disabled="!authStore.isAuthenticated"></textarea>
      <input type="file" multiple @change="handleFiles" :disabled="!authStore.isAuthenticated" />
      <button type="submit" :disabled="!authStore.isAuthenticated">Tweet</button>
      <p v-if="!authStore.isAuthenticated" class="login-message">
        投稿するには <router-link to="/login-form" class="login-link">ログイン</router-link> してください。
      </p>
    </form>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
import { useTweetStore } from '@/stores/tweet';
import { ref } from 'vue';

const authStore = useAuthStore();
const tweetText = ref('');
const files = ref([]);

const handleFiles = (event) => {
    files.value = Array.from(event.target.files);
    console.log(files.value)
};

const putTweet = async () => {
    if (tweetText.value.trim() === '' && files.value.length === 0) return;

    const formData = new FormData();
    formData.append('userId', authStore.userId);
    formData.append('text', tweetText.value);

    files.value.forEach(file => {
        formData.append('mediaFiles', file);
    });

    for (const [key, value] of formData.entries()) {
  console.log(`${key}:`, value);
}


    await fetch(`${process.env["VUE_APP_API_HOST_URL"]}/api/tweets`, {
        method: 'POST',
        body: formData,
        credentials: "include"
    });

    tweetText.value = '';
    files.value = [];
    useTweetStore().loadTweets();
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tweet-form-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  padding: 0 10px;
}

#tweet-form {
  max-width: 600px;
  width: 100%;
  border-radius: 10px 10px 10px 10px;
  /* 角を丸くする */
  padding: 20px;
  /* 内側の余白 */
  margin: 0 0 20px 0;
  /* 上下の余白 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
   /* 軽いシャドウ */
}

#tweet-text {
  width: 100%;
  /* 幅を100%に */
  height: 80px;
  /* 高さを80pxに */
  border-radius: 5px;
  /* 角を丸くする */
  padding: 10px;
  /* 内側の余白 */
  border: 1px solid #ccc;
  /* ボーダー */
  font-family: 'Arial', sans-serif;
  /* フォントを変更 */
  font-size: 1em;
  /* フォントサイズを調整 */
  resize: none;
  /* リサイズを無効に */
  box-sizing: border-box;
  /* パディングとボーダーを含むボックスサイズ */
}

#tweet-text::placeholder {
  color: #999;
  /* プレースホルダーの色 */
}

#tweet-form button {
  background-color: #007acc;
  /* ボタンの背景色 */
  color: white;
  /* ボタンの文字色 */
  border: none;
  /* ボーダーをなしに */
  padding: 10px 20px;
  /* 内側の余白 */
  border-radius: 5px;
  /* 角を丸くする */
  cursor: pointer;
  /* カーソルをポインタに */
  transition: background-color 0.3s;
  /* 背景色変更のアニメーション */
  font-family: 'Arial', sans-serif;
  /* フォントを変更 */
  font-size: 1em;
  /* フォントサイズを調整 */
  display: block;
  margin: 10px auto 0;
  /* 中央揃え */
  width: auto;
  /* 幅を自動に */
}

#tweet-form button:hover {
  background-color: #005f99;
  /* ホバー時の背景色 */
}

#tweet-form button:disabled:hover {
  background-color: #007acc; /* 通常状態と同じ色にして、変化を打ち消す */
}
</style>