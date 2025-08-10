import { defineStore } from "pinia";
import { ref } from "vue";

export const useTweetStore = defineStore('tweet',
    () => {
        const tweets = ref([]);

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

        // フォロー中のツイート取得（サーバ側で絞り込み）
        const loadTweetsFollowing = async (userIds, page = 0, size = 10, append = false) => {
            // フォローID未取得や0件は空表示
            if (!Array.isArray(userIds) || userIds.length === 0) {
                if (!append) tweets.value = [];
                return [];
            }
            const query = userIds.map(id => `user_id=${encodeURIComponent(id)}`).join("&");
            const url = `${process.env["VUE_APP_API_HOST_URL"]}/api/tweets/following?${query}&page=${page}&size=${size}`;
            const response = await fetch(url, { credentials: "include" });
            const json = await response.json();
            if (append) {
                tweets.value.push(...json);
            } else {
                tweets.value = json;
            }
            return json;
        };

        return {
            tweets,
            loadTweets,
            loadTweetsFollowing
        }

    }
)
