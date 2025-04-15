import { defineStore } from "pinia";
import { ref } from "vue";
import { getAuthenticationStatus } from "@/authentication";

export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref(false);
    const isLoading = ref(true);

    // 認証状態をチェックして更新
    const checkAuth = async () => {
        isLoading.value = true;
        try {
            isAuthenticated.value = await getAuthenticationStatus();
        } finally {
            isLoading.value = false;
        }
    };

    // 初期化時に一度だけ認証状態をチェック
    checkAuth();

    return {
        isAuthenticated,
        isLoading,
        checkAuth
    };
}); 