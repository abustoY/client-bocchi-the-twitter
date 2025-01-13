<template>
    <form id="login-form" v-bind:action="loginActionApi" method="post">
        <div>
            <label for="login-id">ID</label>
        </div>
        <div>
            <input type="text" id="login-id" name="login-id">
        </div>
        <div>
            <label for="login-password">PASSWORD</label>
        </div>
        <div>
            <input type="text" id="login-password" name="login-password">
        </div>
        <button type="submit">Login</button>
    </form>
</template>
    
<script>

export default {
    name: 'LoginForm',

    setup() {
      console.log(process.env["VUE_APP_API_BASE_URL"]);
      const loginActionApi = process.env["VUE_APP_API_BASE_URL"]+'/hoge';

        return {
          loginActionApi
        }

    }
}
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

</style>
