import { defineStore } from "pinia";
import { ref } from "vue";

export const useTweetStore = defineStore('tweet',
    () => {
        const tweets = ref([]);
        const loadTweets = async () => {
            const response = await fetch(`${process.env["VUE_APP_API_BASE_URL"]}/api/tweets`, {
                credentials: "include",
            });

            const json = await response.json();
            console.log(json)

            tweets.value = json;
        }

        return {
            tweets,
            loadTweets
        }

    }
)
