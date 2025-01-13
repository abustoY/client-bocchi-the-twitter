<template>
    <LoginForm></LoginForm>
    <div class="wrapper-signup-form-link">
        <RouterLink to="/signup-form">
            <div class="signup-form-link">
                SIGNUP YET ?
            </div>
        </RouterLink>
    </div>
</template>

<script>
import LoginForm from './LoginForm.vue';

export default {
    name: 'LoginMain',
    setup() {
        return {};
    },
    components: {
        LoginForm
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.wrapper-signup-form-link {
    display: flex;
    justify-content: center;
}

.signup-form-link {
    color: #005f73;
    font-family: 'Arial', sans-serif;

}


.signup-form-link:hover {
    color: #0288d1;
    /* ホバー時のテキストの色を変更 */
}

</style>