<template>
    <form id="login-form" @submit.prevent="handleLogin">
        <div>
            <label for="id">ID</label>
        </div>
        <div>
            <input type="text" id="id" v-model="id">
        </div>
        <div>
            <label for="password">PASSWORD</label>
        </div>
        <div>
            <input type="password" id="password" v-model="password">
        </div>
        <button type="submit">ログイン</button>
        <div class="oidc-buttons">
            <a class="oidc-btn google" :href="`${apiHostUrl}/oauth2/authorization/google`">Googleでログイン</a>
            <a class="oidc-btn line" :href="`${apiHostUrl}/oauth2/authorization/line`">LINEでログイン</a>
        </div>
    </form>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const apiHostUrl = process.env.VUE_APP_API_HOST_URL;
const authStore = useAuthStore();
const router = useRouter();
const id = ref('');
const password = ref('');

const handleLogin = async () => {
    try {
        const success = await authStore.login(id.value, password.value);
        if (success) {
            router.push('/');
        } else {
            alert('ログインに失敗しました');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('ログインに失敗しました');
    }
};
</script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#login-form {
    background-color: rgba(255, 255, 255, 0.8);
    /* 背景色を半透明の白に */
    border-radius: 10px;
    /* 角を丸くする */
    padding: 20px;
    /* 内側の余白 */
    margin: 20px auto;
    /* 上下の余白、自動中央揃え */
    width: 300px;
    /* フォームの幅 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* 影を追加 */
    font-family: 'Arial', sans-serif;
    /* フォントを変更 */
    display: flex;
    flex-direction: column;
    gap: 15px;
    /* フォーム内の要素の間にスペースを追加 */
}

#login-form label {
    margin-bottom: 5px;
    /* ラベルの下に余白を追加 */
    color: #007acc;
    /* ラベルの文字色 */
}

#login-form input {
    width: 100%;
    /* 幅を100%に */
    padding: 10px;
    /* 内側の余白 */
    border: 1px solid #ccc;
    /* ボーダー */
    border-radius: 5px;
    /* 角を丸くする */
    box-sizing: border-box;
    /* パディングとボーダーを含むボックスサイズ */
    font-size: 1em;
    /* フォントサイズを調整 */
}

#login-form button {
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
    font-size: 1em;
    /* フォントサイズを調整 */
    display: block;
    margin: 10px auto 0;
    /* 中央揃え */
    width: auto;
    /* 幅を自動に */
}

#login-form button:hover {
    background-color: #005f99;
    /* ホバー時の背景色 */
}

.oidc-buttons {
    display: flex;
    gap: 8px;
    justify-content: center;
    margin-top: 8px;
}

.oidc-btn {
    display: inline-block;
    padding: 10px 12px;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    color: white;
}

.oidc-btn.google {
    background: #4285f4;
}

.oidc-btn.line {
    background: #06c755;
}

.oidc-btn:hover {
    opacity: 0.9;
}
</style>
