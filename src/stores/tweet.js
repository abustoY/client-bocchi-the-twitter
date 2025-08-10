import { defineStore } from "pinia";
import { ref } from "vue";

export const useTweetStore = defineStore('tweet',
    () => {
        const tweets = ref([]);
        // Support pagination and append mode
        const loadTweets = async (page = 0, size = 10, append = false) => {
            const url = `${process.env["VUE_APP_API_HOST_URL"]}/api/tweets?page=${page}&size=${size}`;
            const response = await fetch(url, {
                credentials: "include",
            });
            const json = await response.json();
            console.log(json)
            if (append) {
                // Append new tweets to the existing array
                tweets.value.push(...json);
            } else {
                // Replace the array
                tweets.value = json;
            }
            return json;
        }

        return {
            tweets,
            loadTweets
        }

    }
)
