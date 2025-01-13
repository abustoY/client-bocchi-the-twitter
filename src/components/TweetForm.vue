<template>
    <form id="tweet-form" v-on:submit.prevent="putTweet">
        <textarea id="tweet-text" placeholder="Compose a tweet..." v-model="tweetText"></textarea>
        <button type="submit">Tweet</button>
    </form>
</template>
    
<script>
import { useTweetStore } from '@/stores/tweet';
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';

export default {
    name: 'TweetForm',

    setup() {
        const tweetText = ref('');

        const putTweet =async () => {
            if (tweetText.value.trim() !== '') {
                await createTweet(tweetText.value);
                tweetText.value = '';
                useTweetStore().loadTweets();
            }
        }

        async function createTweet(message) {
            console.log(message);

            const data = {
                userId: useUserStore().userId,
                text: message
            };
            console.log(data);
            console.log(JSON.stringify(data));

            const response = await fetch(`${process.env["VUE_APP_API_BASE_URL"]}/api/tweets`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: "include"
            });
            console.log(response);

            // const json = await response.json();
            // console.log(json);

        }

        return {
            tweetText,
            putTweet,
        }


    }
}
</script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#tweet-form {
    background-color: #e0f7fa;
    /* 背景色を半透明の白に */
    border-radius: 0 0 10px 10px; 
    /* 角を丸くする */
    padding: 20px; 
    /* 内側の余白 */
    margin: 0 0 20px 0; 
    /* 上下の余白 */
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

</style>