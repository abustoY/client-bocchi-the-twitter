<template>
    <TweetForm></TweetForm>
    <TweetContainer></TweetContainer>
</template>
    
<script>
import TweetForm from './TweetForm.vue';
import TweetContainer from './TweetContainer.vue';

export default {
    name: 'HomeMain',
    setup() {
        return {
               
        };
    },
    components: {
        TweetForm,
        TweetContainer
    }
}
</script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
    