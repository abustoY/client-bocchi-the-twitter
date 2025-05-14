import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref(false);
    const userId = ref(null);
    const userName = ref(null);

    const setUserInfo = (json) => {
        userId.value = json.id;
        userName.value = json.name;
    };

    const login = async (id, password) => {
        const params = new URLSearchParams();
        params.append("id", id);
        params.append("password", password);

        const response = await fetch(`${process.env["VUE_APP_API_HOST_URL"]}/api/authentication/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: params
        });

        if (!response.ok) {
            return false;
        }

        const json = await response.json();
        setUserInfo(json)
        isAuthenticated.value = true;

        return true;
    };

    const checkAuth = async () => {

        if (isAuthenticated.value) return;

        try {
            const response = await fetch(`${process.env["VUE_APP_API_HOST_URL"]}/api/authentication/status`, {
                credentials: 'include'
            });

            if (!response.ok) {
                isAuthenticated.value = false;
                return;
            }

            const json = await response.json();

            
            setUserInfo(json)
            isAuthenticated.value = true;

        } catch (e) {
            isAuthenticated.value = false;
        }
    };

    const logout = async () => {
        await fetch(`${process.env["VUE_APP_API_HOST_URL"]}/api/authentication/logout`, {
            method: "POST",
            credentials: "include"
        });
        isAuthenticated.value = false;
        userId.value = null;
        userName.value = null;
    };

    return {
        isAuthenticated,
        userId,
        userName,
        login,
        checkAuth,
        logout
    };
}); 