import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('user',
    () => {
        const userId = ref("");
        const getUserId = async () => {
            const response = await fetch(`${process.env["VUE_APP_API_BASE_URL"]}/api/authentication/user-id`, {
                credentials: "include",
            });
            console.log(response);

            userId.value = await response.text();
            
        }

        return {
            userId,
            getUserId
        }

    }
)
