<template>
    <div id="signup-page">
        <h1>サインアップ</h1>
        <form @submit.prevent="signup" id="signup-form">
            <label for="id">ID:</label>
            <input type="text" id="id" v-model="id" required>

            <label for="name">表示名:</label>
            <input type="text" id="name" v-model="name" required>

            <label for="password">PASSWORD:</label>
            <input type="password" id="password" v-model="password" required>

            <button type="submit">サインアップ</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const id = ref('');
const name = ref('');
const password = ref('');

const signup = async () => {
    try {
        const response = await fetch(`${process.env["VUE_APP_API_HOST_URL"]}/api/authentication/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ id: id.value, name: name.value, password: password.value }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('サーバーエラー:', {
                status: response.status,
                statusText: response.statusText,
                body: errorText
            });
            throw new Error(`サーバーエラー: ${response.status} ${errorText}`);
        }

        router.push('/login-form');
    } catch (error) {
        console.error('サインアップエラー:', error);
        alert(`サインアップに失敗しました: ${error.message}`);
    }
};
</script>

<style scoped>
#signup-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Arial', sans-serif;
}

#signup-form {
    background-color: rgba(255, 255, 255, 0.8);
    /* 背景色を半透明の白に */
    border-radius: 10px;
    /* 角を丸くする */
    padding: 20px;
    /* 内側の余白 */
    width: 300px;
    /* フォームの幅 */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* 影を追加 */

    display: flex;
    flex-direction: column;
    gap: 15px;
    /* フォーム内の要素の間にスペースを追加 */
}

#signup-form label {
    margin-bottom: 5px;
    /* ラベルの下に余白を追加 */
    color: #007acc;
    /* ラベルの文字色 */
}

#signup-form input {
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

#signup-form button {
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

#signup-form button:hover {
    background-color: #005f99;
    /* ホバー時の背景色 */
}

.forroop-button {
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
    margin-top: 20px;
    /* 上部の余白を追加 */
}

.forroop-button:hover {
    background-color: #005f99;
    /* ホバー時の背景色 */
}

</style>
